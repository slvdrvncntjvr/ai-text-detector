import React from 'react';
import { TextAnalysisResult } from '@/types/analysis';

interface ScoreBreakdownProps {
  details: TextAnalysisResult['details'];
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ details }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg mb-2">Score Breakdown</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-gray-100 rounded">
          <div className="text-sm text-gray-600">Pattern Analysis</div>
          <div className="font-medium">{(details.patternScore * 100).toFixed(1)}%</div>
        </div>
        <div className="p-2 bg-gray-100 rounded">
          <div className="text-sm text-gray-600">Statistical Analysis</div>
          <div className="font-medium">{(details.statisticalScore * 100).toFixed(1)}%</div>
        </div>
        <div className="p-2 bg-gray-100 rounded">
          <div className="text-sm text-gray-600">Text Coherence</div>
          <div className="font-medium">{(details.coherenceScore * 100).toFixed(1)}%</div>
        </div>
        <div className="p-2 bg-gray-100 rounded">
          <div className="text-sm text-gray-600">Repetition Score</div>
          <div className="font-medium">{(details.repetitionScore * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;