// src/context/ToastContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToastContainer, { ToastItem } from '../components/ui/toast/ToastContainer';
import { ToastPosition } from '../components/ui/toast/Toast';

interface ToastContextProps {
  showToast: (message: string, type?: ToastItem['type'], duration?: number) => void;
  hideToast: (id?: string) => void; // Make id optional
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState<ToastPosition>('top-right');

  const showToast = useCallback((message: string, type: ToastItem['type'] = 'info', duration = 3000) => {
    const id = uuidv4();
    const newToast: ToastItem = { id, message, type, duration };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
    
    return id;
  }, []);

  const hideToast = useCallback((id?: string) => {
    if (!id) return; // Handle the case when id is undefined
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, position, setPosition }}>
      {children}
      <ToastContainer toasts={toasts} position={position} onRemove={hideToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};