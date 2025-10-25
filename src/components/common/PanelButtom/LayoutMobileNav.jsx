import React from "react";
import { FaTag, FaGift, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LayoutMobileNav() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t border-gray-300 flex justify-around items-center py-4 h-[60px] z-[9999] md:hidden shadow-[0_-2px_8px_rgba(0,0,0,0.1)]"
      style={{ backgroundColor: "rgba(204, 204, 204, 0.84)" }}
    >
      <Link to="/new-products" className="flex flex-col items-center text-gray-800 text-xs">
        <FaTag className="text-2xl" />
        <span>Hàng mới</span>
      </Link>
      <Link to="/sale" className="flex flex-col items-center text-gray-800 text-xs">
        <FaGift className="text-2xl " />
        <span>Khuyến mại</span>
      </Link>
      <Link to="/cart" className="flex flex-col items-center text-gray-800 text-xs">
        <FaShoppingCart className="text-2xl " />
        <span>Giỏ hàng</span>
      </Link>
    </div>
  );
}
