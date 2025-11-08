import React, { useState } from 'react'
import NavItem from './NavCategory/NavItem'
import { categoriesMockup } from '../data/mockupObject'
import PriceFilter from './NavCategory/PriceFilter';
import SizeFilter from './NavCategory/SizeFilter';
import BrandFilter from './NavCategory/BrandFilter';

const SidebarCategories = () => {
    const brands = [
        "Norda", "HOKA", "2XU", "Compressport", "Salomon",
        "Patagonia", "Nike", "Adidas", "New Balance", "The North Face",
        "On Running", "Brooks", "Saucony",
    ];
    const sizes = [
        "XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL",
        "M4/W6", "M4.5/W6.5", "M5/W7", "M5.5/W7.5", "M6/W8", "M6.5/W8.5",
        "M7/W9", "M7.5/W9.5", "M8/W10", "M8.5/W10.5", "M9/W11", "M9.5/W11.5",
        "M10/W12", "M10.5/W12.5", "M11", "M11.5", "M12", "M13",
        "EU36", "EU37", "EU38", "EU39", "EU40", "EU41", "EU42", "EU43", "EU44", "EU45",
        "UK3", "UK4", "UK5", "UK6", "UK7", "UK8", "UK9", "UK10", "UK11", "UK12",
        "T1", "T2", "T3", "T4", "T5", "Y1", "Y2", "Y3", "Y4", "Y5",
        "One Size", "Adjustable", "Free Size"
    ];


    const [openSections, setOpenSections] = useState({
        category: true,
        price: true,
        size: true,
        banner: true
    });
    const toggleSection = (key) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

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
            <aside className={`xl:w-1/4 dqdt-sidebar sidebar border-cus h-full ${openFilters ? 'open' : ''}`}>
                <aside className='mb-5 pb-2'>
                    <div className="relative flex items-start justify-between text-2xl font-semibold text-center uppercase mt-4 mb-2.5">
                        <h2 className="mt-0 text-[18px] mb-4 font-semibold inline-block pr-2.5 text-[#363636] decoration-0 ">Danh mục</h2>
                        <span className="icon-dropdown cate-box flex mt-1 cursor-pointer select-none focus:outline-none"
                            onClick={() => toggleSection("category")}>
                            <i className={`fa ${openSections.category ? "fa-angle-up" : "fa-angle-down"} transition-transform duration-300`}
                            ></i>
                        </span>
                    </div>
                    {openSections.category && (
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
                    )}
                </aside>
                <hr className="my-4 border-gray-300 cursor-pointer select-none focus:outline-none" />
                <aside className='mb-5 pb-2'>
                    <div className="relative flex items-start justify-between text-2xl font-semibold text-center uppercase mt-4 mb-2.5">
                        <h2 className="mt-0 text-[18px] mb-4 font-semibold inline-block pr-2.5 text-[#363636] decoration-0 ">Giá</h2>
                        <span className="icon-dropdown cate-box flex mt-1 cursor-pointer select-none focus:outline-none "
                            onClick={() => toggleSection("price")}>
                            <i className={`fa ${openSections.price ? "fa-angle-up" : "fa-angle-down"} transition-transform duration-300`}></i>
                        </span>
                    </div>
                    {openSections.price && (
                        <PriceFilter />
                    )}
                </aside>
                <hr className="my-4 border-gray-300 cursor-pointer select-none focus:outline-none" />
                <aside className='mb-5 pb-2'>
                    <div className="relative flex items-start justify-between text-2xl font-semibold text-center uppercase mt-4 mb-2.5">
                        <h2 className="mt-0 text-[18px] mb-4 font-semibold inline-block pr-2.5 text-[#363636] decoration-0 ">Kích cỡ</h2>
                        <span className="icon-dropdown cate-box flex mt-1 cursor-pointer select-none focus:outline-none "
                            onClick={() => toggleSection("size")}>
                            <i className={`fa ${openSections.size ? "fa-angle-up" : "fa-angle-down"} transition-transform duration-300`}></i>
                        </span>
                    </div>
                    {openSections.size && (
                        <SizeFilter products={sizes} />
                    )}
                </aside>
                <hr className="my-4 border-gray-300 cursor-pointer select-none focus:outline-none" />
                <aside className='mb-5 pb-2'>
                    <div className="relative flex items-start justify-between text-2xl font-semibold text-center uppercase mt-4 mb-2.5">
                        <h2 className="mt-0 text-[18px] mb-4 font-semibold inline-block pr-2.5 text-[#363636] decoration-0 ">Thương hiệu</h2>
                        <span className="icon-dropdown cate-box flex mt-1 cursor-pointer select-none focus:outline-none "
                            onClick={() => toggleSection("banner")}>
                            <i className={`fa ${openSections.banner ? "fa-angle-up" : "fa-angle-down"} transition-transform duration-300`}></i>
                        </span>
                    </div>
                    {openSections.banner && (
                        <BrandFilter products={brands} />
                    )}
                </aside>
            </aside >
            <div id="open-filters" className={` open-filters md:hidden lg:hidden ${openFilters ? 'open' : ''}`} onClick={() => { setOpenFilters(!openFilters) }}>
                <i className={`fa ${openFilters ? 'fa-times' : 'fa-align-right'} !text-2xl font-bold`}></i>
            </div>
        </>

    )
}

export default SidebarCategories

