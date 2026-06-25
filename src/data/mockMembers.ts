import type { Member } from '../types/member';

export const mockMembers: Member[] = [
  // --- Active Members (12 Members = 60%) ---
  {
    id: 'm-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@cyberdyne.com',
    membershipType: 'Enterprise',
    status: 'Active',
    joinedAt: '2026-01-15',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    membershipType: 'Basic',
    status: 'Active',
    joinedAt: '2026-03-22',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-3',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    membershipType: 'Premium',
    status: 'Active',
    joinedAt: '2026-05-10',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-4',
    name: 'Elena Fisher',
    email: 'elena.f@unlimited.org',
    membershipType: 'Premium',
    status: 'Active',
    joinedAt: '2026-02-18',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-5',
    name: 'Arthur Morgan',
    email: 'amorgan@van-der-linde.com',
    membershipType: 'Enterprise',
    status: 'Active',
    joinedAt: '2026-06-25', // Today
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-6',
    name: 'Sadie Adler',
    email: 'sadie.adler@ranch.com',
    membershipType: 'Premium',
    status: 'Active',
    joinedAt: '2026-06-25', // Today
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-7',
    name: 'Marcus Fenix',
    email: 'mfenix@cog.mil',
    membershipType: 'Basic',
    status: 'Active',
    joinedAt: '2026-02-28',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-8',
    name: 'Anya Stroud',
    email: 'anya.stroud@cog.mil',
    membershipType: 'Premium',
    status: 'Active',
    joinedAt: '2026-03-05',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-9',
    name: 'Gordon Freeman',
    email: 'gfreeman@blackmesa.org',
    membershipType: 'Enterprise',
    status: 'Active',
    joinedAt: '2025-12-10',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-10',
    name: 'Alyx Vance',
    email: 'alyx.vance@resistance.net',
    membershipType: 'Premium',
    status: 'Active',
    joinedAt: '2026-06-25', // Today
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-11',
    name: 'Lara Croft',
    email: 'lara.croft@croftmanor.co.uk',
    membershipType: 'Enterprise',
    status: 'Active',
    joinedAt: '2026-05-15',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-12',
    name: 'Bruce Wayne',
    email: 'bruce@wayneenterprises.com',
    membershipType: 'Enterprise',
    status: 'Active',
    joinedAt: '2025-10-31',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },

  // --- Inactive Members (8 Members = 40%) ---
  {
    id: 'm-13',
    name: 'Alex Mercer',
    email: 'a.mercer@gentek.org',
    membershipType: 'Enterprise',
    status: 'Inactive',
    joinedAt: '2025-11-04',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-14',
    name: 'Nathan Drake',
    email: 'n.drake@uncharted.com',
    membershipType: 'Basic',
    status: 'Inactive',
    joinedAt: '2026-04-01',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-15',
    name: 'Tony Stark',
    email: 'tony@starkindustries.com',
    membershipType: 'Enterprise',
    status: 'Inactive',
    joinedAt: '2025-08-20',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-16',
    name: 'Steve Rogers',
    email: 'cap@avengers.org',
    membershipType: 'Premium',
    status: 'Inactive',
    joinedAt: '2025-09-01',
    avatarUrl: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-17',
    name: 'Peter Parker',
    email: 'peter.parker@dailybugle.com',
    membershipType: 'Basic',
    status: 'Inactive',
    joinedAt: '2026-06-10',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-18',
    name: 'Bruce Banner',
    email: 'banner@avengers.org',
    membershipType: 'Basic',
    status: 'Inactive',
    joinedAt: '2026-04-12',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-19',
    name: 'Clark Kent',
    email: 'clark.kent@dailyplanet.com',
    membershipType: 'Basic',
    status: 'Inactive',
    joinedAt: '2026-03-01',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 'm-20',
    name: 'Selina Kyle',
    email: 'selina@gotham.com',
    membershipType: 'Premium',
    status: 'Inactive',
    joinedAt: '2026-02-14',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  }
];
