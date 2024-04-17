export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName?: string;
  role?: string;
  avatar?: string;
  creationAt?: string;
  updatedAt?: string;
};

export type UpdatedUser = {
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
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
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type AuthTokens = {
  token: string;
  refresh_token?: string;
};
