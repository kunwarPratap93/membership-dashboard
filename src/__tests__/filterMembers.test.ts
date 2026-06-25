import { describe, it, expect } from 'vitest';
import { filterMembers } from '../utils/filterMembers';
import type { Member } from '../types/member';

const mockMembers: Member[] = [
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

  it('filters by email using search', () => {
    const result = filterMembers(mockMembers, {
      search: 'work.com',
      membershipType: 'All',
      status: 'All',
    });
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('bob@work.com');
  });

  it('filters by membership type', () => {
    const result = filterMembers(mockMembers, {
      search: '',
      membershipType: 'Premium',
      status: 'All',
    });
    expect(result).toHaveLength(1);
    expect(result[0].membershipType).toBe('Premium');
  });

  it('filters by status', () => {
    const result = filterMembers(mockMembers, {
      search: '',
      membershipType: 'All',
      status: 'Inactive',
    });
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('Inactive');
  });
});
