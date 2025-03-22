// src/components/providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ToastProvider } from '@/contexts/ToastContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </Provider>
  );
}