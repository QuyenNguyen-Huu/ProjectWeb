import React from "react";
// BƯỚC 1: Import "Link" từ react-router-dom
import { Link } from "react-router-dom";

// Component con cho item có submenu
const NavItem = ({ label, href, submenu }) => {
  if (submenu && submenu.length > 0) {
    return (
      <li className="group relative cursor-pointer">
        {/* BƯỚC 2: Biến mục cha thành Link */}
        <Link to={href} className="flex items-center">
          {label}
          <i aria-hidden="true" className="ml-1 text-[9px] fa fa-angle-down"></i>
        </Link>
        {/* Submenu */}
        <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md py-2 w-48 z-10">
          {submenu.map((item, idx) => (
            <li key={idx} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {/* BƯỚC 3: Biến các mục con thành Link */}
              <Link to={item.href} className="block w-full">{item.label}</Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  // Item không có submenu
  return (
    <li className="cursor-pointer">
      {/* BƯỚC 4: Biến mục đơn thành Link */}
      <Link to={href}>{label}</Link>
    </li>
  );
};

// Dữ liệu menu
const navItems = [
  { label: "Giới Thiệu", href: "/about" },
  {
    label: "Đồ nam",
    href: "/do-nam", // <-- BƯỚC 5: Thêm href cho mục cha
    submenu: [
      { label: "Áo", href: "/men/shirt" },
      { label: "Quần", href: "/men/pants" },
      { label: "Giày Chạy Bộ", href: "/men/run-shoes" },
      { label: "Giày Địa Hình", href: "/men/trail-shoes" },
    ],
  },
  {
    label: "Đồ nữ",
    href: "/do-nu", // <-- BƯỚC 5: Thêm href cho mục cha
    submenu: [
      { label: "Áo", href: "/women/shirt" },
      { label: "Quần", href: "/women/pants" },
      { label: "Giày Chạy Bộ", href: "/women/run-shoes" },
      { label: "Giày Địa Hình", href: "/women/trail-shoes" },
    ],
  },
  {
    label: "Đồng hồ",
    href: "/dong-ho", // <-- BƯỚC 5: Thêm href cho mục cha
    submenu: [
      { label: "Đồng Hồ Suunto", href: "/watch/suunto" },
      { label: "Đồng Hồ Garmin", href: "/watch/garmin" },
      { label: "Đồng Hồ Coros", href: "/watch/coros" },
    ],
  },
  { label: "SALE", href: "/sale" },
];

// NavBarDesktop
const NavBarDesktop = () => {
  return (
    <nav className="bg-white font-[Montserrat,sans-serif]">
      <ul className="flex justify-start space-x-8 py-4 px-8 font-montserrat text-[15px] text-black-600 font-semibold">
        {navItems.map((item, idx) => (
          <NavItem key={idx} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default NavBarDesktop;