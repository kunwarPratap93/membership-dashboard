import React from 'react';
import StatCard from './StatCard';
import { Users, DollarSign, UserPlus } from 'lucide-react';
import type { DashboardStats } from '../../types/member';

interface DashboardCardsProps {
  stats: DashboardStats;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ stats }) => {
  // Format revenue as Currency (e.g. $18,700)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format count (e.g. 1,243)
  const formatNumber = (value: number) => {
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

export default DashboardCards;
