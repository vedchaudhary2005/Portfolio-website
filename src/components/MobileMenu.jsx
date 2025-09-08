import React, { useEffect, useRef, useState } from 'react';
import { X, Home, User, Code, Briefcase, Mail } from 'lucide-react';

const MobileMenu = ({ isMenuOpen, toggleMenu, scrollToSection, theme, isDarkMode }) => {
  const menuRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Skills', icon: Code },
    { name: 'Portfolio', icon: Briefcase },
    { name: 'Contact', icon: Mail }
  ];

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        toggleMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, toggleMenu]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isMenuOpen) return;
      
      if (event.key === 'Escape') {
        toggleMenu();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const currentIndex = menuItems.findIndex(item => item.name.toLowerCase() === activeSection);
        let nextIndex;
        
        if (event.key === 'ArrowDown') {
          nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        }
        
        const nextSection = menuItems[nextIndex].name.toLowerCase();
        setActiveSection(nextSection);
        scrollToSection(nextSection);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, toggleMenu, activeSection, menuItems, scrollToSection]);

  // Handle touch gestures for swipe to close
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isRightSwipe = distance < -50;
    
    if (isRightSwipe) {
      toggleMenu();
    }
  };

  if (!isMenuOpen) return null;

  return (
    <div 
      className="md:hidden fixed inset-0 z-50 pt-16"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 ${theme.bg} bg-opacity-95 backdrop-blur-lg transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Menu Content */}
      <div 
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className={`h-full w-full flex flex-col justify-center items-center relative transform transition-all duration-500 ease-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className={`absolute top-8 right-8 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${
            isDarkMode 
              ? 'text-gray-300 bg-gray-800/50' 
              : 'text-gray-700 bg-gray-200/50'
          }`}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Menu Title */}
        <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
        

        
        {/* Menu Items */}
        <div className="space-y-8 text-center">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.name.toLowerCase();
            
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.name.toLowerCase())}
                className={`group flex items-center justify-center space-x-4 text-2xl font-bold transition-all duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-6 py-3 ${
                  isActive
                    ? 'text-blue-500 scale-110'
                    : `hover:text-blue-500 ${theme.text}`
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isMenuOpen ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <Icon className={`h-6 w-6 transition-all duration-300 group-hover:rotate-12 ${
                  isActive ? 'text-blue-500' : ''
                }`} />
                <span className="relative">
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Swipe Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-sm opacity-60">
          <div className="w-8 h-0.5 bg-current rounded-full animate-pulse" />
          <span className={theme.textSecondary}>Swipe right to close</span>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;