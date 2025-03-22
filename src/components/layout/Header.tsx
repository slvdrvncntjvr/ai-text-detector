import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center">AI Text Detector</h1>
        <p className="text-center text-gray-600 text-sm">
          Analyze text to determine if it was written by AI
        </p>
      </div>
    </header>
  );
};

export default Header;