import React, { useState } from 'react'; // Bỏ 'useEffect' vì không dùng
import { Link } from 'react-router-dom';
// Import context
import { useCart } from '../context/cartContext';
import { ChevronLeft } from 'lucide-react';

// --- COMPONENT CON: Dòng sản phẩm (Desktop) ---
// (Các hàm và state cho 'Số lượng' nằm ở đây)
const CartItemRow = ({ item }) => {
    const { updateQuantity, removeFromCart, formatCurrency } = useCart();

    // 1. Tạo state cục bộ để quản lý việc gõ input
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    // 2. Hàm 'onChange' (khi đang gõ)
    const handleChange = (e) => {
        setLocalQuantity(e.target.value);
    };

    // 3. Hàm 'onBlur' (khi click ra ngoài)
    const handleBlur = () => {
        const quantityNum = parseInt(localQuantity, 10);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            setLocalQuantity(1);
            updateQuantity(item.id, item.size, 1);
        } else {
            setLocalQuantity(quantityNum);
            updateQuantity(item.id, item.size, quantityNum);
        }
    };

    // 4. Hàm xử lý xóa
    const handleRemove = () => {
        removeFromCart(item.id, item.size);
    };

    return (
        <tr key={`${item.id}-${item.size}`} className="border-b border-gray-300 align-middle">
            <td className="p-4 flex justify-center">
                <img src={item.image || 'https://placehold.co/100x100'} alt={item.name} className="w-24 h-24 object-cover" />
            </td>
            <td className="p-4 text-center uppercase">
                <Link
                    to={`/${item.id}.html`}
                    className="hover:text-purple-600 cursor-pointer"
                >
                    {item.name}
                    {item.size && ` - ${item.size}`}
                </Link>
            </td>
            <td className="p-4 text-center">{item.price}</td>
            <td className="p-4 text-center">
                <input
                    type="number"
                    value={localQuantity} // Trói input vào STATE CỤC BỘ
                    onChange={handleChange}  // Dùng onChange để gõ
                    onBlur={handleBlur}      // Dùng onBlur để lưu
                    min="1"
                    className="w-24 h-11 text-center border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
                />
            </td>
            <td className="p-4 text-center text-red-500 font-semibold">
                {formatCurrency(parseFloat(item.price.replace(/[^0-9]/g, '')) * item.quantity)}
            </td>
            <td className="p-4 text-center">
                <button onClick={handleRemove} className="text-gray-500 hover:text-red-500">
                    Xóa
                </button>
            </td>
        </tr>
    );
};

// --- COMPONENT CON : Dòng sản phẩm (Mobile) ---
const CartItemRowMobile = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    const handleChange = (e) => {
        const value = e.target.value;
        setLocalQuantity(value); // Cập nhật state cục bộ

        // để cập nhật "kho"
        const quantityNum = parseInt(value, 10);
        if (quantityNum > 0) {
            updateQuantity(item.id, item.size, quantityNum);
        }
    };

    const handleBlur = () => {
        const quantityNum = parseInt(localQuantity, 10);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            setLocalQuantity(1);
            updateQuantity(item.id, item.size, 1);
        } else {
            setLocalQuantity(quantityNum);
            updateQuantity(item.id, item.size, quantityNum);
        }
    };

    const handleRemove = () => {
        removeFromCart(item.id, item.size);
    };

    return (
        <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-gray-300 pb-4 items-center">
            <img src={item.image || 'https://placehold.co/100x100'} alt={item.name} className="w-24 h-24 object-cover" />
            <div className="flex-1">
                <p className="font-semibold uppercase">
                    <Link
                        to={`/${item.id}.html`}
                        className="hover:text-purple-600 cursor-pointer"
                    >
                        {item.name}
                        {item.size && ` - ${item.size}`}
                    </Link>
                </p>
                <p className="text-gray-600 mt-1">{item.price}</p>
            </div>
            <div className="flex flex-col items-end justify-between">
                <input
                    type="number"
                    value={localQuantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="1"
                    className="w-20 h-9 text-center border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
                />
                <button onClick={handleRemove} className="text-gray-500 hover:text-red-500 mt-2">
                    Xóa
                </button>
            </div>
        </div>
    );
};


