// src/components/core/ResultDisplay.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { AnalysisResult } from '@/store/slices/analysisSlice';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const scorePercentage = Math.round(result.score * 100);
  
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);
  
  const getScoreColor = () => {
    if (result.score > 0.7) return 'bg-red-500';
    if (result.score > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getScoreTextColor = () => {
    if (result.score > 0.7) return 'text-red-700';
    if (result.score > 0.4) return 'text-yellow-700';
    return 'text-green-700';
  };
  
  const getScoreBgColor = () => {
    if (result.score > 0.7) return 'bg-red-50';
    if (result.score > 0.4) return 'bg-yellow-50';
    return 'bg-green-50';
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
  
  const getScoreEmoji = () => {
    if (result.score > 0.7) return '🤖';
    if (result.score > 0.4) return '🧐';
    return '👨‍💻';
  };
  
  const formatMetricName = (key: string): string => {
    return key
      .replace(/Score$/, '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div ref={resultRef} className="mt-8 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-900">Analysis Results</h2>
      </div>
      
      <div className="p-6">
        <div className={`p-4 rounded-lg ${getScoreBgColor()} mb-6 flex items-center`}>
          <span className="text-4xl mr-4">{getScoreEmoji()}</span>
          <div>
            <p className={`font-medium ${getScoreTextColor()}`}>
              {getScoreDescription()}
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Confidence: {result.confidence}
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-700 font-medium">AI Probability</span>
            <span className={`font-bold text-lg ${getScoreTextColor()}`}>{scorePercentage}%</span>
          </div>
          
          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${getScoreColor()} transition-all duration-500 ease-out`} 
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>Likely Human</span>
            <span>Likely AI</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-4">Detailed Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(result.details).map(([key, value]) => {
              const metricPercent = Math.round(value * 100);
              return (
                <div key={key} className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-700">{formatMetricName(key)}</span>
                    <span className="font-medium">{metricPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${metricPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-600">
            Analysis completed at {new Date().toLocaleTimeString()}
          </p>
          
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;