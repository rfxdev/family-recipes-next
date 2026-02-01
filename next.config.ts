import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        destination: '/recipes',
        permanent: true,
        source: '/',
      },
    ];
  },
};

export default nextConfig;
