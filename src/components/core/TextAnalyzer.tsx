// src/components/core/TextAnalyzer.tsx
'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setText, resetAnalysis, runTextAnalysis } from '@/store/slices/analysisSlice';
import ResultDisplay from '@/components/core/ResultDisplay';
import Button from '@/components/ui/Button';
import Dashboard from '@/components/sections/Dashboard';

const TextAnalyzer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { text, isAnalyzing, result, error } = useAppSelector(state => state.analysis);
  const [charCount, setCharCount] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    dispatch(setText(newText));
    setCharCount(newText.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setShowDashboard(false);
    dispatch(runTextAnalysis(text));
  };

  const handleReset = () => {
    dispatch(setText(''));
    dispatch(resetAnalysis());
    setCharCount(0);
    setShowDashboard(false);
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      dispatch(setText(clipText));
      setCharCount(clipText.length);
    } catch (err) {
      // Handle clipboard permission errors silently
    }
  };

  const getWordCount = () => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const toggleDashboard = () => {
    if (result) {
      setShowDashboard(prev => !prev);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-slate-900">Text Analysis</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePaste}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
            }
          >
            Paste from clipboard
          </Button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea 
                className="w-full h-64 p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-800"
                placeholder="Paste or type text here to analyze whether it was written by AI..."
                value={text}
                onChange={handleTextChange}
                disabled={isAnalyzing}
              />
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-blue-800 font-medium">Analyzing text...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-2 flex justify-between items-center text-xs text-slate-500">
              <div>
                {getWordCount()} words | {charCount} characters
              </div>
              
              {text && (
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Clear text
                </button>
              )}
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isAnalyzing}
                disabled={isAnalyzing || !text.trim()}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                }
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
              </Button>
              
              {result && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={toggleDashboard}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  }
                >
                  {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
                </Button>
              )}
            </div>
          </form>
        </div>
        
        {error && (
          <div className="px-6 py-4 bg-red-50 border-t border-red-200">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500 mr-2 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>
      
      {result && !showDashboard && <ResultDisplay result={result} />}
      {result && showDashboard && <Dashboard />}
    </div>
  );
};

export default TextAnalyzer;