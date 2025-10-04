import React, { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Theo dõi khi scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll lên đầu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button 
        onClick={scrollToTop}
        className="fixed z-50 bottom-5 right-5 bg-black text-white border-none px-4 py-3 rounded cursor-pointer shadow-md text-lg no-transition">
          <i aria-hidden="true" className="ml-1 text-[9px] fa fa-angle-up"></i>
      </button>
      )}
    </>
  );
}
