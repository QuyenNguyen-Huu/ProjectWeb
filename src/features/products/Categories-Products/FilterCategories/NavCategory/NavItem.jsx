// src/components/NavItem.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const NavItem = ({ item, openFilters, setOpenFilters, isOpen, onToggle }) => {
    const { t, language } = useLanguage();
    const location = useLocation();
    
    // Get link based on language
    const getLink = (linkObj) => {
        if (typeof linkObj === 'string') return linkObj;
        return linkObj[language] || linkObj.vi || linkObj.en;
    };
    
    const itemLink = getLink(item.link);
    
    // Check if parent link itself is active (not children)
    const isParentActive = location.pathname === itemLink ||
                          (typeof item.link === 'object' && Object.values(item.link).includes(location.pathname));

    return (
        <li className="nav-item" >
            <div className="flex items-center justify-between p-2 rounded cursor-pointer">
                <div className="flex items-center space-x-2" onClick={() => { if (!isOpen) onToggle() }} >
                    <i className={`fa fa-caret-right text-sm transition-transform duration-300 ${isOpen ? "rotate-90 text-purple-600" : isParentActive ? "text-purple-600" : "text-gray-500"}`}></i>
                    <Link 
                        to={itemLink} 
                        className={`nav-link transition-colors duration-200 ${
                            isParentActive 
                                ? "!text-purple-600 font-semibold" 
                                : "text-gray-700 hover:text-purple-600"
                        }`}
                        style={{ textDecoration: 'none' }}
                    >
                        {t(item.nameKey)}
                    </Link>
                </div>
                <i className="fa fa-angle-down text-gray-500" onClick={onToggle}></i>
            </div>

            {
                isOpen && (
                    <ul className="dropdown-menu pl-2 border-gray-200">
                        {item.children.map((child, index) => {
                            const childLink = getLink(child.link);
                            const isActive = location.pathname === childLink ||
                                           (typeof child.link === 'object' && Object.values(child.link).includes(location.pathname));
                            return (
                                <li
                                    key={child.id || index}
                                    className="nav-item child-item py-1"
                                    onClick={() => setOpenFilters(!openFilters)}
                                >
                                    <Link
                                        to={childLink}
                                        className={`nav-link flex items-center transition-colors duration-200 ${isActive
                                                ? "!text-purple-600 font-semibold"
                                                : "text-gray-700 hover:text-purple-600"
                                            }`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <i className={`fa fa-caret-right mr-2 text-xs ${isActive ? '!text-purple-600' : 'text-gray-400'}`}></i>
                                        {t(child.nameKey)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )
            }
        </li >
    )
}
export default NavItem;