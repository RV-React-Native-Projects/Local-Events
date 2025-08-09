export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  bio?: string;
  image?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  username?: string;
  bio?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface OAuthRequest {
  provider: 'google' | 'facebook' | 'apple';
  providerAccountId: string;
  name: string;
  email: string;
  image?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}
