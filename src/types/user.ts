export type User = {
  id?: number;
  email: string;
  password: string;
  name?: string;
  role?: string;
  avatar?: string;
};

export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  name: string;
  avatar?: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};
