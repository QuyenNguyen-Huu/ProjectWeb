// src/features/home/Collections/components/Products/ProductGrid.jsx
import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { useLanguage } from "@/context/LanguageContext";

const ProductGrid = ({ isLoading, products }) => {
    const { t, language } = useLanguage();
    
    if (isLoading)
        return (
            <div className="text-center py-20 text-gray-500">
                {t('common.loading')}
            </div>
        );

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((productItem, index) => (
                <ProductCard 
                    key={index} 
                    {...productItem}
                    product={productItem.product || productItem}
                    showAddToCart={true} 
                />
            ))}
        </div>
    );
};

export default ProductGrid;
