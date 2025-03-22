// src/components/sections/Dashboard.tsx
import React from 'react';
import { useAppSelector } from '@/store/hooks';
import AnalyticsCard from '@/components/ui/AnalyticsCard';

const Dashboard: React.FC = () => {
  const { result } = useAppSelector(state => state.analysis);
  
  if (!result) return null;
  
  const scorePercentage = Math.round(result.score * 100);
  const humanScore = 100 - scorePercentage;
  
  const getScoreColor = (): 'red' | 'yellow' | 'green' => {
    if (result.score > 0.7) return 'red';
    if (result.score > 0.4) return 'yellow';
    return 'green';
  };
  
  const getMainMessage = (): string => {
    if (result.score > 0.7) {
      return 'High AI probability detected';
    } else if (result.score > 0.4) {
      return 'Medium AI probability detected';
    } else {
      return 'Low AI probability detected';
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Analysis Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <AnalyticsCard
            title="AI Probability"
            value={`${scorePercentage}%`}
            description={getMainMessage()}
            color={getScoreColor()}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            }
          />
          
          <AnalyticsCard
            title="Human Probability"
            value={`${humanScore}%`}
            color="blue"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            }
          />
          
          <AnalyticsCard
            title="Confidence Level"
            value={result.confidence}
            color="purple"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            }
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-medium text-slate-900">Detailed Metrics Breakdown</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(result.details).map(([key, value]) => {
                const metricPercent = Math.round(value * 100);
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        {key.replace(/Score$/, '').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-sm font-medium text-slate-900">{metricPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${metricPercent}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500">
                      {getMetricDescription(key, value)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-medium text-slate-900">Interpretation</h3>
          </div>
          
          <div className="p-6">
            <p className="text-slate-700 mb-4">
              {getDetailedInterpretation(result.score)}
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Important Note</h4>
                  <p className="text-sm text-blue-700">
                    This analysis is based on statistical patterns and may not be 100% accurate. 
                    AI detection technology is still evolving, and results should be interpreted 
                    with appropriate caution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper functions
function getMetricDescription(key: string, value: number): string {
  const highValue = value > 0.6;
  
  switch (key) {
    case 'repetitionScore':
      return highValue 
        ? 'Shows significant word and phrase repetition patterns typical of AI' 
        : 'Shows more diverse vocabulary and expression typical of human writing';
    case 'complexityScore':
      return highValue 
        ? 'Demonstrates consistent sentence complexity typical of AI' 
        : 'Shows varied sentence structures typical of human writing';
    case 'coherenceScore':
      return highValue 
        ? 'Uses many transition words and logical flow typical of AI' 
        : 'Shows more natural flow with fewer explicit transitions';
    case 'predictabilityScore':
      return highValue 
        ? 'Contains many common AI filler phrases and predictable patterns' 
        : 'Contains fewer predictable phrases and more unique expressions';
    case 'formalityScore':
      return highValue 
        ? 'Uses formal language typical of AI-generated content' 
        : 'Contains more casual language typical of human writing';
    default:
      return 'Analysis metric based on linguistic patterns';
  }
}

function getDetailedInterpretation(score: number): string {
  if (score > 0.7) {
    return 'This text shows strong indicators of AI generation. It contains patterns typically found in content created by large language models like ChatGPT, Claude, or Bard. The text demonstrates consistent sentence structures, predictable phrasing, and formal language patterns that are characteristic of AI writing.';
  } else if (score > 0.4) {
    return 'This text shows some indicators of AI generation, but also contains elements typical of human writing. It may be AI-generated content that has been edited by a human, or it may combine both human and AI-written sections. The mixed patterns make a definitive determination challenging.';
  } else {
    return 'This text shows strong indicators of human authorship. It contains the natural variations in complexity, informal elements, and unpredictable patterns that are characteristic of human writing. The analysis found few of the consistent patterns typically associated with AI-generated content.';
  }
}

export default Dashboard;