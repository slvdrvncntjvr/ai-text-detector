'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TextAnalyzer from '@/components/core/TextAnalyzer';
import HistoryPanel from '@/components/core/HistoryPanel';
import ModelStatus from '@/components/core/ModelStatus';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <ModelStatus />
            <TextAnalyzer />
            <HistoryPanel />
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}