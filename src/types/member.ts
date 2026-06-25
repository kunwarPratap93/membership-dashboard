export type MembershipType = 'Basic' | 'Premium' | 'Enterprise';

export type MemberStatus = 'Active' | 'Inactive';

export interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: MembershipType;
  status: MemberStatus;
  joinedAt: string; // ISO String or YYYY-MM-DD
  avatarUrl?: string;
}

export interface DashboardStats {
  activeMembers: number;
  revenue: number;
  newSignupsToday: number;
}

export interface FilterOptions {
  search: string;
  membershipType: MembershipType | 'All';
  status: MemberStatus | 'All';
}

export type SortField = 'name' | 'email' | 'membershipType' | 'status' | 'joinedAt';
export type SortDirection = 'asc' | 'desc';

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}
