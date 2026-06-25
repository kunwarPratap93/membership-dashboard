import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Member, DashboardStats, FilterOptions, SortOptions } from '../types/member';
import { mockApi } from '../services/mockApi';
import { filterMembers } from '../utils/filterMembers';
import { sortMembers } from '../utils/sortMembers';

export const useMembers = () => {
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    activeMembers: 0,
    revenue: 0,
    newSignupsToday: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    membershipType: 'All',
    status: 'All',
  });

  // Sorting state
  const [sort, setSort] = useState<SortOptions>({
    field: 'joinedAt',
    direction: 'desc',
  });

  // Fetch initial data
  const fetchData = useCallback(async (showSkeleton = true) => {
    if (showSkeleton) setIsLoading(true);
    setError(null);
    try {
      const [membersData, statsData] = await Promise.all([
        mockApi.getMembers(),
        mockApi.getStats(),
      ]);
      setAllMembers(membersData);
      setStats(statsData);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch membership data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived filtered & sorted members
  const processedMembers = useMemo(() => {
    const filtered = filterMembers(allMembers, filters);
    return sortMembers(filtered, sort);
  }, [allMembers, filters, sort]);

  // Add Member
  const addMember = useCallback(async (
    newMember: Omit<Member, 'id' | 'joinedAt' | 'status' | 'avatarUrl'>
  ) => {
    setIsMutating(true);
    setError(null);
    try {
      const added = await mockApi.addMember(newMember);
      // Instantly update the local state for fluid response
      setAllMembers((prev) => [added, ...prev]);
      
      // Update statistics locally
      const revenueInc = 
        newMember.membershipType === 'Basic' ? 29 : 
        newMember.membershipType === 'Premium' ? 99 : 299;

      setStats((prev) => ({
        activeMembers: prev.activeMembers + 1,
        revenue: prev.revenue + revenueInc,
        newSignupsToday: prev.newSignupsToday + 1,
      }));
      return added;
    } catch (err) {
      setError('Failed to add new member.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }, []);

  // Toggle member status (Active <-> Inactive)
  const toggleMemberStatus = useCallback(async (id: string) => {
    const memberToToggle = allMembers.find((m) => m.id === id);
    if (!memberToToggle) return;

    const updatedMember: Member = {
      ...memberToToggle,
      status: memberToToggle.status === 'Active' ? 'Inactive' : 'Active',
    };

    // Optimistically update
    setAllMembers((prev) =>
      prev.map((m) => (m.id === id ? updatedMember : m))
    );

    // Calculate stat change optimistically
    const isActive = updatedMember.status === 'Active';
    const activeDiff = isActive ? 1 : -1;
    
    const getRevenueValue = (type: string, status: string) => {
      if (status === 'Inactive') return 0;
      return type === 'Basic' ? 29 : type === 'Premium' ? 99 : 299;
    };
    const oldRev = getRevenueValue(memberToToggle.membershipType, memberToToggle.status);
    const newRev = getRevenueValue(updatedMember.membershipType, updatedMember.status);
    const revenueDiff = newRev - oldRev;

    setStats((prev) => ({
      ...prev,
      activeMembers: Math.max(0, prev.activeMembers + activeDiff),
      revenue: Math.max(0, prev.revenue + revenueDiff),
    }));

    try {
      await mockApi.updateMember(updatedMember);
    } catch (err) {
      console.error(err);
      setError('Failed to update member status. Rolling back.');
      // Rollback on failure
      fetchData(false);
    }
  }, [allMembers, fetchData]);

  // Update member membership type
  const updateMemberType = useCallback(async (id: string, type: Member['membershipType']) => {
    const memberToUpdate = allMembers.find((m) => m.id === id);
    if (!memberToUpdate) return;

    const updatedMember: Member = {
      ...memberToUpdate,
      membershipType: type,
    };

    // Optimistically update
    setAllMembers((prev) =>
      prev.map((m) => (m.id === id ? updatedMember : m))
    );

    if (memberToUpdate.status === 'Active') {
      const getRevenueValue = (t: string) => {
        return t === 'Basic' ? 29 : t === 'Premium' ? 99 : 299;
      };
      const oldRev = getRevenueValue(memberToUpdate.membershipType);
      const newRev = getRevenueValue(type);
      const revenueDiff = newRev - oldRev;

      setStats((prev) => ({
        ...prev,
        revenue: Math.max(0, prev.revenue + revenueDiff),
      }));
    }

    try {
      await mockApi.updateMember(updatedMember);
    } catch (err) {
      console.error(err);
      setError('Failed to update membership tier. Rolling back.');
      fetchData(false);
    }
  }, [allMembers, fetchData]);

  // Delete Member
  const deleteMember = useCallback(async (id: string) => {
    const memberToDelete = allMembers.find((m) => m.id === id);
    if (!memberToDelete) return;

    // Optimistically update
    setAllMembers((prev) => prev.filter((m) => m.id !== id));

    let activeDec = 0;
    let revenueDec = 0;
    if (memberToDelete.status === 'Active') {
      activeDec = 1;
      revenueDec = 
        memberToDelete.membershipType === 'Basic' ? 29 : 
        memberToDelete.membershipType === 'Premium' ? 99 : 299;
    }
    const todayStr = new Date().toISOString().split('T')[0];
    const signedUpToday = memberToDelete.joinedAt === todayStr;

    setStats((prev) => ({
      activeMembers: Math.max(0, prev.activeMembers - activeDec),
      revenue: Math.max(0, prev.revenue - revenueDec),
      newSignupsToday: Math.max(0, prev.newSignupsToday - (signedUpToday ? 1 : 0)),
    }));

    try {
      await mockApi.deleteMember(id);
    } catch (err) {
      console.error(err);
      setError('Failed to delete member. Rolling back.');
      fetchData(false);
    }
  }, [allMembers, fetchData]);

  return {
    members: processedMembers,
    allMembers,
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
    refetch: fetchData,
  };
};
