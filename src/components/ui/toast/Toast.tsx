// src/components/ui/toast/Toast.tsx
import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastProps {
  id?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id?: string) => void;
  position?: ToastPosition;
  showCloseButton?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'info',
  duration,
  onClose,
  position = 'top-right',
  showCloseButton = true,
}) => {
  const typeConfig = {
    success: { bgColor: 'bg-green-500', icon: <CheckCircleIcon className="h-5 w-5" /> },
    error: { bgColor: 'bg-red-500', icon: <XCircleIcon className="h-5 w-5" /> },
    warning: { bgColor: 'bg-yellow-500', icon: <ExclamationCircleIcon className="h-5 w-5" /> },
    info: { bgColor: 'bg-blue-500', icon: <InformationCircleIcon className="h-5 w-5" /> },
  };

  // Auto-dismiss toast if duration is provided
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const { bgColor, icon } = typeConfig[type];

  return (
    <div 
      className={`flex items-center p-4 rounded-md shadow-lg text-white 
                 transition-all duration-300 z-50 ${bgColor}`}
    >
      <div className="mr-2">{icon}</div>
      <div className="flex-1">{message}</div>
      {showCloseButton && (
        <button 
          onClick={() => onClose(id)} 
          className="ml-2 text-white hover:text-gray-200 focus:outline-none"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Toast;