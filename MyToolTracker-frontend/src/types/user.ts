import { UserRole } from './userRole';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole; // enum UserRole: ADMIN, USER
}
