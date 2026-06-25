import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', hoverEffect = false, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl p-5 shadow-sm transition-all duration-300
          ${hoverEffect ? 'hover:shadow-md hover:border-slate-205 dark:hover:border-slate-700/80 hover:-translate-y-0.5' : ''}
          ${glow ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-indigo-500/5 before:to-violet-500/5 before:pointer-events-none' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
