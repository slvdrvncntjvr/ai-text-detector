// src/components/ui/SkeletonLoader.tsx
import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  width?: string;
  height?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4' 
}) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${width} ${height} ${className}`}></div>
  );
};

export default SkeletonLoader;