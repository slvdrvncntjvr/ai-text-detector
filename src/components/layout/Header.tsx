// src/components/layout/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="py-6 md:py-8 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">AI Text Detector</h1>
              <p className="text-sm text-slate-500">Powered by advanced linguistic analysis</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#how-it-works" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
              FAQ
            </a>
            <a href="#about" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;