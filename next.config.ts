/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ THÊM DÒNG NÀY
  images: {
    domains: ['localhost', 'tingnect.com', 'event.tingnect.com'],
  },
  // Không cần rewrites vì đã dùng middleware
};

export default nextConfig;
