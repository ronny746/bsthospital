import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://200.97.168.107:5432/api/:path*',
      },
    ];
  },
};

export default nextConfig;
