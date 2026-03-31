import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Rewrites para servir archivos dinámicos como estáticos
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/robots.txt',
          destination: '/api/robots.txt',
        },
        {
          source: '/llm.txt',
          destination: '/api/llm.txt',
        },
      ],
    };
  },
};

export default nextConfig;
