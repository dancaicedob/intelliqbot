import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Target modern browsers (ES2020+) to avoid polyfills
  swcMinify: true,
  
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
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 424, 640, 750, 828],
    imageSizes: [348], // Only this size for logo
  },
};

export default nextConfig;
