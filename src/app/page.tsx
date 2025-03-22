import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TextAnalyzer from '@/components/core/TextAnalyzer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <TextAnalyzer />
        <Footer />
      </div>
    </main>
  );
}