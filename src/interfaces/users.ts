import { PaginationResponse } from './api';
import { User } from './auth';

export interface UserProfile extends User {
  eventsCount?: number;
  followersCount?: number;
  followingCount?: number;
}

export interface UpdateUserRequest {
  name?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface UsersState {
  users: UserProfile[];
  currentUser: UserProfile | null;
  searchResults: UserProfile[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  pagination: PaginationResponse;
}
