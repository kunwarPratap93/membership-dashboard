import React from 'react';
import SearchBar from './SearchBar';
import Select from '../ui/Select';
import type { FilterOptions, SortOptions, SortField, SortDirection } from '../../types/member';

interface FilterBarProps {
  filters: FilterOptions;
  onChangeFilters: (filters: FilterOptions) => void;
  sort: SortOptions;
  onChangeSort: (sort: SortOptions) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilters,
  sort,
  onChangeSort,
}) => {
  const membershipOptions = [
    { value: 'All', label: 'All Tiers' },
    { value: 'Basic', label: 'Basic' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Enterprise', label: 'Enterprise' },
  ];

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  const sortSelectOptions = [
    { value: 'joinedAt-desc', label: 'Join Date: Newest First' },
    { value: 'joinedAt-asc', label: 'Join Date: Oldest First' },
    { value: 'name-asc', label: 'Name: A - Z' },
    { value: 'name-desc', label: 'Name: Z - A' },
    { value: 'email-asc', label: 'Email: A - Z' },
    { value: 'email-desc', label: 'Email: Z - A' },
    { value: 'membershipType-asc', label: 'Tier: Basic to Enterprise' },
    { value: 'status-asc', label: 'Status: Active First' },
    { value: 'status-desc', label: 'Status: Inactive First' },
  ];

  const handleSearchChange = (search: string) => {
    onChangeFilters({ ...filters, search });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilters({ ...filters, membershipType: e.target.value as any });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilters({ ...filters, status: e.target.value as any });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = e.target.value.split('-') as [SortField, SortDirection];
    onChangeSort({ field, direction });
  };

  const currentSortValue = `${sort.field}-${sort.direction}`;

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
      <div className="flex-1">
        <SearchBar value={filters.search} onChange={handleSearchChange} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:flex lg:items-center">
        <Select
          options={membershipOptions}
          value={filters.membershipType}
          onChange={handleTypeChange}
          containerClassName="w-full lg:w-44"
          aria-label="Filter by membership tier"
        />

        <Select
          options={statusOptions}
          value={filters.status}
          onChange={handleStatusChange}
          containerClassName="w-full lg:w-44"
          aria-label="Filter by status"
        />

        {/* Displayed sorting options for quick actions, especially on mobile devices */}
        <Select
          options={sortSelectOptions}
          value={currentSortValue}
          onChange={handleSortChange}
          containerClassName="w-full sm:col-span-2 lg:w-56"
          aria-label="Sort members"
        />
      </div>
    </div>
  );
};

export default FilterBar;
