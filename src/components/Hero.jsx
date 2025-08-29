import React from 'react';
import { Download } from 'lucide-react';

const Hero = ({ isDarkMode, currentTypeText, scrollToSection, theme }) => {
  return (
    <section id="home" className={`relative pt-16 min-h-screen flex items-center ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.text}`}>
            Hey, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ved Chaudhary</span>
          </h1>
          <div className="h-16 mb-8">
            <p className={`text-xl md:text-2xl ${theme.textSecondary}`} style={{fontFamily: 'monospace'}}>
              {currentTypeText}<span className="animate-pulse">|</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Get In Touch
            </button>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Ved_Chaudhary_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 border-2 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400' 
                  : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              <Download className="h-5 w-5" />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;