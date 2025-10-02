import React from 'react'
import CartIcon from '../../../Item/CartIcon'

const NavIcon = ({ toggleForm, showForm, closing }) => {
    return (
        <div className="sidebar-icon-nav">
            <ul className="nav-list">
                <li>
                    <div onClick={toggleForm}>
                        <i aria-hidden="true" className="fa fa-search"></i>
                    </div>
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
            </ul>
        </div>
    )
}

export default NavIcon
