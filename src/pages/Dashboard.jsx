import React, { useState } from 'react';
import { useMembers } from '../hooks/useMembers.js';
import DashboardCards from '../components/dashboard/DashboardCards.jsx';
import FilterBar from '../components/members/FilterBar.jsx';
import MembersTable from '../components/members/MembersTable.jsx';
import EmptyState from '../components/members/EmptyState.jsx';
import LoadingState from '../components/members/LoadingState.jsx';
import AddMemberForm from '../components/forms/AddMemberForm.jsx';
import Button from '../components/ui/Button.jsx';
import { UserPlus, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  const {
    members,
    stats,
    isLoading,
    isMutating,
    error,
    filters,
    setFilters,
    sort,
    setSort,
    addMember,
    toggleMemberStatus,
    updateMemberType,
    deleteMember,
  } = useMembers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Show toast notification helper
  const showToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleAddMember = async (data) => {
    try {
      await addMember(data);
      setIsModalOpen(false);
      showToast(`Successfully added member ${data.name}!`, 'success');
    } catch (err) {
      showToast('Could not add member. Try again.', 'error');
    }
  };

  const handleToggleStatus = (id) => {
    const member = members.find((m) => m.id === id);
    toggleMemberStatus(id);
    if (member) {
      const nextStatus = member.status === 'Active' ? 'Inactive' : 'Active';
      showToast(`${member.name} status updated to ${nextStatus}.`, 'info');
    }
  };

  const handleUpdateType = (id, type) => {
    const member = members.find((m) => m.id === id);
    updateMemberType(id, type);
    if (member) {
      showToast(`${member.name} membership upgraded to ${type}.`, 'info');
    }
  };

  const handleDeleteMember = (id) => {
    const member = members.find((m) => m.id === id);
    if (member && window.confirm(`Are you sure you want to remove ${member.name}?`)) {
      deleteMember(id);
      showToast(`Removed member ${member.name}.`, 'success');
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      membershipType: 'All',
      status: 'All',
    });
  };

  const handleHeaderSort = (field) => {
    setSort((prev) => {
      const direction = prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc';
      return { field, direction };
    });
  };

  return (
    <div className="flex flex-col gap-6 relative">
      
      {/* 1. Header Overview Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-none my-0">
            Members Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-normal">
            View analytics, search directory, filter tiers, and onboard new subscribers.
          </p>
        </div>
        
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<UserPlus className="w-4.5 h-4.5" />}
          className="shadow-sm"
        >
          Add New Member
        </Button>
      </div>

      {/* 2. Error Notice Banner if any */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-805 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* 3. Dashboard Metrics Cards */}
      {isLoading ? (
        <LoadingState type="cards" />
      ) : (
        <DashboardCards stats={stats} />
      )}

      {/* 4. Directory filters */}
      <FilterBar
        filters={filters}
        onChangeFilters={setFilters}
        sort={sort}
        onChangeSort={setSort}
      />

      {/* 5. Members List Grid */}
      {isLoading ? (
        <LoadingState type="table" />
      ) : members.length === 0 ? (
        <EmptyState onClearFilters={handleClearFilters} />
      ) : (
        <MembersTable
          members={members}
          sort={sort}
          onSort={handleHeaderSort}
          onToggleStatus={handleToggleStatus}
          onUpdateType={handleUpdateType}
          onDelete={handleDeleteMember}
        />
      )}

      {/* 6. Onboarding Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-800/80 rounded-2xl p-6 shadow-xl animate-scale-up"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Title bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-805 mb-5">
              <div className="flex items-center gap-2 text-slate-850 dark:text-white">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-bold">Onboard Member</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Close onboarding form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Modal Body Form */}
            <AddMemberForm
              onSubmit={handleAddMember}
              onCancel={() => setIsModalOpen(false)}
              isSubmitting={isMutating}
            />
          </div>
        </div>
      )}

      {/* 7. Toast Alerts Stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 p-4 rounded-xl border shadow-lg bg-white dark:bg-slate-900 pointer-events-auto animate-slide-in-right
              ${
                toast.type === 'success'
                  ? 'border-emerald-100 dark:border-emerald-950/40 text-emerald-800 dark:text-emerald-400'
                  : toast.type === 'error'
                  ? 'border-rose-100 dark:border-rose-955/40 text-rose-800 dark:text-rose-400'
                  : 'border-indigo-100 dark:border-indigo-950/40 text-indigo-805 dark:text-indigo-400'
              }
            `}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
            ) : (
              <Sparkles className="w-5 h-5 flex-shrink-0 text-indigo-500" />
            )}
            <span className="text-sm font-semibold flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
