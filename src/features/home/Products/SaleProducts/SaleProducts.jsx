// src/features/home/Products/SaleProducts/SaleProducts.jsx (ĐÃ CẬP NHẬT)
import React, { useState, useEffect } from 'react';
import ProductCarousel from '@/components/common/ProductCarousel';
import ProductCard from '@/components/common/ProductCard';
import { useLanguage } from "@/context/LanguageContext";
// 1. BỎ import mockProducts
// import { mockSaleProducts } from '../data/mockProducts';

// 2. IMPORT apiClient
import apiClient from '@/api/apiClient'; //

const SaleProducts = () => {
  // 3. Thêm state
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage(); // Thêm language

  // 4. Thêm useEffect để gọi API
  useEffect(() => {
    const fetchSaleProducts = async () => {
      setIsLoading(true);
      try {
        // Gọi API, sắp xếp theo 'discount' (sản phẩm sale)
        // (Lambda mới của chúng ta đã hỗ trợ 'discount')
        const apiProducts = await apiClient.getProducts({ show: 'discount' });
        
        // Chuyển đổi dữ liệu
        const transformedProducts = apiProducts.map(p => ({
            id: p.id,
            product: p, // Truyền toàn bộ product object
            title: p.name,
            href: `/${p.slug}.html`,
            images: p.images_card,
            price: p.price,
            oldPrice: p.oldPrice,
            salePercent: p.salePercent,
            isNew: false // Đây là khu vực Sale nên không cần tag New
        }));
        
        // Lấy 8 sản phẩm
        setProducts(transformedProducts.slice(0, 8)); 
        
      } catch (error) {
        console.error("Lỗi fetch sản phẩm sale:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleProducts();
  }, [language]); // Thêm language vào dependency để re-fetch khi đổi ngôn ngữ

  // 5. Thêm giao diện Loading
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="collection_container">
          <h2 className="section-title"><span>{t("home.saleProducts")}</span></h2>
          <div className="text-center py-10">{t("common.loading")}</div>
        </div>
      </section>
    );
  }

  // 6. Sửa 'mockSaleProducts' thành 'products'
  return (
    <section className="py-12">
      <div className="collection_container">
        <h2 className="section-title"><span>{t("home.saleProducts")}</span></h2>
        <ProductCarousel>
          {products.map((product) => (
            <div key={product.id} className="product-carousel-item">
              <ProductCard
                product={product.product}
                href={product.href}
                title={product.title}
                images={product.images}
                price={product.price}
                oldPrice={product.oldPrice}
                salePercent={product.salePercent}
                showAddToCart={false}
              />
            </div>
          ))}
        </ProductCarousel>

        <div className="text-center">
          <a href="/san-pham-sale" className="view-more-btn">
            {t("common.viewMore")}
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default SaleProducts;