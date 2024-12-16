import type { NextConfig } from "next";
import tsConfigPaths from 'tsconfig-paths';
import  tsConfig from './tsconfig.json';

const nextConfig: NextConfig = {
  baseUrl: tsConfig.compilerOptions.baseUrl,
  paths: tsConfig.compilerOptions.paths,
  //env file
  env: {
    API_URL: process.env.API_URL,
    MONGODB_URL: process.env.MONGODB_URL,
  },
};

export default nextConfig;
