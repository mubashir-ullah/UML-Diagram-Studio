/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Server Actions body size limit (Next.js 15 - stable format)
  serverActions: {
    bodySizeLimit: '2mb',
  },
  // Suppress service worker 404 warnings
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.umldiagram.app' }],
        destination: 'https://umldiagram.app/:path*',
        permanent: true,
      },
    ];
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

