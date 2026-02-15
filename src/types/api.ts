// Backend API types based on OpenAPI schema

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type?: string;
}

export interface UserResponse {
  email: string;
  username: string;
  id: string;
  role: "user" | "admin";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  email: string;
  username: string;
  password: string;
  role?: "user" | "admin";
}

export interface UserUpdate {
  email?: string | null;
  username?: string | null;
  password?: string | null;
  role?: "user" | "admin" | null;
  is_active?: boolean | null;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: any;
  ctx?: Record<string, any>;
}
