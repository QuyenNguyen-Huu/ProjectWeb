import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../common/Icon';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Mobile bottom navigation panel
 */
const MobileBottomPanel = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navigationItems = [
    {
      name: t('common.home'),
      path: '/',
      icon: 'home',
      current: location.pathname === '/'
    },
    {
      name: t('common.search'),
      path: '/search',
      icon: 'search',
      current: location.pathname === '/search'
    },
    {
      name: t('common.cart'),
      path: '/cart',
      icon: 'cart',
      current: location.pathname === '/cart'
    },
    {
      name: t('common.profile'),
      path: '/profile',
      icon: 'user',
      current: location.pathname === '/profile'
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <nav className="flex">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px]
              ${item.current 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
              transition-colors
            `.trim().replace(/\s+/g, ' ')}
          >
            <Icon 
              name={item.icon} 
              size={20}
              className="mb-1"
            />
            <span className="text-xs font-medium">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileBottomPanel;