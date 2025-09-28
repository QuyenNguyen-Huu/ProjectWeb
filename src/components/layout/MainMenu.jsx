import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Main navigation menu component
 */
const MainMenu = ({ mobile = false, onItemClick }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', current: location.pathname === '/' },
    { name: 'Products', path: '/products', current: location.pathname === '/products' },
    { name: 'About', path: '/about', current: location.pathname === '/about' },
    { name: 'Contact', path: '/contact', current: location.pathname === '/contact' },
  ];

  const baseClasses = mobile
    ? 'block px-3 py-2 rounded-md text-base font-medium transition-colors'
    : 'px-3 py-2 rounded-md text-sm font-medium transition-colors';

  const activeClasses = mobile
    ? 'text-blue-600 bg-blue-50'
    : 'text-blue-600 bg-blue-50';

  const inactiveClasses = mobile
    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';

  return (
    <div className={mobile ? 'space-y-1' : 'flex space-x-4'}>
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={onItemClick}
          className={`
            ${baseClasses}
            ${item.current ? activeClasses : inactiveClasses}
          `.trim().replace(/\s+/g, ' ')}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default MainMenu;