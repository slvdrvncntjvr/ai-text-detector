// src/components/core/ResultSkeleton.tsx
import React from 'react';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const ResultSkeleton: React.FC = () => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <SkeletonLoader width="w-40" height="h-6" />
      </div>
      
      <div className="p-6">
        <div className="p-4 rounded-lg bg-slate-50 mb-6 flex items-center">
          <SkeletonLoader width="w-10" height="h-10" className="rounded-full mr-4" />
          <div className="flex-1">
            <SkeletonLoader width="w-3/4" height="h-5" className="mb-2" />
            <SkeletonLoader width="w-1/2" height="h-4" />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <SkeletonLoader width="w-32" height="h-5" />
            <SkeletonLoader width="w-16" height="h-6" />
          </div>
          
          <SkeletonLoader height="h-3" className="mb-1" />
          
          <div className="flex justify-between mt-1">
            <SkeletonLoader width="w-24" height="h-3" />
            <SkeletonLoader width="w-24" height="h-3" />
          </div>
        </div>
        
        <div>
          <SkeletonLoader width="w-48" height="h-6" className="mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <SkeletonLoader width="w-32" height="h-4" />
                  <SkeletonLoader width="w-12" height="h-4" />
                </div>
                <SkeletonLoader height="h-2" className="mb-2" />
                <SkeletonLoader width="w-3/4" height="h-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSkeleton;