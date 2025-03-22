import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2 text-blue-800">AI Text Detector</h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Analyze text to determine if it was written by AI like ChatGPT, Claude, or Bard.
        Our detector uses advanced linguistic patterns to identify AI-generated content.
      </p>
    </header>
  );
};

export default Header;