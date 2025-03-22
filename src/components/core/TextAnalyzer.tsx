import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setText, analyzeText } from '@/store/slices/analysisSlice';

const TextAnalyzer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { text, status } = useAppSelector(state => state.analysis);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(analyzeText());
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => dispatch(setText(e.target.value))}
          className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Paste text here to analyze whether it was written by AI..."
        />
        <button
          type="submit"
          disabled={status === 'loading' || text.trim().length < 15}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {status === 'loading' ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </form>
    </div>
  );
};

export default TextAnalyzer;