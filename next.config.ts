import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Explicitly include files that Next.js file-tracing may miss:
  // native better-sqlite3 addon, Prisma generated client, schema.
  outputFileTracingIncludes: {
    "**": [
      "./node_modules/better-sqlite3/build/Release/*.node",
      "./generated/**",
      "./prisma/schema.prisma",
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        pathname: "/multibase/**",
      },
    ],
  },
};

export default nextConfig;
