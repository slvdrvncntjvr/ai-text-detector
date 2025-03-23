'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef, useEffect } from 'react';
import Toast from '@/components/ui//toast/Toast';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastData {
  message: string;
  type: ToastType;
  id: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastData[];
  showToast: (message: string, type: ToastType, duration?: number) => string;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const toastTimers = useRef<Record<string, NodeJS.Timeout>>({});
  
  useEffect(() => {
    return () => {
      Object.values(toastTimers.current).forEach(clearTimeout);
    };
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 5000): string => {
    const id = crypto.randomUUID?.() || Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => [...prev, { message, type, id, duration }]);
    
    if (duration > 0) {
      toastTimers.current[id] = setTimeout(() => {
        hideToast(id);
      }, duration);
    }
    
    return id;
  }, []);

  const hideToast = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    
    if (toastTimers.current[id]) {
      clearTimeout(toastTimers.current[id]);
      delete toastTimers.current[id];
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({ toasts, showToast, hideToast }),
    [toasts, showToast, hideToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Add this Providers component that wraps all your provider components
export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      {/* Add other providers here as needed */}
      {children}
    </ToastProvider>
  );
};