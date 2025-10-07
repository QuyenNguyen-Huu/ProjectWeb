import React from "react";

const ProductCard = ({
    title,
    href,
    images = [],
    price,
    oldPrice,
    showAddToCart = true,
    salePercent = 0,
    isNew = false,
    isGift = false
}) => {
    return (
        <div className="collection-products_item">
            <div className="mb-0 relative text-left group h-full">

                {/* Sale Flash */}
                {salePercent > 0 && (
                    <div className="sale-flash relative">
                        <p className="absolute top-[16%]">{salePercent}%</p>
                    </div>
                )}

                {/* Gift Tag */}
                {isGift && (
                    <div className="tag-gift absolute -top-1 lg:top-[6%] left-1/3 lg:left-[25%] z-50">
                        <img
                            className="max-w-8 max-h-8"
                            loading="lazy"
                            src="https://web.nvnstatic.net/tp/T0194/img/store/43017/gift.png?v=9"
                            alt="Gift"
                        />
                    </div>
                )}
                {/* Ảnh */}
                <a href={href} title={title} className="block relative w-auto h-auto overflow-hidden">
                    {/* New / Best Seller Tag */}
                    {isNew && (
                        <div className="tag-new tag-best-seller w-[150px] h-[150px] overflow-hidden absolute -top-2.5 -right-2.5 z-[100] text-center uppercase text-[10px]">
                            <span className="absolute -left-[25px] top-[30px] w-[265px] px-0 py-[3px] rotate-[45deg] bg-[#F44336] text-white text-center shadow-[0_0_10px_rgba(0,0,0,0.2)] text-shadow-[0_1px_1px_rgba(0,0,0,0.2)] outline-[3px_solid_#F44336]">
                                Best Seller
                            </span>
                        </div>
                    )}
                    {images[0] && (
                        <img
                            src={images[0]}
                            alt={`${title} 1`}
                            className="max-h-[340px] h-full object-contain transition-all duration-500 group-hover:translate-x-full opacity-100"
                        />
                    )}
                    {images[1] && (
                        <img
                            src={images[1]}
                            alt={`${title} 2`}
                            className="absolute top-0 left-0 max-h-[340px] h-full object-contain -translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                    )}
                </a>

                {/* Action buttons */}
                <div className="action-button absolute top-1/6 left-[10%] -translate-x-1/2 flex gap-1 flex-col opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
                    <a
                        href={href}
                        title="Xem nhanh"
                        className="w-11 h-11 bg-white hover:bg-[#673AB7] rounded text-center leading-[44px] text-[13px] transition-all duration-500 mb-1 mx-[3px]"
                    >
                        <i className="fa fa-search-plus text-black transition-colors duration-300"></i>
                    </a>

                    <a
                        href={href}
                        title="Xem chi tiết"
                        className="w-11 h-11 bg-white hover:bg-[#673AB7] rounded text-center leading-[44px] text-[13px] transition-all duration-500 mb-1 mx-[3px]"
                    >
                        <i className="fa fa-eye text-black transition-colors duration-300"></i>
                    </a>
                </div>

                {/* Product info */}
                <div className="product-info flex flex-col justify-center px-[15px] pt-0 pb-[20px] text-center">
                    <h3 className="text-[#673AB7] text-base leading-[18px] normal-case break-words font-semibold line-clamp-2 mt-[5px] mb-[4px]">
                        <a href={href} title={title}>
                            {title}
                        </a>
                    </h3>

                    <div className="flex flex-col sm:flex-row md:flex-col sm:gap-2 md:gap-0 justify-center">
                        <span className="text-[1em] font-bold text-[#f47435]">{price}</span>
                        {oldPrice && (
                            <span className="line-through text-[1em] leading-[23px] text-[#adadad]">
                                {oldPrice}
                            </span>
                        )}
                    </div>

                    {showAddToCart && (
                        <div className="hidden lg:inline-block">
                            <a href={href} data-id="" className="inline-block">
                                Thêm vào giỏ hàng
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
