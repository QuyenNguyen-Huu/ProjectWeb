import React, { useState } from 'react';
import Logo from '../../Item/Logo';
import NavIcon from './Navigation/NavIcon';
import NavBar from './Navigation/NavBar';

const MobileNav = ({ toggleForm, showForm, closing, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-screen overflow-x-hidden">
      {/* Drawer */}
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div
        className={`min-h-screen bg-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-[80%]' : 'translate-x-0'
        }`}
      >
        {/* Header */}
        <nav className="flex items-center justify-between shadow px-1 py-1">
          {/* Hamburger */}
          <button onClick={() => setIsOpen(true)} className="text-xl">
            <i className="fa fa-bars text-black"></i>
          </button>

          <Logo />
          <NavIcon toggleForm={toggleForm} showForm={showForm} closing={closing} />
        </nav>

        {/* Nội dung body */}
        <main className="p-4">{children}</main>
      </div>

      {/* Transparent overlay khi drawer mở */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 w-1/5 h-screen z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MobileNav;
