export class User {
  id?: number;
  email: string;
  name: string;
  password?: string;
  role?: Role;
}

export type Role = 'ADMIN' | 'USER';
