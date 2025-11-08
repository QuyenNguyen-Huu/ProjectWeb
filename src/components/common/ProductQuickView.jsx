import React, { useState } from 'react';
// --- THÊM IMPORT ---
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext'; // Import hook giỏ hàng

const SIZES_MOCK = ["36", "37.5", "38", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3"];

const ProductQuickView = ({ product, onClose }) => {
    console.log("Kiểm tra product", product);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // --- THÊM HOOKS ---
    const { addToCart } = useCart();
    const navigate = useNavigate(); // Hook để điều hướng

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (/^[1-9]\d*$/.test(value) || value === "") {
            setQuantity(value ? parseInt(value) : 1);
        }
    };

    // --- THÊM HÀM MỚI ---
    const handleAddToCart = () => {
        // 1. Tạo đối tượng 'item' để thêm vào giỏ
        // (Phải khớp với cấu trúc mà CartPage đang dùng)
        const itemToAdd = {
            id: product.id || "SP001",
            name: product.title,
            price: product.price,
            image: product.images?.[0], // Lấy ảnh đầu tiên
            size: selectedSize,
            quantity: quantity,      // Lấy số lượng từ state
            href: product.href       // Thêm href để dùng trong CartPage
        };
        
        // 2. Gọi hàm từ context
        addToCart(itemToAdd);

        // 3. (Yêu cầu 1) Chuyển hướng đến trang giỏ hàng
        // Thay '/cart' bằng route giỏ hàng của bạn
        navigate('/cart'); 
    };
    // --- KẾT THÚC HÀM MỚI ---

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
                {/* Close button (giữ nguyên) */}
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

                        {/* Size (giữ nguyên) */}
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
                            
                            {/* --- SỬA NÚT BẤM --- */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize} // (Yêu cầu 2) Disable khi chưa chọn size
                                className="flex-1 bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors 
                                           disabled:bg-gray-400 disabled:cursor-not-allowed" // Thêm style cho 'disabled'
                            >
                                THÊM VÀO GIỎ HÀNG
                            </button>
                            {/* --- KẾT THÚC SỬA NÚT BẤM --- */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;