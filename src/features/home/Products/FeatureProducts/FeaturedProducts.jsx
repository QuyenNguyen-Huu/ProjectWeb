// src/features/home/Products/FeatureProducts/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import ProductCarousel from '@/components/common/ProductCarousel';
import ProductCard from '@/components/common/ProductCard';
// 1. BỎ import mockProducts
// import { mockNewProducts } from '../data/mockProducts'; 

// 2. IMPORT apiClient
import apiClient from '@/api/apiClient'; //

const FeaturedProducts = () => {
  // 3. Thêm state để lưu sản phẩm từ API
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Thêm useEffect để gọi API
  useEffect(() => {
    const fetchNewProducts = async () => {
      setIsLoading(true);
      try {
        // Gọi API, sắp xếp theo 'new' (sản phẩm mới nhất)
        const apiProducts = await apiClient.getProducts({ show: 'new' });
        
        // Chuyển đổi dữ liệu API (name -> title) để khớp với ProductCard
        const transformedProducts = apiProducts.map(p => ({
            id: p.id,
            title: p.name,
            href: `/${p.slug}.html`,
            images: p.images_card,
            price: p.price,
            oldPrice: p.oldPrice,
            salePercent: p.salePercent,
            isNew: !p.oldPrice // Gắn tag "Best Seller" (hoặc "New") nếu không sale
        }));
        
        // Chỉ lấy 8 sản phẩm đầu tiên
        setProducts(transformedProducts.slice(0, 8)); 
        
      } catch (error) {
        console.error("Lỗi fetch sản phẩm mới:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewProducts();
  }, []); // Chạy 1 lần khi component mount

  // 5. Thêm giao diện Loading
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="collection_container">
          <h2 className="section-title">Sản phẩm mới</h2>
          <div className="text-center py-10">Đang tải sản phẩm...</div>
        </div>
      </section>
    );
  }

  // 6. Sửa 'mockNewProducts' thành 'products' (từ state)
  return (
    <section className="py-12">
      <div className="collection_container">
        <h2 className="section-title">Sản phẩm mới</h2>
        <ProductCarousel>
          {products.map((product) => (
            <div key={product.id} className="product-carousel-item">
              <ProductCard
                href={product.href}
                title={product.title}
                images={product.images}
                showAddToCart={false}
                price={product.price}
                oldPrice={product.oldPrice}
                salePercent={product.salePercent}
                isNew={product.isNew} // Dùng cờ 'isNew' từ API
                isGift={product.isGift}
              />
            </div>
          ))}
        </ProductCarousel>
        
        <div className="text-center">
          <a href="/san-pham-moi" className="view-more-btn">
            Xem thêm
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedProducts;