import React from "react";
// BƯỚC 1: Import "Link" từ react-router-dom
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

// Component con cho item có submenu
const NavItem = ({ label, href, submenu }) => {
  if (submenu && submenu.length > 0) {
    return (
      <li className="group relative cursor-pointer">
        {/* BƯỚC 2: Biến mục cha thành Link */}
        <Link 
          to={href} 
          className="flex items-center no-underline"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {label}
          <i aria-hidden="true" className="ml-1 text-[9px] fa fa-angle-down"></i>
        </Link>
        {/* Submenu */}
        <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md py-2 w-48 z-10">
          {submenu.map((item, idx) => (
            <li key={idx} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {/* BƯỚC 3: Biến các mục con thành Link */}
              <Link 
                to={item.href} 
                className="block w-full no-underline"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
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
      <Link 
        to={href} 
        className="no-underline"
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        {label}
      </Link>
    </li>
  );
};
const NavBarDesktop = () => {
  const { t, language } = useLanguage();
  
// Dữ liệu menu
const navItems = [
  { label: t("header.menu.about"), href: "/about" },
  {
    label: t("header.menu.men"),
    href: language === 'vi' ? '/do-nam' : '/men',
    submenu: [
      { label: t("header.menu.menShirt"), href: language === 'vi' ? '/ao-chay-bo-nam' : '/men/shirt' },
      { label: t("header.menu.menPants"), href: language === 'vi' ? '/quan-chay-bo-nam' : '/men/pants' },
      { label: t("header.menu.menRunShoes"), href: language === 'vi' ? '/giay-chay-bo-nam' : '/men/run-shoes' },
      { label: t("header.menu.menTrailShoes"), href: language === 'vi' ? '/giay-chay-dia-hinh-nam' : '/men/trail-shoes' },
    ],
  },
  {
    label: t("header.menu.women"),
    href: language === 'vi' ? '/do-nu' : '/women',
    submenu: [
      { label: t("header.menu.womenShirt"), href: language === 'vi' ? '/ao-chay-bo-nu' : '/women/shirt' },
      { label: t("header.menu.womenPants"), href: language === 'vi' ? '/quan-chay-bo-nu' : '/women/pants' },
      { label: t("header.menu.womenRunShoes"), href: language === 'vi' ? '/giay-chay-bo-nu' : '/women/run-shoes' },
      { label: t("header.menu.womenTrailShoes"), href: language === 'vi' ? '/giay-chay-dia-hinh-nu' : '/women/trail-shoes' },
    ],
  },
  {
    label: t("header.menu.watch"),
    href: language === 'vi' ? '/dong-ho' : '/watch',
    submenu: [
      { label: t("header.menu.suunto"), href: language === 'vi' ? '/dong-ho-suunto' : '/watch/suunto' },
      { label: t("header.menu.garmin"), href: language === 'vi' ? '/dong-ho-garmin' : '/watch/garmin' },
      { label: t("header.menu.coros"), href: language === 'vi' ? '/dong-ho-coros' : '/watch/coros' },
    ],
  },
  { label: t("header.menu.sale"), href: "/sale" },
];

  // NavBarDesktop
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