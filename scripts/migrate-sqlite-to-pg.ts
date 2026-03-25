/**
 * migrate-sqlite-to-pg.ts
 *
 * Transfers all data from the local SQLite database (dev.db) to the PostgreSQL
 * database specified by DATABASE_URL in .env.
 *
 * Usage:
 *   1. Fill in DATABASE_URL in .env with the Supabase connection string
 *   2. npx tsx scripts/migrate-sqlite-to-pg.ts
 *
 * The script is idempotent: records that already exist (by id) are skipped.
 */

import Database from "better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set in .env");
const adapter = new PrismaPg({
  connectionString,
  max: 5,
  ssl: { rejectUnauthorized: false },
});
const pgClient = new PrismaClient({ adapter });

const sqlite = new Database(path.resolve(__dirname, "../dev.db"), {
  readonly: true,
});

function rows<T = Record<string, unknown>>(sql: string): T[] {
  return sqlite.prepare(sql).all() as T[];
}

async function migrate() {
  console.log("🚀 Starting SQLite → PostgreSQL migration…\n");

  // ── 1. users ──────────────────────────────────────────────────────────────
  const users = rows<{
    id: string; username: string | null; phone: string | null;
    email: string; password: string; avatar: string | null;
    role: string; createdAt: string; updatedAt: string;
  }>("SELECT * FROM users");
  for (const u of users) {
    await pgClient.user.upsert({
      where: { id: u.id },
      update: {},
      create: {
        id: u.id, username: u.username, phone: u.phone, email: u.email,
        password: u.password, avatar: u.avatar,
        role: u.role as "USER" | "ADMIN" | "MANAGER",
        createdAt: new Date(u.createdAt), updatedAt: new Date(u.updatedAt),
      },
    });
  }
  console.log(`✅ users          ${users.length}`);

  // ── 2. sessions ───────────────────────────────────────────────────────────
  const sessions = rows<{
    id: string; userId: string; refreshToken: string; deviceInfo: string | null;
    isActive: number; expiresAt: string; createdAt: string; updatedAt: string;
  }>("SELECT * FROM sessions");
  for (const s of sessions) {
    await pgClient.session.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id, userId: s.userId, refreshToken: s.refreshToken,
        deviceInfo: s.deviceInfo, isActive: Boolean(s.isActive),
        expiresAt: new Date(s.expiresAt),
        createdAt: new Date(s.createdAt), updatedAt: new Date(s.updatedAt),
      },
    });
  }
  console.log(`✅ sessions        ${sessions.length}`);

  // ── 3. company_contacts ───────────────────────────────────────────────────
  const contacts = rows<{
    id: string; phone: string | null; whatsapp: string | null; telegram: string | null;
    address: string | null; latitude: number | null; longitude: number | null;
    workTimeFrom: string | null; workTimeTo: string | null;
    createdAt: string; updatedAt: string;
  }>("SELECT * FROM company_contacts");
  for (const c of contacts) {
    await pgClient.companyContact.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id, phone: c.phone, whatsapp: c.whatsapp, telegram: c.telegram,
        address: c.address, latitude: c.latitude, longitude: c.longitude,
        workTimeFrom: c.workTimeFrom, workTimeTo: c.workTimeTo,
        createdAt: new Date(c.createdAt), updatedAt: new Date(c.updatedAt),
      },
    });
  }
  console.log(`✅ company_contacts ${contacts.length}`);

  // ── 4. locations ──────────────────────────────────────────────────────────
  const locations = rows<{
    id: string; address: string; createdAt: string; updatedAt: string;
  }>("SELECT * FROM locations");
  for (const l of locations) {
    await pgClient.location.upsert({
      where: { id: l.id },
      update: {},
      create: {
        id: l.id, address: l.address,
        createdAt: new Date(l.createdAt), updatedAt: new Date(l.updatedAt),
      },
    });
  }
  console.log(`✅ locations       ${locations.length}`);

  // ── 5. land_categories ────────────────────────────────────────────────────
  const categories = rows<{
    id: string; name: string; description: string | null;
    createdAt: string; updatedAt: string;
  }>("SELECT * FROM land_categories");
  for (const c of categories) {
    await pgClient.landCategory.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id, name: c.name, description: c.description,
        createdAt: new Date(c.createdAt), updatedAt: new Date(c.updatedAt),
      },
    });
  }
  console.log(`✅ land_categories ${categories.length}`);

  // ── 6. permitted_uses ─────────────────────────────────────────────────────
  const permittedUses = rows<{
    id: string; name: string; description: string | null;
    createdAt: string; updatedAt: string;
  }>("SELECT * FROM permitted_uses");
  for (const p of permittedUses) {
    await pgClient.permittedUse.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id, name: p.name, description: p.description,
        createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt),
      },
    });
  }
  console.log(`✅ permitted_uses  ${permittedUses.length}`);

  // ── 7. communications ─────────────────────────────────────────────────────
  const comms = rows<{
    id: string; name: string; icon: string | null;
    createdAt: string; updatedAt: string;
  }>("SELECT * FROM communications");
  for (const c of comms) {
    await pgClient.communication.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id, name: c.name, icon: c.icon,
        createdAt: new Date(c.createdAt), updatedAt: new Date(c.updatedAt),
      },
    });
  }
  console.log(`✅ communications  ${comms.length}`);

  // ── 8. features ───────────────────────────────────────────────────────────
  const features = rows<{
    id: string; name: string; icon: string | null;
    createdAt: string; updatedAt: string;
  }>("SELECT * FROM features");
  for (const f of features) {
    await pgClient.feature.upsert({
      where: { id: f.id },
      update: {},
      create: {
        id: f.id, name: f.name, icon: f.icon,
        createdAt: new Date(f.createdAt), updatedAt: new Date(f.updatedAt),
      },
    });
  }
  console.log(`✅ features        ${features.length}`);

  // ── 9. land_plots ─────────────────────────────────────────────────────────
  const plots = rows<{
    id: string; title: string; slug: string; plotType: string;
    description: string; isPublished: number; status: string;
    locationId: string; cadastralNumbers: string; categoryId: string;
    permittedUseId: string; area: number; price: number;
    pricePerHundred: number; createdAt: string; updatedAt: string;
    createdById: string;
  }>("SELECT * FROM land_plots");
  for (const p of plots) {
    await pgClient.landPlot.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id, title: p.title, slug: p.slug,
        plotType: p.plotType as "RUSSIA" | "NOVOROSSIA",
        description: p.description, isPublished: Boolean(p.isPublished),
        status: p.status as "AVAILABLE" | "RESERVED" | "SOLD",
        locationId: p.locationId,
        cadastralNumbers: JSON.parse(p.cadastralNumbers ?? "[]"),
        categoryId: p.categoryId, permittedUseId: p.permittedUseId,
        area: p.area, price: p.price, pricePerHundred: p.pricePerHundred,
        createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt),
        createdById: p.createdById,
      },
    });
  }
  console.log(`✅ land_plots      ${plots.length}`);

  // ── 10. media_files ───────────────────────────────────────────────────────
  const media = rows<{
    id: string; url: string; type: string; mimeType: string;
    size: number; order: number; landPlotId: string;
    createdAt: string; updatedAt: string;
  }>("SELECT * FROM media_files");
  for (const m of media) {
    await pgClient.mediaFile.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id, url: m.url,
        type: m.type as "IMAGE" | "VIDEO",
        mimeType: m.mimeType, size: m.size, order: m.order,
        landPlotId: m.landPlotId,
        createdAt: new Date(m.createdAt), updatedAt: new Date(m.updatedAt),
      },
    });
  }
  console.log(`✅ media_files     ${media.length}`);

  // ── 11. document_files ────────────────────────────────────────────────────
  const docs = rows<{
    id: string; url: string; name: string; mimeType: string;
    size: number; landPlotId: string; createdAt: string; updatedAt: string;
  }>("SELECT * FROM document_files");
  for (const d of docs) {
    await pgClient.documentFile.upsert({
      where: { id: d.id },
      update: {},
      create: {
        id: d.id, url: d.url, name: d.name, mimeType: d.mimeType,
        size: d.size, landPlotId: d.landPlotId,
        createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt),
      },
    });
  }
  console.log(`✅ document_files  ${docs.length}`);

  // ── 12. applications ──────────────────────────────────────────────────────
  const apps = rows<{
    id: string; type: string; name: string; phone: string;
    email: string; message: string; landPlotId: string | null;
    isRead: number; acceptedById: string | null;
    createdAt: string; updatedAt: string;
  }>("SELECT * FROM applications");
  for (const a of apps) {
    await pgClient.application.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        type: a.type as "CONTACT" | "LAND_PLOT",
        name: a.name, phone: a.phone, email: a.email, message: a.message,
        landPlotId: a.landPlotId ?? null,
        isRead: Boolean(a.isRead),
        acceptedById: a.acceptedById ?? null,
        createdAt: new Date(a.createdAt), updatedAt: new Date(a.updatedAt),
      },
    });
  }
  console.log(`✅ applications    ${apps.length}`);

  // ── 13. junction tables ───────────────────────────────────────────────────
  const commLinks = rows<{ A: string; B: string }>(
    "SELECT * FROM _CommunicationToLandPlot"
  );
  for (const { A, B } of commLinks) {
    await pgClient.$executeRaw`
      INSERT INTO "_CommunicationToLandPlot" ("A", "B")
      VALUES (${A}, ${B})
      ON CONFLICT DO NOTHING
    `;
  }
  console.log(`✅ comm↔plot links ${commLinks.length}`);

  const featLinks = rows<{ A: string; B: string }>(
    "SELECT * FROM _FeatureToLandPlot"
  );
  for (const { A, B } of featLinks) {
    await pgClient.$executeRaw`
      INSERT INTO "_FeatureToLandPlot" ("A", "B")
      VALUES (${A}, ${B})
      ON CONFLICT DO NOTHING
    `;
  }
  console.log(`✅ feat↔plot links ${featLinks.length}`);

  console.log("\n🎉 Migration complete!");
  sqlite.close();
  await pgClient.$disconnect();
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
