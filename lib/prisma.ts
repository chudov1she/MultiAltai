import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
  // Resolve relative sqlite paths to absolute so the adapter always finds the file
  // regardless of the working directory at module init time.
  const url = rawUrl.startsWith("file:./") || rawUrl.startsWith("file:../")
    ? "file:" + path.resolve(process.cwd(), rawUrl.slice("file:".length))
    : rawUrl;

  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
