import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 text-center text-sm text-gray-500">
      <p className="mb-2">
        This tool uses advanced statistical and linguistic analysis to detect AI-generated text.
      </p>
      <p>
        All processing happens in your browser - no text is stored on any server.
      </p>
      <p className="mt-4 text-xs">
        © {new Date().getFullYear()} AI Text Detector
      </p>
    </footer>
  );
};

export default Footer;