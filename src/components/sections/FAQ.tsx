// src/components/sections/FAQ.tsx
import React from 'react';

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600">
            Common questions about our AI text detection technology
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">How accurate is the AI detection?</h3>
            <p className="text-slate-600">
              Our detector achieves approximately 85% accuracy in identifying AI-generated content. However, accuracy may vary depending on the length and complexity of the text.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Is my text stored or analyzed by humans?</h3>
            <p className="text-slate-600">
              No. All text analysis happens in your browser. We don't store your text or send it to any server for analysis. Your privacy is guaranteed.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Can AI-generated text be modified to avoid detection?</h3>
            <p className="text-slate-600">
              Yes, heavily edited AI text may be harder to detect. Our tool works best on raw or lightly edited AI-generated content. Manual rewrites can reduce detectability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">What's the minimum text length for accurate analysis?</h3>
            <p className="text-slate-600">
              For best results, we recommend analyzing text that's at least 300 words long. Shorter texts may not contain enough patterns for reliable detection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;