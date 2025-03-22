'use client';

import React from 'react';
import { AnalysisResult } from '@/store/slices/analysisSlice';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const scorePercentage = Math.round(result.score * 100);
  
  const getScoreColor = () => {
    if (result.score > 0.7) return 'bg-red-500';
    if (result.score > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getScoreDescription = () => {
    if (result.score > 0.7) {
      return 'This text was likely written by AI.';
    } else if (result.score > 0.4) {
      return 'This text may contain some AI-generated content.';
    } else {
      return 'This text was likely written by a human.';
    }
  };
  
  const formatMetricName = (key: string): string => {
    return key
      .replace(/Score$/, '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="mt-8 border rounded-lg p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700">AI Probability:</span>
        <span className="font-medium">{scorePercentage}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className={`h-2.5 rounded-full ${getScoreColor()}`} 
          style={{ width: `${scorePercentage}%` }}
        ></div>
      </div>
      
      <p className="mt-4 text-gray-700 font-medium">
        {getScoreDescription()}
      </p>
      
      <p className="mt-2 text-sm text-gray-500">
        Confidence: {result.confidence}
      </p>
      
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-medium mb-3">Detailed Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(result.details).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{formatMetricName(key)}:</span>
              <span className="font-medium">{Math.round(value * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;