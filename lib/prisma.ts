// BigInt serialization polyfill — MariaDB adapter may return BigInt/DECIMAL.
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function parseDatabaseUrl(url: string) {
  const urlWithProtocol = url.startsWith("mysql://") ? url : `mysql://${url}`;
  const urlObj = new URL(urlWithProtocol);
  const password = urlObj.password;
  const host = urlObj.hostname;
  const port = Number(urlObj.port) || 3306;
  const database = urlObj.pathname.slice(1);
  const allowPublicKeyRetrieval =
    urlObj.searchParams.get("allowPublicKeyRetrieval") === "true";
  return {
    user: decodeURIComponent(urlObj.username),
    password: decodeURIComponent(password),
    host,
    port,
    database,
    allowPublicKeyRetrieval,
  };
}

const mariadbDriverOptions = {
  bigIntAsNumber: true,
  decimalAsNumber: true,
  supportBigNumbers: true,
};

let adapter: PrismaMariaDb;

if (process.env.DATABASE_URL) {
  adapter = new PrismaMariaDb({
    ...parseDatabaseUrl(process.env.DATABASE_URL),
    ...mariadbDriverOptions,
  });
} else {
  adapter = new PrismaMariaDb({
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || "db_jadwalmasjid",
    allowPublicKeyRetrieval: true,
    ...mariadbDriverOptions,
  });
}

const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
export { prisma };