import React, { useState } from 'react'
import NavItem from './NavCategory/NavItem'
import { categoriesMockup } from '../data/mockupObject'

const SidebarCategories = () => {
    const [openItems, setOpenItems] = useState({});
    const [openFilters, setOpenFilters] = useState(false);

    const handleToggle = (itemId) => {
        setOpenItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    return (
        <>
            <aside className={`xl:w-1/4 dqdt-sidebar sidebar border-cus h-screen ${openFilters ? 'open' : ''}`}>
                <aside className='mb-7 pb-7'>
                    <div className="relative flex items-start justify-between text-2xl font-semibold text-center uppercase mt-4 mb-2.5">
                        <h2 className="mt-0 text-[18px] mb-4 font-semibold inline-block pr-2.5 text-[#363636] decoration-0 ">Danh mục</h2>
                        <span className="icon-dropdown cate-box flex mt-1 ">
                            <i className="fa fa-angle-up "></i>
                        </span>
                    </div>
                    <div className={`mt-1.5 sidebar-category`}>
                        <div className="nav-category navbar-toggleable-md">
                            <ul className="pl-0 mb-0 list-none">
                                {categoriesMockup.map(item => (
                                    <NavItem
                                        key={item.id}
                                        item={item}
                                        openFilters={openFilters}
                                        setOpenFilters={setOpenFilters}
                                        isOpen={!!openItems[item.id]}
                                        onToggle={() => handleToggle(item.id)}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>
            </aside >
            <div id="open-filters" className={` open-filters md:hidden lg:hidden ${openFilters ? 'open' : ''}`} onClick={() => { setOpenFilters(!openFilters) }}>
                <i className="fa fa-align-right !text-2xl"></i>
            </div>
        </>

    )
}

export default SidebarCategories