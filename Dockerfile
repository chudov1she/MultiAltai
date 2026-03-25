# ─────────────────────────────────────────────────────────────────────────────
# Stage 0 · base — Alpine + build tools needed for native addons (better-sqlite3)
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 · deps — install ALL dependencies (dev + prod)
# postinstall (prisma generate) is skipped here; runs explicitly in builder.
# ─────────────────────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 · builder — generate Prisma client + build Next.js
# ─────────────────────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma client into ./generated/prisma
RUN npx prisma generate

# Build Next.js (produces .next/standalone because output: 'standalone')
RUN yarn build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3 · runner — minimal production image
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# ── Next.js standalone bundle ─────────────────────────────────────────────────
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public

# ── Prisma generated client + schema ─────────────────────────────────────────
# The client is needed at runtime; schema is needed by Prisma migrations/checks.
COPY --from=builder --chown=nextjs:nodejs /app/generated        ./generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma/schema.prisma

# ── better-sqlite3 native addon ───────────────────────────────────────────────
# Next.js file-tracing may not catch .node binaries; copy the package explicitly.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/better-sqlite3          ./node_modules/better-sqlite3
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/bindings                ./node_modules/bindings
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/file-uri-to-path        ./node_modules/file-uri-to-path
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/adapter-better-sqlite3 ./node_modules/@prisma/adapter-better-sqlite3

# ── Database ──────────────────────────────────────────────────────────────────
# dev.db is baked into the image as the initial dataset.
# On Timeweb: mount a persistent disk at /app/data — the mounted volume will
# take precedence and survive restarts. First deploy: copy dev.db to the disk.
# Set DATABASE_URL="file:/app/data/dev.db" in Timeweb environment variables.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data
COPY --from=builder --chown=nextjs:nodejs /app/dev.db /app/data/dev.db

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
