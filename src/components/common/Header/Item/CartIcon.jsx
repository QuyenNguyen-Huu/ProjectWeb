import React from 'react';

import { Link } from 'react-router-dom';

import { useCart } from '@/context/cartContext'; 


const CartIcon = () => {
    const { cartItems } = useCart(); // Lấy dữ liệu
    const totalItems = cartItems.length; // Tính tổng

    return (
        // Thêm flex để căn giữa theo chiều dọc nếu li có chiều cao khác các phần tử khác
        <li className="flex items-center"> 
            <Link to="/cart" className="relative inline-block p-2 text-xl hover:text-orange-500 transition-colors">
                <div className="inline-block">
                    <i aria-hidden="true" className="fa fa-shopping-bag"></i>
                </div>

                {totalItems > 0 && (
                    <span 
                        className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white" 
                        id="cart-total"
                    >
                        {totalItems}
                    </span>
                )}
            </Link>
        </li>
    )
}

export default CartIcon;

