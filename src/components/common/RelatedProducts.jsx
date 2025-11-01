// src/features/products/Components/RelatedProducts.jsx

import React from 'react';
import ProductCard from '@/components/common/ProductCard';

const RelatedProducts = ({ products }) => {

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto py-16">
            <h2 className="text-3xl font-bold text-center mb-8 uppercase">
                Sản phẩm liên quan
            </h2>

            {/* Carousel dùng CSS Scroll Snap 
                - Yêu cầu Mobile (2 items): Dùng w-[48%]
                - Yêu cầu Desktop (4 items): Dùng lg:w-[24%]
            */}
            <div className="flex overflow-x-auto gap-3 lg:gap-5 snap-x snap-mandatory scroll-smooth scrollbar-none">
                
                {products.map((product, index) => (
                    <div 
                        key={index} 
                        className="flex-none snap-start w-[48%] lg:w-[24%]"
                    >
                        {/* ProductCard đã tự xử lý link (yêu cầu 6) */}
                        <ProductCard {...product} />
                    </div>
                ))}

            </div>
        </section>
    );
};

export default RelatedProducts;