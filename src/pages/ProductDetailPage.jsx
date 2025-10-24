import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useIsDesktop from "@/hooks/useIsDesktop"; // Tận dụng hook có sẵn của bạn

export default function ProductDetailPage() {
  const isDesktop = useIsDesktop();
  
  // Dùng useParams để lấy "productSlug" từ URL
  // Tên "productSlug" này khớp với tên trong Route của App.jsx (path="/:productSlug.html")
  const { productSlug } = useParams();

  // Tự động cuộn lên đầu trang khi vào trang
  // Chúng ta theo dõi 'productSlug' để nếu slug thay đổi, trang sẽ cuộn lại lên đầu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productSlug]);

  return (
    // Sử dụng class margin top (mt) giống như HomePage của bạn
    <div className={`${isDesktop ? 'mt-[80px]' : 'mt-[54px]'} container mx-auto px-4 py-8`}>
      
      {/* Container chính cho trang chi tiết, giới hạn chiều rộng */}
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb (mockup) */}
        <div className="text-sm text-gray-500 mb-4">
          Trang chủ / Sản phẩm / {productSlug}
        </div>

        {/* Tên sản phẩm (lấy động từ slug) */}
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {/* Tạm thời hiển thị slug, thay thế các dấu gạch ngang bằng dấu cách */}
          {productSlug.replace(/-/g, ' ')}
        </h1>

        {/* Layout 2 cột: Ảnh và Thông tin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Cột 1: Ảnh sản phẩm (mockup) */}
          <div className="bg-gray-100 w-full min-h-[400px] flex items-center justify-center rounded-lg">
            <span className="text-gray-500 text-lg">[Ảnh sản phẩm]</span>
          </div>

          {/* Cột 2: Thông tin sản phẩm (mockup) */}
          <div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-red-600">1.234.000₫</span>
              <span className="text-xl text-gray-400 line-through ml-3">2.000.000₫</span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Đây là mô tả mockup cho sản phẩm. Khi có dữ liệu thật, chúng ta sẽ
              hiển thị mô tả chi tiết, thông số kỹ thuật và các thông tin 
              khác của sản phẩm tại đây.
            </p>

            {/* Các lựa chọn (ví dụ: Size) */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Kích cỡ:</label>
              <div className="flex gap-2">
                <button className="w-12 h-12 border rounded hover:border-black focus:border-black focus:outline-none transition-all">S</button>
                <button className="w-12 h-12 border rounded hover:border-black focus:border-black focus:outline-none transition-all">M</button>
                <button className="w-12 h-12 border rounded hover:border-black focus:border-black focus:outline-none transition-all">L</button>
                <button className="w-12 h-12 border rounded bg-gray-200 text-gray-400 cursor-not-allowed" disabled>XL</button>
              </div>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <button className="w-full bg-[#f47435] text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[#e66a2a] transition-colors duration-300">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Phần mô tả chi tiết (mockup) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">
            Mô Tả Sản Phẩm
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Đây là nơi dành cho mô tả chi tiết, thông số kỹ thuật,
            công nghệ, hoặc bất kỳ thông tin mở rộng nào về sản phẩm.
            <br/><br/>
            Chúng ta có thể thêm nhiều nội dung HTML phong phú tại đây
            khi bạn đã có dữ liệu.
          </p>
        </div>

      </div>
    </div>
  );
}