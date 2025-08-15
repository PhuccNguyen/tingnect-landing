export const metadata = {
  title: 'Chính sách bảo mật - TingNect',
  description: 'Chính sách bảo mật và xử lý dữ liệu của TingNect',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Chính sách bảo mật</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">
            Cập nhật lần cuối: 15/08/2025
          </p>
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Thu thập thông tin</h2>
            <p className="text-gray-300 mb-4">
              Chúng tôi thu thập thông tin cần thiết để xác minh thẻ thành viên và cung cấp dịch vụ hỗ trợ.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">2. Sử dụng thông tin</h2>
            <p className="text-gray-300 mb-4">
              Thông tin chỉ được sử dụng cho mục đích xác minh và liên hệ hỗ trợ, không dùng cho mục đích khác.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">3. Thời gian lưu trữ</h2>
            <p className="text-gray-300 mb-4">
              Dữ liệu được lưu tối đa 90 ngày, sau đó sẽ được xóa theo quy trình.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">4. Quyền của bạn</h2>
            <p className="text-gray-300">
              Bạn có quyền yêu cầu chỉnh sửa hoặc xóa dữ liệu bất cứ lúc nào tại support@tingnect.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
