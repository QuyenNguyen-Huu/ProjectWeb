import React from 'react'
import CartIcon from '../../../Item/CartIcon'

const NavIcon = ({ toggleForm, showForm, closing }) => {
    return (
        <div className="sidebar-icon-nav">
            <ul className="nav-list">
                <li>
                    <a onClick={toggleForm}>
                        <i aria-hidden="true" className="fa fa-search"></i>
                    </a>
                    {(showForm || closing) && (
                        <div className={`absolute w-[75%] right-0 mt-1.5 ${showForm ? 'warp-open' : 'warp-close'}`}>
                            <form role="search" className="relative mb-2.5 border-t border-gray-300">
                                <input
                                    className="bg-[#ebebeb] w-full px-2.5 py-1"
                                    name="q"
                                    type="search"
                                    placeholder="Tìm..."
                                    id="text-search"
                                />
                                <button type="submit" className="form-button">
                                    <i aria-hidden="true" className="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                    )}
                </li>
                <CartIcon />
                <li className="language flex items-center">
                    <div className="flex items-center space-x-1">
                        <a className="trans flex items-center" href="/sis-b73890.html?locale=vi-vn">
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/vn.png?v=9"
                                className="w-[40px] h-[28px] hover:opacity-80 transition"
                                alt="VN"
                            />
                        </a>

                        {/* Thanh gạch giữa */}
                        <div className="h-[24px] w-[1px] bg-gray-400"></div>

                        <a className="trans flex items-center" href="/sis-b73890.html?locale=en-us">
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/eng.png?v=9"
                                className="w-[36px] h-[26px] hover:opacity-80 transition"
                                alt="EN"
                            />
                        </a>
                    </div>
                </li>

            </ul>
        </div>
    )
}

export default NavIcon
