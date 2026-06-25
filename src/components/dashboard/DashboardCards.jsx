import React from 'react';
import Card from '../ui/Card.jsx';
import { Users, DollarSign, UserPlus } from 'lucide-react';

export const DashboardCards = ({ stats }) => {
  // Format revenue as Currency (e.g. $18,700)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format count (e.g. 1,243)
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatCard
        title="Active Members"
        value={formatNumber(stats.activeMembers)}
        icon={Users}
        trend={{ value: '+4.75%', isPositive: true }}
        color="indigo"
      />
      <StatCard
        title="Total Revenue"
        value={formatCurrency(stats.revenue)}
        icon={DollarSign}
        trend={{ value: '+10.2%', isPositive: true }}
        color="emerald"
      />
      <StatCard
        title="New Signups Today"
        value={formatNumber(stats.newSignupsToday)}
        icon={UserPlus}
        trend={{ value: '+12%', isPositive: true }}
        color="violet"
      />
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
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
        <span className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </span>
        {trend && (
          <span className={`text-xs font-semibold ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {trend.value}
          </span>
        )}
      </div>
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${scheme.bg} border ${scheme.border}`}>
        <Icon className={`w-7 h-7 ${scheme.text}`} />
      </div>
    </Card>
  );
};

export default DashboardCards;
