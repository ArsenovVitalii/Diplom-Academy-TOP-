// User types
export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
