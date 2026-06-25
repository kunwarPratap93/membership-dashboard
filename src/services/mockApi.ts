import type { Member, DashboardStats } from '../types/member';
import { mockMembers } from '../data/mockMembers';

const LOCAL_STORAGE_KEY = 'membership_dashboard_members';
const STATS_STORAGE_KEY = 'membership_dashboard_stats';

const BASE_STATS: DashboardStats = {
  activeMembers: 1243,
  revenue: 18700,
  newSignupsToday: 23,
};

// Delay simulator helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Initialize mock data in localStorage
  initializeData(): void {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockMembers));
    }
    if (!localStorage.getItem(STATS_STORAGE_KEY)) {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(BASE_STATS));
    }
  },

  // Fetch all members
  async getMembers(): Promise<Member[]> {
    this.initializeData();
    await delay(600); // realistic latency
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Get statistics
  async getStats(): Promise<DashboardStats> {
    this.initializeData();
    await delay(300);
    const data = localStorage.getItem(STATS_STORAGE_KEY);
    return data ? JSON.parse(data) : BASE_STATS;
  },

  // Add new member
  async addMember(newMember: Omit<Member, 'id' | 'joinedAt' | 'status' | 'avatarUrl'>): Promise<Member> {
    this.initializeData();
    await delay(800);

    const members = await this.getMembers();
    const stats = await this.getStats();

    // Create a new member object
    const createdMember: Member = {
      ...newMember,
      id: `m-${Date.now()}`,
      status: 'Active',
      joinedAt: new Date().toISOString().split('T')[0],
      // Generate a random avatar picture from placeholder
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150&h=150&fit=crop&crop=face`,
    };

    const updatedMembers = [createdMember, ...members];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMembers));

    // Update stats dynamically
    const revenueInc = 
      newMember.membershipType === 'Basic' ? 29 : 
      newMember.membershipType === 'Premium' ? 99 : 299;

    const updatedStats: DashboardStats = {
      activeMembers: stats.activeMembers + 1,
      revenue: stats.revenue + revenueInc,
      newSignupsToday: stats.newSignupsToday + 1,
    };
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updatedStats));

    return createdMember;
  },

  // Update member (status change / tier change)
  async updateMember(updatedMember: Member): Promise<Member> {
    this.initializeData();
    await delay(600);

    const members = await this.getMembers();
    const stats = await this.getStats();
    
    const originalMember = members.find(m => m.id === updatedMember.id);
    if (!originalMember) throw new Error('Member not found');

    const updatedMembers = members.map((m) =>
      m.id === updatedMember.id ? updatedMember : m
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMembers));

    // Recalculate stats dynamically based on the changes
    let activeDiff = 0;
    let revenueDiff = 0;

    // Status change diff
    if (originalMember.status !== updatedMember.status) {
      if (updatedMember.status === 'Active') activeDiff = 1;
      else activeDiff = -1;
    }

    // Membership Type changes revenue diff
    if (originalMember.membershipType !== updatedMember.membershipType || originalMember.status !== updatedMember.status) {
      const getRevenueValue = (type: string, status: string) => {
        if (status === 'Inactive') return 0;
        return type === 'Basic' ? 29 : type === 'Premium' ? 99 : 299;
      };

      const oldRevenue = getRevenueValue(originalMember.membershipType, originalMember.status);
      const newRevenue = getRevenueValue(updatedMember.membershipType, updatedMember.status);
      revenueDiff = newRevenue - oldRevenue;
    }

    const updatedStats: DashboardStats = {
      ...stats,
      activeMembers: stats.activeMembers + activeDiff,
      revenue: stats.revenue + revenueDiff,
    };
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updatedStats));

    return updatedMember;
  },

  // Delete a member
  async deleteMember(id: string): Promise<boolean> {
    this.initializeData();
    await delay(500);

    const members = await this.getMembers();
    const stats = await this.getStats();

    const memberToDelete = members.find(m => m.id === id);
    if (!memberToDelete) return false;

    const updatedMembers = members.filter((m) => m.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMembers));

    // Update stats dynamically on delete
    let activeDec = 0;
    let revenueDec = 0;

    if (memberToDelete.status === 'Active') {
      activeDec = 1;
      revenueDec = 
        memberToDelete.membershipType === 'Basic' ? 29 : 
        memberToDelete.membershipType === 'Premium' ? 99 : 299;
    }

    // Check if the member was signed up today to decrement today's signups
    const todayStr = new Date().toISOString().split('T')[0];
    const signedUpToday = memberToDelete.joinedAt === todayStr;

    const updatedStats: DashboardStats = {
      activeMembers: Math.max(0, stats.activeMembers - activeDec),
      revenue: Math.max(0, stats.revenue - revenueDec),
      newSignupsToday: Math.max(0, stats.newSignupsToday - (signedUpToday ? 1 : 0)),
    };
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updatedStats));

    return true;
  },
};
