import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../context/cartContext';
// import QuantityInput from '../components/common/QuantityInput';
import { ChevronLeft } from 'lucide-react';

const CartPage = () => {
    // Lấy state và hàm từ Context
    const { cartItems, updateQuantity, removeFromCart, calculateTotal, formatCurrency } = useCart();

    const total = calculateTotal();

    // Hàm xử lý khi thay đổi input số lượng
    const handleQuantityChange = (item, newQuantity) => {
        const quantityNum = parseInt(newQuantity, 10);
        if (quantityNum > 0) {
            updateQuantity(item.id, item.size, quantityNum); // (Lưu ý: hàm updateQuantity này chưa xử lý size)
        } else {
            updateQuantity(item.id, item.size, 1); // Giữ ít nhất là 1
        }
    };

    const handleRemove = (item) => {
        removeFromCart(item.id, item.size);
    };

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
            {/* Title (Mobile)  */}
            <h2 className="md:hidden text-lg text-gray-600 mb-6">Giỏ hàng của bạn</h2>

            {/* 3. Logic hiển thị Giỏ hàng */}
            {cartItems.length === 0 ? (
                // --- GIỎ HÀNG RỖNG --- 
                <div className="pt-8 pb-16">
                    <p className="text-lg mb-6 text-gray-800">Giỏ hàng trống</p>
                    <Link
                        to="/"
                        className="hover:text-purple-600 transition-colors flex items-center gap-2 w-fit cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                        Trang chủ
                    </Link>
                </div>
            ) : (
                // --- GIỎ HÀNG ĐẦY ĐỦ --- 
                <div>
                    {/* === 4. BẢNG CHO DESKTOP ===  */}
                    <table className="hidden md:table w-full text-left border-collapse">
                        <thead className="border-b border-gray-700">
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
                                <tr key={`${item.id}-${item.size}`} className="border-b border-gray-300 align-middle">
                                    <td className="p-4 flex justify-center ">
                                        <img src={item.image || 'https://placehold.co/100x100'} alt={item.name} className="w-24 h-24 object-cover" />
                                    </td>
                                    <td className="p-4 text-center uppercase"> <Link
                                        to={`/${item.id}.html`} // Link về trang chi tiết
                                        className="hover:text-purple-600 cursor-pointer"
                                    >
                                        {item.name}
                                        {/* Hiển thị Size (nếu có) */}
                                        {item.size && ` - ${item.size}`}
                                    </Link>
                                    </td>
                                    <td className="p-4 text-center">{item.price}</td>
                                    <td className="p-4 text-center">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item, e.target.value)}
                                            min="1"

                                            className="w-24 h-11 text-center border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
                                        />
                                    </td>
                                    <td className="p-4 text-center uppercase">
                                        {formatCurrency(parseFloat(item.price.replace(/[^0-9]/g, '')) * item.quantity)}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button onClick={() =>  handleRemove(item)} className="text-gray-400 hover:text-red-500">
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* === 5. LIST CHO MOBILE ===  */}
                    <div className="md:hidden space-y-6">
                        {cartItems.map(item => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-gray-300 pb-4 items-center">
                                {/* Cột 1: Ảnh */}
                                <img src={item.image || 'https://placehold.co/100x100'} alt={item.name} className="w-24 h-24 object-cover" />

                                {/* Cột 2: Tên & Giá */}
                                <div className="flex-1">
                                    <p className="font-semibold uppercase">
                                        <Link
                                            to={`/${item.id}.html`} // Link về trang chi tiết
                                            className="hover:text-purple-600 cursor-pointer"
                                        >
                                            {item.name}
                                            {item.size && ` - ${item.size}`}
                                        </Link>
                                    </p>
                                    <p className="text-gray-400 mt-1">{item.price}</p>
                                </div>

                                {/* Cột 3: Số lượng & Xóa */}
                                <div className="flex flex-col items-end justify-between">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                                        min="1"
                                        className="w-20 h-9 text-center border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
                                    />
                                    <button onClick={() =>  handleRemove(item)} className="text-gray-400 hover:text-red-500 mt-2">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* === 6. TỔNG TIỀN & NÚT (DESKTOP) === */}
                    <div className="hidden md:block mt-8">
                        <div className="flex justify-end items-center mb-4">
                            <span className="text-xl">Tổng tiền:</span>
                            <span className="text-2xl font-bold text-purple-400 ml-4">{formatCurrency(total)}</span>
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
                            <span className="text-lg text-black">Tổng tiền</span>
                            <span className="text-xl font-bold text-purple-600">{formatCurrency(total)}</span>
                        </div>
                        <div className="space-y-4">
                            <button className="w-full px-6 py-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                                Tiến hành thanh toán
                            </button>
                            <Link
                                to="/"
                                className="block w-full text-center px-6 py-4 bg-gray-700 text-black hover:bg-gray-600 transition-colors"
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