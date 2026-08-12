/** @type {import('next').NextConfig} */
const nextConfig = {
  // giữ để build chạy độc lập (Docker/PM2, etc.)
  output: 'standalone',

  // `next dev` và `next build` mặc định GHI ĐÈ cùng thư mục .next.
  // Chạy build trong lúc dev server đang chạy sẽ xoá mất chunk mà dev
  // đang tham chiếu -> "Cannot find module './985.js'" và toàn bộ route 500.
  // Biến này cho phép build ra thư mục riêng: dùng `npm run build:verify`.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  images: {
    // vẫn giữ các domain cũ để không ảnh hưởng phần đang chạy
    domains: ['localhost', 'yaaclub.com'],

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

  // Add Security Headers for SEO Trust Signals
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          }
        ]
      }
    ];
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
