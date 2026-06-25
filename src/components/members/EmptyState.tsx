import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

interface EmptyStateProps {
  onClearFilters?: () => void;
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onClearFilters,
  title = 'No members found',
  description = "We couldn't find any members matching your current filters or search query.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl max-w-lg mx-auto my-6 shadow-sm animate-fade-in">
      <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-900 text-slate-400 dark:text-slate-500 mb-4">
        <SearchX className="w-8 h-8 stroke-[1.5]" />
      </div>
      
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        {title}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
        {description}
      </p>

      {onClearFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="mt-6"
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
