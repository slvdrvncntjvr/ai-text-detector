import React from 'react';
import { cn } from '@/lib/utils/validation';

type ProgressBarProps = {
  value: number;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  variant = 'info',
  className
}) => {
  const percentage = Math.min(100, Math.max(0, value * 100));
  
  const variantClasses = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2.5", className)}>
      <div 
        className={cn("h-2.5 rounded-full", variantClasses[variant])}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default ProgressBar;