import React from 'react';

const LoadingScreen = ({ isDarkMode }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading Portfolio...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;