import { forwardRef } from 'react';

export const Select = forwardRef((
    { label, options, error, className = '', containerClassName = '', id, ...props}, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-slate-700 dark:text-slate-355 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`
              w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-slate-900 appearance-none cursor-pointer
              ${
                error
                  ? 'border-rose-300 dark:border-rose-900/50 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
              }
              text-slate-900 dark:text-slate-100
              ${className}
            `}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
          
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {error && (
          <p className="text-xs text-rose-605 dark:text-rose-455 font-medium flex items-center gap-1 mt-0.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-455" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
