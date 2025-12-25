import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Set output file tracing root to prevent lockfile warnings
  outputFileTracingRoot: __dirname,
  // Server Actions body size limit
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Suppress service worker 404 warnings
  async rewrites() {
    return [];
  },
  webpack: (config, { isServer }) => {
    // Monaco Editor configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;

