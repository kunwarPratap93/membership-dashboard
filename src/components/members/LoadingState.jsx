import React from 'react';

export const LoadingState = ({ type = 'all' }) => {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      {/* 1. Cards Skeleton */}
      {(type === 'all' || type === 'cards') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl p-5 shadow-sm flex items-start justify-between"
            >
              <div className="flex flex-col gap-2 w-2/3">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mt-1" />
                <div className="h-3.5 bg-slate-100 dark:bg-slate-850 rounded w-2/3 mt-2" />
              </div>
              <div className="w-11 h-11 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* 2. Table Skeleton */}
      {(type === 'all' || type === 'table') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden">
          {/* Header skeleton */}
          <div className="border-b border-slate-100 dark:border-slate-800/80 p-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-32" />
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded w-24" />
          </div>
          
          {/* Table rows skeleton */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex-shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-36" />
                    <div className="h-3.5 bg-slate-100 dark:bg-slate-850 rounded w-48" />
                  </div>
                </div>
                
                <div className="flex flex-row sm:items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
                  <div className="h-3.5 bg-slate-100 dark:bg-slate-850 rounded w-20" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16" />
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-8 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingState;
