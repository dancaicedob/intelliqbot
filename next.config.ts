import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Image optimization: reduce variants and formats
  images: {
    deviceSizes: [320, 420, 640],
    imageSizes: [300],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
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
