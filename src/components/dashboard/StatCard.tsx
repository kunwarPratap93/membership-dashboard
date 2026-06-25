import React from 'react';
import Card from '../ui/Card';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: 'indigo' | 'emerald' | 'violet';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-100 dark:border-indigo-900/30',
      glow: 'shadow-indigo-100/50 dark:shadow-none',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100 dark:border-emerald-900/30',
      glow: 'shadow-emerald-100/50 dark:shadow-none',
    },
    violet: {
      bg: 'bg-violet-50 dark:bg-violet-950/40',
      text: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-100 dark:border-violet-900/30',
      glow: 'shadow-violet-100/50 dark:shadow-none',
    },
  };

  const scheme = colorMap[color];

  return (
    <Card hoverEffect glow className={`flex items-start justify-between relative ${scheme.glow}`}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
          {value}
        </h3>
        
        {trend && (
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-450'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-450'
              }`}
            >
              {trend.value}
            </span>
            <span className="text-xs text-slate-450 dark:text-slate-500">
              vs last week
            </span>
          </div>
        )}
      </div>

      <div className={`p-3 rounded-xl border ${scheme.bg} ${scheme.border} ${scheme.text}`}>
        <Icon className="w-5 h-5 stroke-[2]" />
      </div>
    </Card>
  );
};

export default StatCard;
