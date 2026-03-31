import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // NO transpile polyfills - target ES2022 browsers only
  transpilePackages: [],
  
  webpack: (config, { dev, isServer }) => {
    config.optimization = config.optimization || {};
    if (!dev && !isServer) {
      // Disable module concatenation that can cause polyfills to be included
      config.optimization.concatenateModules = false;
    }
    return config;
  },
  
  // Rewrites para servir archivos dinámicos como estáticos
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap.xml',
        },
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
