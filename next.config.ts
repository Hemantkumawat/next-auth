import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    MONGODB_URL: process.env.MONGODB_URL,
  },
};

export default nextConfig;
