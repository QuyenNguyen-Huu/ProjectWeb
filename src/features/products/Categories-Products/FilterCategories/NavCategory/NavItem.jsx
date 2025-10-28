// src/components/NavItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ item, openFilters, setOpenFilters, isOpen, onToggle }) => {

    return (
        <li className="nav-item" >
            <div className="flex items-center justify-between p-2 rounded cursor-pointer">
                <div className="flex items-center space-x-2" onClick={() => { if (!isOpen) onToggle() }} >
                    <i className={`fa fa-caret-right text-gray-500 text-sm transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}></i>
                    <Link to={item.link} className="nav-link text-gray-700  hover:!text-[#673AB7] transition-colors duration-200">{item.name}</Link>
                </div>
                <i className="fa fa-angle-down text-gray-500" onClick={onToggle}></i>
            </div>

            {
                isOpen && (
                    <ul className="dropdown-menu pl-2 border-gray-200">
                        {item.children.map((child, index) => {
                            const isActive = location.pathname === child.link;
                            console.log(isActive)
                            return (
                                <li
                                    key={child.index}
                                    className="nav-item child-item py-1"
                                    onClick={() => setOpenFilters(!openFilters)}
                                >
                                    <Link
                                        to={child.link}
                                        className={`nav-link flex items-center transition-colors duration-200 ${isActive
                                            ? "!text-[#673AB7]"
                                            : "text-gray-700 hover:!text-[#673AB7]"
                                            }`}
                                    >
                                        <i className="fa fa-caret-right text-gray-400 mr-2 text-xs"></i>
                                        {child.name}
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