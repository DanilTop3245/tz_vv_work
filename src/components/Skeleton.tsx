import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`} />
  );
};

export const JobCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse flex flex-col justify-between h-64 transition-colors">
      <div className="space-y-3">
        <div className="w-28 h-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="w-full h-6 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="w-3/4 h-5 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="space-y-2">
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800/60 rounded" />
        <div className="w-full h-10 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
    </div>
  );
};

export default Skeleton;
