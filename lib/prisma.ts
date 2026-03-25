import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");

  // Strip Prisma-specific params that pg driver doesn't understand
  const pgUrl = connectionString.replace("?pgbouncer=true", "");

  const pool =
    globalForPrisma.pool ??
    new Pool({ connectionString: pgUrl, max: 5, ssl: { rejectUnauthorized: false } });

  if (!globalForPrisma.pool) globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
