// src/components/core/TextAnalyzer.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

type AnalysisResult = {
  score: number;
  confidence: string;
  details: {
    textPatterns: string;
    predictability: string;
    structure: string;
  };
};

export default function TextAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [charCount, setCharCount] = useState(0);

  const MIN_CHARS = 100;
  const MAX_CHARS = 10000;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
    
    if (result) setResult(null);
  };

  const analyzeText = async () => {
    if (text.length < MIN_CHARS) {
      toast.error(`Please enter at least ${MIN_CHARS} characters for accurate analysis.`);
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text }),
      // });
      // const data = await response.json();
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result for demonstration
      const mockScore = Math.random();
      let confidence = 'low';
      if (mockScore > 0.7) confidence = 'high';
      else if (mockScore > 0.4) confidence = 'medium';
      
      setResult({
        score: mockScore,
        confidence,
        details: {
          textPatterns: mockScore > 0.6 ? 'Repetitive patterns detected' : 'Natural variation in language',
          predictability: mockScore > 0.5 ? 'High word predictability' : 'Normal word unpredictability',
          structure: mockScore > 0.7 ? 'Uniform paragraph structure' : 'Varied paragraph structure'
        }
      });
      
    } catch (error) {
      toast.error('Analysis failed. Please try again later.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 0.7) return 'text-red-600';
    if (score > 0.4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreLabel = (score: number) => {
    if (score > 0.7) return 'Likely AI-Generated';
    if (score > 0.4) return 'Possibly AI-Generated';
    return 'Likely Human-Written';
  };

  const getScorePercentage = (score: number) => {
    return Math.round(score * 100);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2">
          Paste text to analyze
        </label>
        <textarea
          id="content"
          rows={8}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Paste at least 100 characters of text that you want to analyze for AI detection..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <div className="flex justify-between text-sm mt-2 text-slate-500">
          <span>Min: {MIN_CHARS} characters</span>
          <span className={charCount < MIN_CHARS ? 'text-red-500' : ''}>
            {charCount}/{MAX_CHARS} characters
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={analyzeText}
          disabled={isAnalyzing || text.length < MIN_CHARS}
          className={`px-6 py-3 rounded-lg text-white font-medium ${
            isAnalyzing || text.length < MIN_CHARS
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors shadow-md flex items-center`}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Text'
          )}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 border border-slate-200 rounded-lg overflow-hidden shadow-md"
          >
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Analysis Result</h3>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center mb-6">
                <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                  <div className="relative w-32 h-32">
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                        {getScorePercentage(result.score)}%
                      </span>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent"
                         style={{
                           borderTopColor: result.score > 0.7 ? '#dc2626' : result.score > 0.4 ? '#ca8a04' : '#16a34a',
                           transform: `rotate(${result.score * 360}deg)`,
                           transition: 'transform 1s ease-out'
                         }}
                    ></div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 md:pl-6">
                  <h4 className={`text-xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                    {getScoreLabel(result.score)}
                  </h4>
                  <p className="text-slate-600 mb-4">
                    Our analysis indicates this text is {getScoreLabel(result.score).toLowerCase()} with 
                    <span className="font-medium"> {result.confidence}</span> confidence.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-medium text-slate-900 mb-2">Analysis Details:</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span><span className="font-medium">Text Patterns:</span> {result.details.textPatterns}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span><span className="font-medium">Predictability:</span> {result.details.predictability}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span><span className="font-medium">Structure:</span> {result.details.structure}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500">
                  <strong>Note:</strong> This analysis provides an estimate based on linguistic patterns. Results should be interpreted with context and may not be 100% accurate.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}