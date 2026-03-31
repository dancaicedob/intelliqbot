import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Use Turbopack (default in Next.js 16)
  // Turbopack handles optimization automatically
  turbopack: {},
  
  // NO transpile polyfills - target ES2022 browsers only
  transpilePackages: [],
  
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
