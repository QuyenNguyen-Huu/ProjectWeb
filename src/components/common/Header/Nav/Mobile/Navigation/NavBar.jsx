import React, { useState } from "react";
// BƯỚC 1: Import "Link" từ react-router-dom
import { Link } from "react-router-dom";
import { useLanguage } from '@/context/LanguageContext';

// Icon tái sử dụng
const Icon = ({ name, className = "" }) => (
  <i aria-hidden="true" className={`fa ${name} ${className}`}></i>
);

const NavBar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const { t, language } = useLanguage();

  // BƯỚC 2: Tạo dữ liệu menu con để dễ quản lý
  const menuData = {
    men: [
      { labelKey: "header.menu.menShirt", href: language === 'vi' ? "/ao-chay-bo-nam" : "/men/shirt" },
      { labelKey: "header.menu.menPants", href: language === 'vi' ? "/quan-chay-bo-nam" : "/men/pants" },
      { labelKey: "header.menu.menRunShoes", href: language === 'vi' ? "/giay-chay-bo-nam" : "/men/run-shoes" },
      { labelKey: "header.menu.menTrailShoes", href: language === 'vi' ? "/giay-trail-nam" : "/men/trail-shoes" },
    ],
    women: [
      { labelKey: "header.menu.womenShirt", href: language === 'vi' ? "/ao-chay-bo-nu" : "/women/shirt" },
      { labelKey: "header.menu.womenPants", href: language === 'vi' ? "/quan-chay-bo-nu" : "/women/pants" },
      { labelKey: "header.menu.womenRunShoes", href: language === 'vi' ? "/giay-chay-bo-nu" : "/women/run-shoes" },
      { labelKey: "header.menu.womenTrailShoes", href: language === 'vi' ? "/giay-trail-nu" : "/women/trail-shoes" },
    ],
    watch: [
      { labelKey: "header.menu.suunto", href: language === 'vi' ? "/dong-ho/suunto" : "/watch/suunto" },
      { labelKey: "header.menu.garmin", href: language === 'vi' ? "/dong-ho/garmin" : "/watch/garmin" },
      { labelKey: "header.menu.coros", href: language === 'vi' ? "/dong-ho/coros" : "/watch/coros" },
    ],
  };

  // BƯỚC 3: Hàm xử lý khi bấm vào Link (để đóng menu)
  const handleLinkClick = () => {
    setIsOpen(false);
    // Tùy chọn: reset về menu chính sau khi đóng
    // setActiveMenu("main"); 
  };

  const panels = [
    {
      key: "main",
      title: t('header.menu.menuTitle'),
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          <li className="px-4 py-3 border-b border-gray-300">
            {/* BƯỚC 4: Dùng Link và hàm onClick */}
            <Link 
              to="/about" 
              onClick={handleLinkClick}
              className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
            >
              {t('header.menu.about')}
            </Link>
          </li>
          {[
            { labelKey: "header.menu.men", key: "men", href: language === 'vi' ? "/do-nam" : "/men" },
            { labelKey: "header.menu.women", key: "women", href: language === 'vi' ? "/do-nu" : "/women" },
            { labelKey: "header.menu.watch", key: "watch", href: language === 'vi' ? "/dong-ho" : "/watch" },
          ].map((item) => (
            <li
              key={item.key}
              className="flex justify-between items-center border-b border-gray-300"
            >
              {/* BƯỚC 5: Biến label thành Link */}
              <Link
                to={item.href}
                onClick={handleLinkClick}
                className="flex-1 px-4 py-3 text-gray-800 hover:text-purple-600 transition-colors duration-200"
              >
                {t(item.labelKey)}
              </Link>
              {/* Nút này chỉ để mở submenu */}
              <button
                onClick={() => setActiveMenu(item.key)}
                className="px-4 py-3 border-l border-gray-300 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                <Icon name="fa-angle-right" className="ml-1 text-[9px]" />
              </button>
            </li>
          ))}
          <li className="px-4 py-3 border-b border-gray-300">
            {/* BƯỚC 4: Dùng Link và hàm onClick */}
            <Link 
              to="/sale" 
              onClick={handleLinkClick}
              className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
            >
              Sale
            </Link>
          </li>
        </ul>
      ),
    },
    // BƯỚC 6: Cập nhật các submenu (Đồ Nam)
    {
      key: "men",
      title: t('header.menu.men'),
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          {/* Thêm link "Xem tất cả" */}
          <li className="px-4 py-3 border-b border-gray-300 font-bold">
            <Link 
              to={language === 'vi' ? "/do-nam" : "/men"} 
              onClick={handleLinkClick}
              className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
            >
              {t('header.menu.viewAllMen')}
            </Link>
          </li>
          {/* Render các link con */}
          {menuData.men.map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              <Link 
                to={item.href} 
                onClick={handleLinkClick}
                className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    // BƯỚC 6: Cập nhật các submenu (Đồ Nữ)
    {
      key: "women",
      title: t('header.menu.women'),
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          <li className="px-4 py-3 border-b border-gray-300 font-bold">
            <Link 
              to={language === 'vi' ? "/do-nu" : "/women"} 
              onClick={handleLinkClick}
              className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
            >
              {t('header.menu.viewAllWomen')}
            </Link>
          </li>
          {menuData.women.map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              <Link 
                to={item.href} 
                onClick={handleLinkClick}
                className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    // BƯỚC 6: Cập nhật các submenu (Đồng Hồ)
    {
      key: "watch",
      title: t('header.menu.watch'),
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          <li className="px-4 py-3 border-b border-gray-300 font-bold">
            <Link 
              to={language === 'vi' ? "/dong-ho" : "/watch"} 
              onClick={handleLinkClick}
              className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
            >
              {t('header.menu.viewAllWatch')}
            </Link>
          </li>
          {menuData.watch.map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              <Link 
                to={item.href} 
                onClick={handleLinkClick}
                className="block text-gray-800 hover:text-purple-600 transition-colors duration-200"
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-4/5 bg-gray-200 shadow-md z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative h-full overflow-hidden">
        {panels.map((panel) => {
          const index = panels.findIndex((p) => p.key === activeMenu);
          const myIndex = panels.findIndex((p) => p.key === panel.key);

          let translateClass = "";
          if (myIndex < index) translateClass = "-translate-x-full";
          else if (myIndex > index) translateClass = "translate-x-full";
          else translateClass = "translate-x-0";

          return (
            <div
              key={panel.key}
              className={`absolute z-50 top-0 left-0 w-full h-full bg-gray-200 transform transition-transform duration-300 flex flex-col ${translateClass}`}
            >
              {/* Header */}
              <div className="flex items-center justify-center relative border-b border-gray-300 py-4">
                {panel.back && (
                  <button
                    onClick={() => setActiveMenu(panel.back)}
                    className="absolute left-4 text-gray-600"
                  >
                    <Icon name="fa-angle-left" />
                  </button>
                )}
                <span className="text-gray-500 font-normal">{panel.title}</span>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">{panel.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;