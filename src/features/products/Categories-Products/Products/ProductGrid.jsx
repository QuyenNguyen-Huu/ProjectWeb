// src/features/home/Collections/components/Products/ProductGrid.jsx
import React from "react";
import ProductCard from "@/components/common/ProductCard";

const ProductGrid = ({ isLoading, products }) => {
    if (isLoading)
        return (
            <div className="text-center py-20 text-gray-500">
                Đang tải sản phẩm...
            </div>
        );

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <ProductCard key={index} {...product} showAddToCart={true} />
            ))}
        </div>
    );
};

export default ProductGrid;
