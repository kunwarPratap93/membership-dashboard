import React from 'react';
import { Search, X } from 'lucide-react';
import Input from '../ui/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by name or email...',
}) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      leftIcon={<Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
      rightIcon={
        value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 transition-colors p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : undefined
      }
    />
  );
};

export default SearchBar;
