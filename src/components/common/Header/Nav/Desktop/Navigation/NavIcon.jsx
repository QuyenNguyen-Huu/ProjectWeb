import React from 'react'
import CartIcon from '../../../Item/CartIcon'
import UserIcon from '../../../Item/UserIcon'
import { useLanguage } from '@/context/LanguageContext';

// Ngọc làm
const NavIcon = () => {
    const { t, switchLanguage, language } = useLanguage();
    return (
        <div className="sidebar-icon-nav">
            <ul className="nav-list">
                <li>
                    <form role="search" className='form'>
                        <input
                            className=""
                            name="q"
                            type="search"
                            placeholder={t("common.searchPlaceholder")}
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