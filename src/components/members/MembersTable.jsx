import React from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Mail,
  Calendar
} from 'lucide-react';

export const MembersTable = ({
  members,
  sort,
  onSort,
  onToggleStatus,
  onUpdateType,
  onDelete,
}) => {
  
  // Header sorting helper
  const renderSortIcon = (field) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 ml-1.5 opacity-40 group-hover:opacity-100 transition-opacity" />;
    }
    return sort.direction === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 ml-1.5 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 ml-1.5 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
    );
  };

  // Format date helper (e.g. "Jun 25, 2026")
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get tier style
  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Enterprise':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30';
      case 'Premium':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30';
      case 'Basic':
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-355 border border-slate-200/50 dark:border-slate-700/50';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl shadow-sm overflow-hidden">
      
      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider select-none">
              <th 
                className="py-4 px-6 cursor-pointer group"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center">
                  Name {renderSortIcon('name')}
                </div>
              </th>
              <th 
                className="py-4 px-6 cursor-pointer group"
                onClick={() => onSort('email')}
              >
                <div className="flex items-center">
                  Email {renderSortIcon('email')}
                </div>
              </th>
              <th 
                className="py-4 px-6 cursor-pointer group"
                onClick={() => onSort('membershipType')}
              >
                <div className="flex items-center">
                  Membership Type {renderSortIcon('membershipType')}
                </div>
              </th>
              <th 
                className="py-4 px-6 cursor-pointer group"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center">
                  Status {renderSortIcon('status')}
                </div>
              </th>
              <th 
                className="py-4 px-6 cursor-pointer group"
                onClick={() => onSort('joinedAt')}
              >
                <div className="flex items-center">
                  Joined Date {renderSortIcon('joinedAt')}
                </div>
              </th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
            {members.map((member) => (
              <tr 
                key={member.id} 
                className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-colors"
              >
                {/* Member Profile */}
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      {member.avatarUrl ? (
                        <img 
                          src={member.avatarUrl} 
                          alt={member.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-850 shadow-sm"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <span 
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
                          member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        {member.name}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Email Address */}
                <td className="py-3.5 px-6 text-slate-600 dark:text-slate-400">
                  {member.email}
                </td>

                {/* Membership Type Selectable Badge */}
                <td className="py-3.5 px-6">
                  <select
                    value={member.membershipType}
                    onChange={(e) => onUpdateType(member.id, e.target.value)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-transparent ${getTierBadge(
                      member.membershipType
                    )}`}
                    aria-label={`Change membership for ${member.name}`}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </td>

                {/* Interactive Status Toggle */}
                <td className="py-3.5 px-6">
                  <button
                    onClick={() => onToggleStatus(member.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 active:scale-95 ${
                      member.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800/80 dark:text-slate-400 border border-slate-200/30 dark:border-slate-700/30'
                    }`}
                    title="Click to toggle status"
                  >
                    {member.status === 'Active' ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                        Inactive
                      </>
                    )}
                  </button>
                </td>

                {/* Joined Date */}
                <td className="py-3.5 px-6 text-slate-500 dark:text-slate-400">
                  {formatDate(member.joinedAt)}
                </td>

                {/* Delete Button */}
                <td className="py-3.5 px-6 text-right">
                  <button
                    onClick={() => onDelete(member.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Delete member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked List View (Visible on small devices) */}
      <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800/80">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="p-5 flex flex-col gap-4 hover:bg-slate-50/40 dark:hover:bg-slate-850/10 transition-colors"
          >
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {member.avatarUrl ? (
                    <img 
                      src={member.avatarUrl} 
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-850"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <span 
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${
                      member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                    {member.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(member.joinedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Status and Action row */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDelete(member.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  aria-label="Delete member"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email and Membership Type details */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50/50 dark:bg-slate-955/20 p-3 rounded-lg border border-slate-100 dark:border-slate-850/60 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-slate-400 dark:text-slate-500">Email Address</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate flex items-center gap-1.5" title={member.email}>
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {member.email}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-400 dark:text-slate-500">Membership Tier</span>
                <div className="mt-0.5">
                  <select
                    value={member.membershipType}
                    onChange={(e) => onUpdateType(member.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-0.5 rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-transparent ${getTierBadge(
                      member.membershipType
                    )}`}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Toggle Status bar */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-450 dark:text-slate-500">Status</span>
              <button
                onClick={() => onToggleStatus(member.id)}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                  member.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800/80 dark:text-slate-400 border border-slate-200/30 dark:border-slate-700/30'
                }`}
              >
                {member.status === 'Active' ? 'Active (Click to Suspend)' : 'Suspended (Click to Activate)'}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default MembersTable;
