import ProductCard from '@/components/common/ProductCard'
import React from 'react'

const CollectionGrid = ({ products }) => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[5px] gap-y-[15px]">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    title={product.title}
                    href={product.href}
                    images={product.images}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    salePercent={product.salePercent}
                    isNew={product.isNew}
                    isGift={product.isGift}
                    showAddToCart={true}
                />
            ))}
        </div>
    )
}

export default CollectionGrid