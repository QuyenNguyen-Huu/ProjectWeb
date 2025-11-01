import React, { useState } from 'react';

const SIZES_MOCK = ["36", "37.5", "38", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3"];

const ProductQuickView = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (/^[1-9]\d*$/.test(value) || value === "") {
            setQuantity(value ? parseInt(value) : 1);
        }
    };

    if (!product) return null;

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white rounded-lg max-w-4xl w-full relative shadow-2xl transform transition-all duration-300 scale-100 animate-zoomIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
                    aria-label="Đóng"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Layout 2 cột */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Cột ảnh */}
                    <div className="p-8">
                        <img
                            src={product.images?.[0]}
                            alt={product.title}
                            className="w-full h-auto object-contain rounded"
                        />
                    </div>

                    {/* Cột thông tin */}
                    <div className="p-8 flex flex-col gap-4">
                        <a
                            href={product.href}
                            title={product.title}
                            className="text-2xl font-bold !text-gray-900 hover:!text-purple-600 transition-colors"
                        >
                            {product.title}
                        </a>

                        <p className="text-sm text-gray-500">
                            <span>Mã SP: {product.id || "SP001"}</span>
                            <span className="mx-2">|</span>
                            <span>Thương hiệu: HOKA</span>
                        </p>

                        <p className="text-3xl font-bold text-[#f47435]">{product.price}</p>

                        {/* Size */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kích cỡ:</label>
                            <div className="flex flex-wrap gap-2">
                                {SIZES_MOCK.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded border text-sm ${
                                            selectedSize === size
                                                ? "border-orange-500 ring-2 ring-orange-200 bg-orange-50"
                                                : "border-gray-300 hover:border-orange-400"
                                        } transition-all`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Số lượng & Thêm giỏ hàng */}
                        <div className="flex items-center gap-4 mt-4">
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                className="w-20 border border-gray-300 rounded p-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-300"
                                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            />
                            <button
                                className="flex-1 bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors"
                            >
                                THÊM VÀO GIỎ HÀNG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;
