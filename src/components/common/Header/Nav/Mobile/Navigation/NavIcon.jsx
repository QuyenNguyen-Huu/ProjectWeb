import React from 'react'
import CartIcon from '../../../Item/CartIcon'
import { useLanguage } from '@/context/LanguageContext'

const NavIcon = ({ toggleForm, showForm, closing }) => {
    const { t, switchLanguage, language } = useLanguage();
    
    return (
        <div className="sidebar-icon-nav">
            <ul className="nav-list">
                <li className="flex items-center">
                    <button 
                        onClick={toggleForm} 
                        className="p-2 text-xl text-gray-800 hover:text-orange-500 transition-colors focus:outline-none"
                    >
                        <i aria-hidden="true" className="fa fa-search"></i>
                    </button>
                </li>
                <CartIcon />
                <li className="language flex items-center">
                    <div className="flex items-center space-x-1">
                        <button 
                            className={`trans flex items-center cursor-pointer ${language === 'vi' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                            onClick={() => switchLanguage('vi')}
                            title="Tiếng Việt"
                        >
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/vn.png?v=9"
                                className="max-w-[40px] max-h-[24px] w-auto h-auto hover:opacity-80 transition"
                                alt="VN"
                            />
                        </button>

                        {/* Thanh gạch giữa */}
                        <div className="h-[24px] w-[1px] bg-gray-400"></div>

                        <button 
                            className={`trans flex items-center cursor-pointer ${language === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                            onClick={() => switchLanguage('en')}
                            title="English"
                        >
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/eng.png?v=9"
                                className="max-w-[40px] max-h-[21px] w-auto h-auto hover:opacity-80 transition"
                                alt="EN"
                            />
                        </button>
                    </div>
                </li>

            </ul>
        </div>
    )
}

export default NavIcon