// --- Component Cha (CartPage) ---
// (Đã xóa các hàm và state bị thừa)
const CartPage = () => {
    const { cartItems, calculateTotal, formatCurrency } = useCart();
    const total = calculateTotal();

    return (
        <div className="container mx-auto px-4 py-8 text-gray-800 font-sans">

            {/* 1. Breadcrumb */}
            <div className="text-sm mb-6">
                <Link to="/" className="text-gray-800 hover:text-purple-600 hover:underline cursor-pointer">
                    Trang chủ
                </Link>
                <span className="px-2 text-gray-500">/</span>
                <span className="text-gray-500">Giỏ hàng</span>
            </div>

            {/* 2. Title  */}
            <h1 className="text-3xl font-semibold mb-2 uppercase text-gray-900">Giỏ hàng</h1>
            <h2 className="md:hidden text-lg text-gray-600 mb-6">Giỏ hàng của bạn</h2>

            {/* 3. Logic hiển thị Giỏ hàng */}
            {cartItems.length === 0 ? (
                // --- GIỎ HÀNG RỖNG --- 
                <div className="pt-8 pb-16">
                    <p className="text-lg mb-6 text-gray-800">Giỏ hàng rỗng</p>
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 w-fit cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                        Trang chủ
                    </Link>
                </div>
            ) : (
                // --- GIỎ HÀNG ĐẦY ĐỦ --- 
                <div>
                    {/* === 4. BẢNG CHO DESKTOP === */}
                    <table className="hidden md:table w-full text-left border-collapse">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="p-4 text-center">Hình ảnh</th>
                                <th className="p-4 text-center">Tên sản phẩm</th>
                                <th className="p-4 text-center">Đơn giá</th>
                                <th className="p-4 text-center">Số lượng</th>
                                <th className="p-4 text-center">Thành tiền</th>
                                <th className="p-4 text-center">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <CartItemRow item={item} key={`${item.id}-${item.size}`} />
                            ))}
                        </tbody>
                    </table>

                    {/* === 5. LIST CHO MOBILE ===  */}
                    <div className="md:hidden space-y-6">
                        {cartItems.map(item => (
                            <CartItemRowMobile item={item} key={`${item.id}-${item.size}`} />
                        ))}
                    </div>

                    {/* === 6. TỔNG TIỀN & NÚT (DESKTOP) === */}
                    <div className="hidden md:block mt-8">
                        <div className="flex justify-end items-center mb-4">
                            <span className="text-xl">Tổng tiền:</span>
                            <span className="text-2xl font-bold text-red-500 ml-4">{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Link
                                to="/"
                                title="Tiếp tục mua hàng"
                                className="px-8 py-3 bg-gray-200 text-black hover:bg-gray-300 transition-colors cursor-pointer rounded-full font-semibold"
                            >
                                Tiếp tục mua hàng
                            </Link>
                            <button
                                title="Tiến hành đặt hàng"
                                className="px-8 py-3 bg-purple-600 text-white hover:bg-purple-700 transition-colors cursor-pointer rounded-full font-semibold"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>

                    {/* === 7. TỔNG TIỀN & NÚT (MOBILE) ===  */}
                    <div className="md:hidden mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg text-gray-900">Tổng tiền</span>
                            <span className="text-xl font-bold text-red-500">{formatCurrency(total)}</span>
                        </div>
                        <div className="space-y-4">

                            <button className="w-full px-6 py-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-full font-semibold">
                                Tiến hành thanh toán
                            </button>

                            <Link
                                to="/"
                                className="block w-full text-center px-6 py-4 bg-gray-200 text-black hover:bg-gray-300 transition-colors rounded-full font-semibold"
                            >
                                Tiếp tục mua hàng
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;