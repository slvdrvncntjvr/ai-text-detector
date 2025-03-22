import React from 'react';
import { TextAnalysisResult } from '@/types/analysis';

interface ResultChartProps {
  result: TextAnalysisResult;
}

const ResultChart: React.FC<ResultChartProps> = ({ result }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Analysis Chart</h3>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${result.overallScore > 0.7 ? 'bg-red-500' : result.overallScore > 0.4 ? 'bg-yellow-400' : 'bg-green-500'}`}
          style={{ width: `${result.overallScore * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>Human-written</span>
        <span>AI-generated</span>
      </div>
    </div>
  );
};

export default ResultChart;