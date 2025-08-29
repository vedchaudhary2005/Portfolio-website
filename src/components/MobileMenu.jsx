import React from 'react';
import { X } from 'lucide-react';

const MobileMenu = ({ isMenuOpen, toggleMenu, scrollToSection, theme, isDarkMode }) => {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 pt-16">
      <div className={`h-full w-full flex flex-col justify-center items-center ${theme.bg} bg-opacity-95 backdrop-blur-lg relative`}>
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className={`absolute top-8 right-8 p-3 rounded-full transition-all duration-200 hover:scale-110 hover:bg-red-500 hover:text-white ${
            isDarkMode 
              ? 'text-gray-300 bg-gray-800' 
              : 'text-gray-700 bg-gray-200'
          }`}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="space-y-12 text-center">
          {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`block text-3xl font-bold transition-all duration-300 hover:scale-110 transform hover:text-blue-500 ${theme.text}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;