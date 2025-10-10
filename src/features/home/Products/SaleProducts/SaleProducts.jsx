// src/features/home/SaleProducts/SaleProducts.jsx
import React from 'react';
import ProductCarousel from '@/components/common/ProductCarousel';
import ProductCard from '@/components/common/ProductCard';
import { mockSaleProducts } from '../data/mockProducts';

const SaleProducts = () => {
  return (
    <section className="py-12">
      <div className="collection_container">
        <h2 className="section-title">Sản phẩm Sale Off</h2>
        <ProductCarousel>
          {mockSaleProducts.map((product) => (
            <div key={product.id} className="product-carousel-item">
              <ProductCard
                href={product.href}
                title={product.title}
                images={product.images}
                price={product.price}
                oldPrice={product.oldPrice}
                salePercent={product.salePercent}
                // --- Ẩn các thông tin không cần thiết ---
                showAddToCart={false}
              />
            </div>
          ))}
        </ProductCarousel>

        <div className="text-center">
          <a href="/san-pham-sale" className="view-more-btn">
            Xem thêm
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default SaleProducts;