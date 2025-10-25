import React, { useState } from "react";
// BƯỚC 1: Import "Link" từ react-router-dom
import { Link } from "react-router-dom";

// Icon tái sử dụng
const Icon = ({ name, className = "" }) => (
  <i aria-hidden="true" className={`fa ${name} ${className}`}></i>
);

const NavBar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState("main");

  // BƯỚC 2: Tạo dữ liệu menu con để dễ quản lý
  const menuData = {
    men: [
      { label: "Áo", href: "/men/shirt" },
      { label: "Quần", href: "/men/pants" },
      { label: "Giày Chạy Bộ", href: "/men/run-shoes" },
      { label: "Giày Địa Hình", href: "/men/trail-shoes" },
    ],
    women: [
      { label: "Áo", href: "/women/shirt" },
      { label: "Quần", href: "/women/pants" },
      { label: "Giày Chạy Bộ", href: "/women/run-shoes" },
      { label: "Giày Địa Hình", href: "/women/trail-shoes" },
    ],
    watch: [
      { label: "Đồng Hồ Suunto", href: "/watch/suunto" },
      { label: "Đồng Hồ Garmin", href: "/watch/garmin" },
      { label: "Đồng Hồ Coros", href: "/watch/coros" },
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
      title: "Menu",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          <li className="px-4 py-3 border-b border-gray-300">
            {/* BƯỚC 4: Dùng Link và hàm onClick */}
            <Link to="/about" onClick={handleLinkClick}>
              Giới Thiệu
            </Link>
          </li>
          {[
            { label: "Đồ Nam", key: "men", href: "/do-nam" },
            { label: "Đồ Nữ", key: "women", href: "/do-nu" },
            { label: "Đồng Hồ", key: "watch", href: "/dong-ho" },
          ].map((item) => (
            <li
              key={item.key}
              className="flex justify-between items-center border-b border-gray-300"
            >
              {/* BƯỚC 5: Biến label thành Link */}
              <Link
                to={item.href}
                onClick={handleLinkClick}
                className="flex-1 px-4 py-3"
              >
                {item.label}
              </Link>
              {/* Nút này chỉ để mở submenu */}
              <button
                onClick={() => setActiveMenu(item.key)}
                className="px-4 py-3 border-l border-gray-300 text-gray-600"
              >
                <Icon name="fa-angle-right" className="ml-1 text-[9px]" />
              </button>
            </li>
          ))}
          <li className="px-4 py-3 border-b border-gray-300">
            {/* BƯỚC 4: Dùng Link và hàm onClick */}
            <Link to="/sale" onClick={handleLinkClick}>
              Sale
            </Link>
          </li>
        </ul>
      ),
    },
    // BƯỚC 6: Cập nhật các submenu (Đồ Nam)
    {
      key: "men",
      title: "Đồ Nam",
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          {/* Thêm link "Xem tất cả" */}
          <li className="px-4 py-3 border-b border-gray-300 font-bold">
            <Link to="/do-nam" onClick={handleLinkClick}>
              Xem tất cả Đồ Nam
            </Link>
          </li>
          {/* Render các link con */}
          {menuData.men.map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              <Link to={item.href} onClick={handleLinkClick}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    // BƯỚC 6: Cập nhật các submenu (Đồ Nữ)
    {
      key: "women",
      title: "Đồ Nữ",
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          <li className="px-4 py-3 border-b border-gray-300 font-bold">
            <Link to="/do-nu" onClick={handleLinkClick}>
              Xem tất cả Đồ Nữ
            </Link>
          </li>
          {menuData.women.map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              <Link to={item.href} onClick={handleLinkClick}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    // BƯỚC 6: Cập nhật các submenu (Đồng Hồ)
    {
      key: "watch",
      title: "Đồng Hồ",
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          <li className="px-4 py-3 border-b border-gray-300 font-bold">
            <Link to="/dong-ho" onClick={handleLinkClick}>
              Xem tất cả Đồng Hồ
            </Link>
          </li>
          {menuData.watch.map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              <Link to={item.href} onClick={handleLinkClick}>
                {item.label}
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