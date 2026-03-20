import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: {
    browserToTerminal: 'error',
  },
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
