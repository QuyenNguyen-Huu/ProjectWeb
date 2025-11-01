import React from 'react';

import { Link } from 'react-router-dom';

import { useCart } from '../../../../context/cartContext'; 

const CartIcon = () => {
    // 3. Lấy dữ liệu từ Context
    const { cartItems } = useCart();

    // 4. TÍNH TỔNG SỐ LƯỢNG 
    
    const totalItems = cartItems.length;

    return (
        <li>
            
            <Link to="/cart" className="relative inline-block p-2">
                <div className="inline-block">
                    
                    <i aria-hidden="true" className="fa fa-shopping-bag"></i>
                </div>

                <span 
                    className="cart-count absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" 
                    id="cart-total"
                >
                    {totalItems}
                </span>
            </Link>
        </li>
    )
}

export default CartIcon;

