import React from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import Icon from '../common/Icon';
import Button from '../common/Button';

/**
 * Back to top button component
 */
const BackToTopButton = () => {
  const { isVisible } = useScrollPosition(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={scrollToTop}
        className="p-3 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        aria-label="Back to top"
      >
        <Icon name="arrow-up" size={20} />
      </Button>
    </div>
  );
};

export default BackToTopButton;