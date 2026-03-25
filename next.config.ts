import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Explicitly include Prisma generated client and schema in standalone build.
  outputFileTracingIncludes: {
    "**": [
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
