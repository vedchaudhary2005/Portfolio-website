import React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleDarkMode, isMenuOpen, toggleMenu, scrollToSection, theme }) => {
  return (
    <nav className={`fixed top-0 w-full backdrop-blur-xl z-40 border-b transition-all duration-300 ${theme.navBg} ${theme.border} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer">
              Portfolio
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 transform scale-0 group-hover:scale-100 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' 
                      : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group ${
                isDarkMode 
                  ? 'text-yellow-400 hover:bg-yellow-400/10 hover:shadow-lg hover:shadow-yellow-400/20' 
                  : 'text-gray-600 hover:bg-blue-500/10 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20'
              }`}
            >
              {isDarkMode ? 
                <Sun className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" /> : 
                <Moon className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
              }
            </button>

            <div className="md:hidden">
              <button 
                onClick={toggleMenu} 
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 group z-50 relative ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } ${isMenuOpen ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : ''}`}
              >
                <div className="relative w-6 h-6">
                  <Menu className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                  <X className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;