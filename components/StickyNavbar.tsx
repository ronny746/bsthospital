'use client';

import { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';

export default function StickyNavbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${isVisible
          ? 'translate-y-0 opacity-100 shadow-xl pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
        }`}
    >
      <NavigationBar />
    </div>
  );
}

