import React, { forwardRef } from 'react';

export const Input = forwardRef((
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className = '',
      containerClassName = '',
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-705 dark:text-slate-355 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`
              w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-650 bg-white dark:bg-slate-900 
              ${leftIcon ? 'pl-10' : ''} 
              ${rightIcon ? 'pr-10' : ''} 
              ${
                error
                  ? 'border-rose-300 dark:border-rose-900/50 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
              }
              text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 text-slate-400 dark:text-slate-500 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
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

Input.displayName = 'Input';
export default Input;
