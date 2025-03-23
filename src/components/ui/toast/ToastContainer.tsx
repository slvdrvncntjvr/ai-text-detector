// src/components/ui/toast/ToastContainer.tsx
import React from 'react';
import Toast, { ToastPosition } from './Toast';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  position?: ToastPosition;
  onRemove: (id?: string) => void;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  position = 'top-right',
  onRemove 
}) => {
  return (
    <div className={`fixed flex flex-col gap-2 ${positionClasses[position]} z-50`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={onRemove}
          position={position}
        />
      ))}
    </div>
  );
};

export default ToastContainer;