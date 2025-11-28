// src/layouts/Header/Nav/Navigation/NavIcon.jsx
import React from 'react'
import CartIcon from '../../../Item/CartIcon'
import UserIcon from '../../../Item/UserIcon'
import { useLanguage } from '@/context/LanguageContext';

// BƯỚC 4: Nhận prop toggleForm từ cha truyền xuống
const NavIcon = ({ toggleForm }) => {
    const { t, switchLanguage, language } = useLanguage();

    return (
        <div className="sidebar-icon-nav">
            <ul className="nav-list flex items-center gap-4">
                
                {/* --- Chuyển Form thành Button Trigger --- */}
                <li>
                    <button 
                        type="button" 
                        onClick={toggleForm} // mở GlobalSearch
                        className="cursor-pointer hover:text-orange-500 transition-colors"
                        title={t("common.searchPlaceholder")}
                    >
                        {/* Icon kính lúp */}
                        <i aria-hidden="true" className="fa fa-search text-xl"></i>
                    </button>
                </li>
                {/* ------------------------------------------------ */}

                <UserIcon />

                <CartIcon />

                {/* Phần Language Switcher giữ nguyên */}
                <li className="language ml-2">
                    <span className="flex items-center">
                        <button 
                            className={`trans cursor-pointer ${language === 'vi' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                            onClick={() => switchLanguage('vi')}
                            title="Tiếng Việt"
                        >
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/vn.png?v=9"
                                className="w-[30px] pr-[5px] border-r border-black"
                                alt="VN"
                            />
                        </button>
                        <button 
                            className={`trans pr-[10px] cursor-pointer ${language === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                            onClick={() => switchLanguage('en')}
                            title="English"
                        >
                            <img
                                loading="lazy"
                                src="https://web.nvnstatic.net/tp/T0194/img/eng.png?v=9"
                                className="w-[26px] pl-[5px]"
                                alt="EN"
                            />
                        </button>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default NavIcon