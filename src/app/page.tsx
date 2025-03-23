// src/app/page.tsx
"use client";

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TextAnalyzer from '@/components/core/TextAnalyzer';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQ from '@/components/sections/FAQ';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('analyzer');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Detect AI-Generated Content with Precision
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                Our advanced AI detection tool analyzes linguistic patterns to identify content created by AI systems like ChatGPT, Claude, or Bard with up to 98% accuracy.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-slate-100">
              <div className="flex justify-center mb-8 border-b border-slate-200">
                <nav className="flex space-x-2 md:space-x-8">
                  <button
                    onClick={() => setActiveSection('analyzer')}
                    className={`pb-3 px-1 text-base font-medium ${
                      activeSection === 'analyzer' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Text Analyzer
                  </button>
                  <button
                    onClick={() => setActiveSection('howItWorks')}
                    className={`pb-3 px-1 text-base font-medium ${
                      activeSection === 'howItWorks' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => setActiveSection('faq')}
                    className={`pb-3 px-1 text-base font-medium ${
                      activeSection === 'faq' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    FAQ
                  </button>
                </nav>
              </div>
              
              {activeSection === 'analyzer' && <TextAnalyzer />}
              {activeSection === 'howItWorks' && <HowItWorks />}
              {activeSection === 'faq' && <FAQ />}
            </div>
          </motion.div>
        </section>
        
        <section className="py-16 bg-slate-50 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why Choose Our AI Text Detector?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our tool leverages advanced NLP algorithms to provide accurate and reliable AI detection results.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "High Accuracy",
                  description: "Our detection engine achieves up to 98% accuracy in identifying AI-generated content.",
                  icon: "🎯"
                },
                {
                  title: "Fast Analysis",
                  description: "Get results in seconds, no matter how long or complex your text sample is.",
                  icon: "⚡"
                },
                {
                  title: "Privacy Focused",
                  description: "We don't store your text samples. Your data remains private and secure.",
                  icon: "🔒"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-slate-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Ready to Start Detecting AI Content?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Try our AI text detector now. No registration required, just paste your text and get instant results.
            </p>
            <button
              onClick={() => setActiveSection('analyzer')}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Analyze Text Now
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}