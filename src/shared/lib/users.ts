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

export const users: User[] = [
  {
    email: 'user@test.ru',
    password: '$2b$10$ITgiyVhiB6VC.CEiBhiLUu5zk9mD2Ifn./mZKftYgfS15B46W7Tpq',
    role: [ Role.USER ],
    id: '83083534-fd46-44c0-bcf7-9de08cdf309f'
  },
  {
    email: 'hr@test.ru',
    password: '$2b$10$ITgiyVhiB6VC.CEiBhiLUu5zk9mD2Ifn./mZKftYgfS15B46W7Tpq',
    role: [ Role.HR ],
    id: '104e63c7-4d95-4a4e-97b8-aa8155a9a272'
  },
];