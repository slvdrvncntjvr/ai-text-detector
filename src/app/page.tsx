// src/app/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TextAnalyzer from '@/components/core/TextAnalyzer';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQ from '@/components/sections/FAQ';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Detect AI-Generated Content with Precision
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our advanced AI detection tool analyzes linguistic patterns to identify content created by AI systems like ChatGPT, Claude, or Bard.
              </p>
            </div>
            
            <TextAnalyzer />
          </div>
        </section>
        
        <HowItWorks />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}