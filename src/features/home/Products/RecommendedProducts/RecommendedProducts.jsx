// src/features/home/Products/RecommendedProducts/RecommendedProducts.jsx
import React, { useState, useEffect } from 'react';
import ProductCarousel from '@/components/common/ProductCarousel';
import ProductCard from '@/components/common/ProductCard';
import { useLanguage } from "@/context/LanguageContext";
import apiClient from '@/api/apiClient';
import { getPreferredCategory } from '@/utils/recommendationHelpers'; // Import helper

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [titleKey, setTitleKey] = useState("home.recommended"); // Key để dịch title động
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchRecommended = async () => {
      setIsLoading(true);
      try {
        // 1. Lấy category người dùng thích nhất từ LocalStorage
        const topCategory = getPreferredCategory();
        
        let apiProducts = [];

        if (topCategory) {
          // CASE A: Có lịch sử -> Gọi API theo category đó
          // Giả sử API hỗ trợ params { category: '...' }
          apiProducts = await apiClient.getProducts({ category: topCategory });
          setTitleKey("home.recommendedForYou"); // Ví dụ: "Dành riêng cho bạn"
        } else {
          // CASE B: Cold Start (Chưa có lịch sử) -> Gọi sản phẩm Hot/Bán chạy
          // Để lấp đầy chỗ trống thay vì ẩn đi
          apiProducts = await apiClient.getProducts({ show: 'hot' }); 
          setTitleKey("home.hotProducts"); // Ví dụ: "Sản phẩm nổi bật"
        }
        
        // Transform dữ liệu (giống FeaturedProducts)
        const transformedProducts = apiProducts.map(p => ({
            id: p.id,
            product: p,
            title: p.name,
            href: `/${p.slug}.html`,
            images: p.images_card,
            price: p.price,
            oldPrice: p.oldPrice,
            salePercent: p.salePercent,
            isNew: !p.oldPrice
        }));
        
        // Lấy 8 sản phẩm
        setProducts(transformedProducts.slice(0, 8));
        
      } catch (error) {
        console.error("Failed to fetch recommended products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommended();
  }, [language]); // Fetch lại khi đổi ngôn ngữ để lấy đúng name sản phẩm nếu API trả về theo lang

  if (isLoading) return null; // Hoặc loading skeleton
  if (products.length === 0) return null; // Không có sản phẩm thì ẩn luôn section

  return (
    <section className="py-12 bg-gray-50"> {/* Thêm bg nhẹ để tách biệt */}
      <div className="collection_container">
        {/* Render title động dựa vào việc có history hay không */}
        <h2 className="section-title">
            <span>{t(titleKey) || t("home.recommended")}</span>
        </h2>
        
        <ProductCarousel>
          {products.map((product) => (
            <div key={product.id} className="product-carousel-item">
              <ProductCard
                product={product.product}
                href={product.href}
                title={product.title}
                images={product.images}
                showAddToCart={false}
                price={product.price}
                oldPrice={product.oldPrice}
                salePercent={product.salePercent}
                isNew={product.isNew}
              />
            </div>
          ))}
        </ProductCarousel>
      </div>
    </section>
  );
};

export default RecommendedProducts;