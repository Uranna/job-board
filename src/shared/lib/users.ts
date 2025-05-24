export enum Role {
  USER = 'USER',
  HR = 'HR',
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  avatarUrl?: string;
  phone?: string;
  birthday?: string;
  role?: Array<Role>;
}

export const users: User[] = [];