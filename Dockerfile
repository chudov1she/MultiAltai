# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 · deps — install dependencies
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma

# Installs dependencies and runs prisma generate (postinstall)
RUN yarn install --frozen-lockfile

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 · builder — build Next.js
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# DATABASE_URL is required at build time for Prisma client generation and
# static pre-rendering. The actual production value is injected at deploy time.
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

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

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public

# Prisma generated client and schema (needed at runtime)
COPY --from=builder --chown=nextjs:nodejs /app/generated        ./generated
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma/schema.prisma

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
