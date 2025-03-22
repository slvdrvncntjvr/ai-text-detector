'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setText, resetAnalysis, runTextAnalysis } from '@/store/slices/analysisSlice';
import ResultDisplay from '@/components/core/ResultDisplay';

const TextAnalyzer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { text, isAnalyzing, result, error } = useAppSelector(state => state.analysis);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(runTextAnalysis(text));
  };

  const handleReset = () => {
    dispatch(setText(''));
    dispatch(resetAnalysis());
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="border rounded-lg p-6 shadow-sm bg-white">
        <textarea 
          className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Paste text here to analyze whether it was written by AI..."
          value={text}
          onChange={(e) => dispatch(setText(e.target.value))}
        />
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className={`flex-1 py-2 px-4 rounded-lg text-white transition-colors ${
              isAnalyzing || !text.trim()
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isAnalyzing || !text.trim()}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
          </button>
          {(text.trim() || result) && (
            <button
              type="button"
              onClick={handleReset}
              className="py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Reset
            </button>
          )}
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default TextAnalyzer;