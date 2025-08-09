import { User } from './auth';

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
  follower?: User;
  following?: User;
}

export interface SocialState {
  followers: Follow[];
  following: Follow[];
  isLoading: boolean;
  error: string | null;
}
