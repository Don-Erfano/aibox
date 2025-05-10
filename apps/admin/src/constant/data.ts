export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export const userData: User[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const roles: User['role'][] = ['admin', 'editor', 'viewer'];
  const statuses: User['status'][] = ['active', 'inactive', 'pending'];
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role: roles[id % roles.length],
    status: statuses[id % statuses.length],
    createdAt: new Date(2025, id % 12, (id % 28) + 1)
      .toISOString()
      .split('T')[0],
  };
});
