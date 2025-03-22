// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Text Detector | Professional Content Analysis',
  description: 'Detect AI-generated content with precision using advanced linguistic analysis.',
  keywords: 'AI detection, content analysis, ChatGPT detector, AI writing detection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gradient-to-b from-slate-50 to-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}