import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import context
import { useCart } from '../context/cartContext';
// Thêm icon ChevronUp và ChevronDown
import { ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';

// --- COMPONENT CON: Dòng sản phẩm (Desktop) ---
const CartItemRow = ({ item }) => {
    const { updateQuantity, removeFromCart, formatCurrency } = useCart();
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    const handleChange = (e) => {
        setLocalQuantity(e.target.value);
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

    const handleIncrement = () => {
        const currentVal = parseInt(localQuantity, 10) || 0;
        const newQuantity = currentVal + 1;
        setLocalQuantity(newQuantity);
        updateQuantity(item.id, item.size, newQuantity);
    };

    const handleDecrement = () => {
        const currentVal = parseInt(localQuantity, 10) || 0;
        const newQuantity = Math.max(1, currentVal - 1);
        setLocalQuantity(newQuantity);
        updateQuantity(item.id, item.size, newQuantity);
    };

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
                <div className="relative w-24 h-11 mx-auto group">
                    <input
                        type="number"
                        value={localQuantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1"
                        className="w-full h-full text-center border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 pl-8 pr-8 appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="absolute right-0 top-0 h-full w-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full">
                        <button
                            onClick={handleIncrement}
                            className="flex items-center justify-center h-1/2 text-gray-600 hover:text-purple-600"
                            aria-label="Tăng số lượng"
                        >
                            <ChevronUp size={16} />
                        </button>
                        <button
                            onClick={handleDecrement}
                            className="flex items-center justify-center h-1/2 text-gray-600 hover:text-purple-600"
                            aria-label="Giảm số lượng"
                        >
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </td>

            <td className="p-4 text-center font-semibold">
                {formatCurrency(parseFloat(item.price.replace(/[^0-9]/g, '')) * item.quantity).replace(/[^0-9.,]/g, '')} VNĐ
            </td>

            <td className="p-4 text-center">
                <button onClick={handleRemove} className="text-gray-500 hover:text-red-500 cursor-pointer">
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
        setLocalQuantity(value);
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

    const handleIncrement = () => {
        const currentVal = parseInt(localQuantity, 10) || 0;
        const newQuantity = currentVal + 1;
        setLocalQuantity(newQuantity);
        updateQuantity(item.id, item.size, newQuantity);
    };

    const handleDecrement = () => {
        const currentVal = parseInt(localQuantity, 10) || 0;
        const newQuantity = Math.max(1, currentVal - 1);
        setLocalQuantity(newQuantity);
        updateQuantity(item.id, item.size, newQuantity);
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
                <p className="text-gray-600 mt-1">
                    Giá : <span className="text-purple-600">{item.price}</span>
                </p>
            </div>
            <div className="flex flex-col items-center justify-between">
                
                <div className="flex items-center justify-center w-24 h-9 border border-gray-300 rounded-full overflow-hidden">
                    <input
                        type="number"
                        value={localQuantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1"
                        className="w-16 h-full text-center border-r border-gray-300 focus:outline-none appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex-1 h-full flex flex-col justify-center items-center">
                        <button
                            onClick={handleIncrement}
                            className="h-1/2 text-gray-600 hover:bg-gray-100 w-full flex items-center justify-center"
                            aria-label="Tăng số lượng"
                        >
                            <ChevronUp size={14} />
                        </button>
                        <button
                            onClick={handleDecrement}
                            className="h-1/2 text-gray-600 hover:bg-gray-100 w-full flex items-center justify-center border-t border-gray-200"
                            aria-label="Giảm số lượng"
                        >
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <button onClick={handleRemove} className="text-gray-500 hover:text-red-500 mt-2">
                    Xóa
                </button>
            </div>
        </div>
    );
};


// --- Component Cha (CartPage) ---
const CartPage = () => {
    const { cartItems, calculateTotal, formatCurrency } = useCart();
    const total = calculateTotal();

    return (
        <div className="container mx-auto px-4 py-8 text-gray-800 font-sans">

            <div className="text-sm mb-6">
                <Link to="/" className="text-gray-800 hover:text-purple-600 hover:underline cursor-pointer">
                    Trang chủ
                </Link>
                <span className="px-2 text-gray-500">/</span>
                <span className="text-gray-500">Giỏ hàng</span>
            </div>

            <h1 className="text-3xl font-semibold mb-2 uppercase text-gray-900">Giỏ hàng</h1>
            <h2 className="md:hidden text-lg text-gray-600 mb-6">Giỏ hàng của bạn</h2>

            {cartItems.length === 0 ? (
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
                <div>
                    {/* === BẢNG CHO DESKTOP === */}
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

                    {/* === LIST CHO MOBILE ===  */}
                    <div className="md:hidden space-y-6">
                        {cartItems.map(item => (
                            <CartItemRowMobile item={item} key={`${item.id}-${item.size}`} />
                        ))}
                    </div>

                    {/* === TỔNG TIỀN & NÚT (DESKTOP) === */}
                    <div className="hidden md:block mt-8">
                        <div className="flex justify-end items-center mb-4">
                            <span className="text-xl">Tổng tiền:</span>
                            {/* ==========================================================
                            === THAY ĐỔI 1: ĐỔI TỔNG TIỀN (DESKTOP) SANG MÀU TÍM ===
                            ==========================================================
                            */}
                            <span className="text-2xl font-bold text-purple-600 ml-4">{formatCurrency(total).replace(/[^0-9.,]/g, '')} VNĐ</span>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Link
                                to="/"
                                title="Tiếp tục mua hàng"
                                className="px-8 py-3 bg-gray-200 text-black hover:bg-gray-300 transition-colors cursor-pointer rounded-full font-semibold uppercase"
                            >
                                Tiếp tục mua hàng
                            </Link>
                            <button
                                title="Tiến hành đặt hàng"
                                className="px-8 py-3 bg-purple-600 text-white hover:bg-purple-700 transition-colors cursor-pointer rounded-full font-semibold uppercase"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>

                    {/* === TỔNG TIỀN & NÚT (MOBILE) ===  */}
                    <div className="md:hidden mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg text-gray-900">Tổng tiền</span>
                            {/* ==========================================================
                            === THAY ĐỔI 2: ĐỔI TỔNG TIỀN (MOBILE) SANG MÀU TÍM ===
                            ==========================================================
                            */}
                            <span className="text-xl font-bold text-purple-600">{formatCurrency(total).replace(/[^0-9.,]/g, '')} VNĐ</span>
                        </div>
                        <div className="space-y-4">
                            <button className="w-full px-6 py-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-full font-semibold uppercase">
                                Tiến hành thanh toán
                            </button>

                            <Link
                                to="/"
                                className="block w-full text-center px-6 py-4 bg-gray-200 text-black hover:bg-gray-300 transition-colors rounded-full font-semibold uppercase"
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