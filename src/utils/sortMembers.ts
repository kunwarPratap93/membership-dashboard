import type { Member, SortOptions } from '../types/member';

export const sortMembers = (members: Member[], sort: SortOptions): Member[] => {
  const { field, direction } = sort;
  
  return [...members].sort((a, b) => {
    let valueA = a[field] || '';
    let valueB = b[field] || '';

    // Convert strings to lowercase for case-insensitive alphabetical sorting
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
    }
    if (typeof valueB === 'string') {
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) {
      return direction === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
