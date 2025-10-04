import React from 'react'
import CartIcon from '../../../Item/CartIcon'
import UserIcon from '../../../Item/UserIcon'

// Ngọc làm
const NavIcon = () => {
    return (
        <div className="sidebar-icon-nav">
            <ul className="nav-list">
                <li>
                    <form role="search" className='form'>
                        <input
                            className=""
                            name="q"
                            type="search"
                            placeholder="Tìm..."
                            id="text-search"
                        />
                        <button type="submit" className="form-button">
                            <i aria-hidden="true" className="fa fa-search"></i>
                        </button>
                    </form>
                </li>

                <UserIcon />

                <CartIcon />

                <li className="language">
                    <span className="flex">
                        <a className="trans" href="/sis-b73890.html?locale=vi-vn">
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/vn.png?v=9"
                                className="w-[30px] pr-[5px] border-r border-black"
                                alt="VN"
                            />
                        </a>
                        <a className="trans pr-[10px]" href="/sis-b73890.html?locale=en-us">
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/eng.png?v=9"
                                className="w-[26px] pl-[5px]"
                                alt="EN"
                            />
                        </a>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default NavIcon