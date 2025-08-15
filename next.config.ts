/** @type {import('next').NextConfig} */
const nextConfig = {
  // giữ để build chạy độc lập (Docker/PM2, etc.)
  output: 'standalone',

  images: {
    // vẫn giữ các domain cũ để không ảnh hưởng phần đang chạy
    domains: ['localhost', 'tingnect.com', 'event.tingnect.com'],

    // thêm các nguồn ảnh mới
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/7.x/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
