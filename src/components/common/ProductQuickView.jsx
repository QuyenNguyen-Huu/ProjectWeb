import React, { useState, useEffect } from 'react';
// --- THÊM IMPORT ---
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext'; // Import hook giỏ hàng
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/utils/formatCurrency';

const ProductQuickView = ({ product, onClose }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { t, language } = useLanguage();

    // Lấy sizes từ product, fallback về array rỗng nếu không có
    const availableSizes = product?.product?.sizes || product?.sizes || [];

    // ESC key để đóng modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleQuantityIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!selectedSize) {
            alert(language === 'vi' ? 'Vui lòng chọn size!' : 'Please select a size!');
            return;
        }
        
        const productName = language === 'en' && product.product?.name_en 
            ? product.product.name_en 
            : product.title;
        
        const itemToAdd = {
            id: product.id || product.product?.id || "SP001",
            name: productName,
            name_vi: product.title,
            name_en: product.product?.name_en || product.title,
            price: product.price,
            image: product.images?.[0],
            size: selectedSize,
            quantity: quantity,
            href: product.href
        };
        
        addToCart(itemToAdd);
        alert(language === 'vi' 
            ? `Đã thêm ${productName} vào giỏ hàng!` 
            : `Added ${productName} to cart!`
        );
        onClose();
    };

    if (!product) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100000] p-4"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-white rounded-lg max-w-4xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition z-10 bg-white rounded-full p-1 shadow-md cursor-pointer"
                    aria-label={t('common.close')}
                    title="Đóng (ESC)"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Layout 2 cột */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Cột ảnh (giữ nguyên) */}
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
                            title={language === 'en' && product.product?.name_en ? product.product.name_en : product.title}
                            className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
                        >
                            {language === 'en' && product.product?.name_en ? product.product.name_en : product.title}
                        </a>

                        <p className="text-sm text-gray-500">
                            <span>{t('product.detail.sku')}: {product.id || "SP001"}</span>
                            <span className="mx-2">|</span>
                            <span>{t('product.detail.brand')}: HOKA</span>
                        </p>

                        <p className="text-3xl font-bold text-[#f47435]">{formatCurrency(product.price)}</p>

                        {/* Size (giữ nguyên) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.filter.size')}:</label>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.length > 0 ? (
                                    availableSizes.map((size) => (
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
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">{language === 'vi' ? 'Không có size' : 'No sizes available'}</p>
                                )}
                            </div>
                        </div>

                        {/* Số lượng & Thêm giỏ hàng */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="relative w-20">
                                <input
                                    type="text"
                                    readOnly
                                    value={quantity}
                                    className="w-full h-12 text-center border border-gray-300 rounded-full pr-6 outline-none"
                                />
                                <div className="absolute right-1 top-0 h-full flex flex-col justify-center">
                                    <button
                                        type="button"
                                        onClick={handleQuantityIncrease}
                                        className="text-gray-600 h-1/2 flex items-center justify-center px-1 hover:text-purple-600 transition cursor-pointer"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 448 512">
                                            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleQuantityDecrease}
                                        disabled={quantity <= 1}
                                        className="text-gray-600 h-1/2 flex items-center justify-center px-1 hover:text-purple-600 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 448 512">
                                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 351.3 86.6 214.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={!selectedSize}
                                className="flex-1 bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {t('product.detail.addToCartBtn')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;