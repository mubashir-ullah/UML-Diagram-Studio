/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Server Actions body size limit (Next.js 15 format)
  serverActions: {
    bodySizeLimit: '2mb',
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

