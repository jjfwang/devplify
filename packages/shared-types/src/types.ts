// User types
export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name?: string;
  email: string;
  role?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: string;
}

// Post types
export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  authorId?: string;
  content?: string;
  author?: User;
}

export interface CreatePostInput {
  title: string;
  content?: string;
  published?: boolean;
  authorId?: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  published?: boolean;
}

// Account types
export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

// Session types
export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// GraphQL types
export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

// Common utility types
export type Role = "USER" | "ADMIN" | "SUPERUSER";

export interface OrderByParams {
  field: string;
  direction: "asc" | "desc";
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: OrderByParams;
}

// Authentication types
export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}
