import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-4 mt-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 text-sm">
          All processing happens in your browser - no text is sent to any server.
        </p>
      </div>
    </footer>
  );
};

export default Footer;