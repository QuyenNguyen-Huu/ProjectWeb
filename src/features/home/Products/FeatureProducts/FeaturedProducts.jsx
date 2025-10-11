// src/features/home/FeaturedProducts/FeaturedProducts.jsx
import React from 'react';
import ProductCarousel from '@/components/common/ProductCarousel';
import ProductCard from '@/components/common/ProductCard';
import { mockNewProducts } from '../data/mockProducts';

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="collection_container">
        <h2 className="section-title">Sản phẩm mới</h2>
        <ProductCarousel>
          {mockNewProducts.map((product) => (
            <div key={product.id} className="product-carousel-item">
              <ProductCard
                href={product.href}
                title={product.title}
                images={product.images}
                showAddToCart={false}
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