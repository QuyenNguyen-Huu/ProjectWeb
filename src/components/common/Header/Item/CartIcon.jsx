import React from 'react'

const CartIcon = () => {
    return (
        <li>
            <a href="/cart">
                <div className="inline-block">
                    <i aria-hidden="true" className="fa fa-shopping-bag"></i>
                </div>
                <div className="cart-title">
                    <span className="cart-count" id="cart-total">
                        0
                    </span>
                </div>
            </a>
        </li>
    )
}

export default CartIcon