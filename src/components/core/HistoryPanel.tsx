import React from 'react';

const HistoryPanel: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Analysis History</h2>
      <p className="text-gray-600">No previous analyses yet.</p>
    </div>
  );
};

export default HistoryPanel;