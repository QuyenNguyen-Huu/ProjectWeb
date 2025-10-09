import React from "react";
import { FaTag, FaGift, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LayoutMobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-300 flex justify-around items-center py-2 z-[9999] md:hidden shadow-[0_-2px_8px_rgba(0,0,0,0.1)]" 
     style={{ backgroundColor: "rgba(107, 114, 128, 0.84)" }}>
      <Link to="/new-products" className="flex flex-col items-center text-gray-800 text-xs">
        <FaTag className="text-lg mb-1" />
        <span>Hàng mới</span>
      </Link>
      <Link to="/sale" className="flex flex-col items-center text-gray-800 text-xs">
        <FaGift className="text-lg mb-1" />
        <span>Khuyến mại</span>
      </Link>
      <Link to="/cart" className="flex flex-col items-center text-gray-800 text-xs">
        <FaShoppingCart className="text-lg mb-1" />
        <span>Giỏ hàng</span>
      </Link>
    </div>
  );
}
