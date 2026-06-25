export const filterMembers = (members, filters) => {
  return members.filter((member) => {
    // 1. Search Query (Matches Name or Email case-insensitively)
    const searchQuery = filters.search.trim().toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery) ||
      member.email.toLowerCase().includes(searchQuery);

    // 2. Membership Type Filter
    const matchesType =
      filters.membershipType === 'All' ||
      member.membershipType === filters.membershipType;

    // 3. Status Filter
    const matchesStatus =
      filters.status === 'All' ||
      member.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });
};
