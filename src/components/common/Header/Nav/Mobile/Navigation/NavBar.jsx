import React, { useState } from "react";

// Icon tái sử dụng
const Icon = ({ name, className = "" }) => (
  <i aria-hidden="true" className={`fa ${name} ${className}`}></i>
);

const NavBar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState("main");

  const panels = [
    {
      key: "main",
      title: "Menu",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          <li className="px-4 py-3 border-b border-gray-300">
            <a href="/about" onClick={() => setIsOpen(false)}>
              Giới Thiệu
            </a>
          </li>
          {[
            { label: "Đồ Nam", key: "men" },
            { label: "Đồ Nữ", key: "women" },
            { label: "Đồng Hồ", key: "watch" },
          ].map((item) => (
            <li
              key={item.key}
              className="flex justify-between items-center border-b border-gray-300"
            >
              <span className="flex-1 px-4 py-3">{item.label}</span>
              <button
                onClick={() => setActiveMenu(item.key)}
                className="px-4 py-3 border-l border-gray-300 text-gray-600"
              >
                <Icon name="fa-angle-right" className="ml-1 text-[9px]" />
              </button>
            </li>
          ))}
          <li className="px-4 py-3 border-b border-gray-300">
            <a href="/sale" onClick={() => setIsOpen(false)}>
              Sale
            </a>
          </li>
        </ul>
      ),
    },
    {
      key: "men",
      title: "Đồ Nam",
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          {["Áo", "Quần", "Giày Chạy Bộ", "Giày Địa Hình"].map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "women",
      title: "Đồ Nữ",
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          {["Áo", "Quần", "Giày Chạy Bộ", "Giày Địa Hình"].map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "watch",
      title: "Đồng Hồ",
      back: "main",
      content: (
        <ul className="font-montserrat text-[15px] font-medium">
          {["Đồng Hồ Suunto", "Đồng Hồ Garmin", "Đồng Hồ Coros"].map((item, i) => (
            <li key={i} className="px-4 py-3 border-b border-gray-300">
              {item}
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
