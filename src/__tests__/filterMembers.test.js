import { describe, it, expect } from 'vitest';
import { filterMembers } from '../utils/filterMembers.js';

const mockMembers = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    membershipType: 'Basic',
    status: 'Active',
    joinedAt: '2026-06-20',
  },
  {
    id: '2',
    name: 'Bob Johnson',
    email: 'bob@work.com',
    membershipType: 'Premium',
    status: 'Inactive',
    joinedAt: '2026-06-21',
  },
  {
    id: '3',
    name: 'Clara Lee',
    email: 'clara@enterprise.org',
    membershipType: 'Enterprise',
    status: 'Active',
    joinedAt: '2026-06-22',
  },
];

describe('filterMembers', () => {
  it('returns all members when no filters are applied', () => {
    const result = filterMembers(mockMembers, {
      search: '',
      membershipType: 'All',
      status: 'All',
    });
    expect(result).toHaveLength(3);
  });

  it('filters by name using case-insensitive search', () => {
    const result = filterMembers(mockMembers, {
      search: 'alice',
      membershipType: 'All',
      status: 'All',
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice Smith');
  });

  it('filters by email using case-insensitive search', () => {
    const result = filterMembers(mockMembers, {
      search: 'bob@work',
      membershipType: 'All',
      status: 'All',
    });
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('bob@work.com');
  });

  it('filters by membership type', () => {
    const result = filterMembers(mockMembers, {
      search: '',
      membershipType: 'Enterprise',
      status: 'All',
    });
    expect(result).toHaveLength(1);
    expect(result[0].membershipType).toBe('Enterprise');
  });

  it('filters by status', () => {
    const result = filterMembers(mockMembers, {
      search: '',
      membershipType: 'All',
      status: 'Active',
    });
    expect(result).toHaveLength(2);
    expect(result.every((m) => m.status === 'Active')).toBe(true);
  });

  it('combines multiple filters', () => {
    const result = filterMembers(mockMembers, {
      search: 'clara',
      membershipType: 'Enterprise',
      status: 'Active',
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Clara Lee');
  });
});
