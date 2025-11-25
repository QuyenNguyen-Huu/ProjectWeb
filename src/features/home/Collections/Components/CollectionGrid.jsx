import ProductCard from '@/components/common/ProductCard'
import React, { useState } from 'react' // 1. Thêm { useState }

const CollectionGrid = ({ products }) => {
   

    return (
        // 4. Bọc code của bạn trong React Fragment (dấu <>)
        <> 
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[5px] gap-y-[15px]">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={product.product || product}
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
        </>
    )
}

export default CollectionGrid