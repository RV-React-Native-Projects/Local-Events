import { PaginationResponse } from './api';
import { User } from './auth';

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  membersCount?: number;
  createdAt: string;
}

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  role: 'admin' | 'member';
  joinedAt: string;
  user: User;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
}

export interface UpdateGroupRequest {
  name?: string;
  description?: string;
}

export interface GroupsState {
  groups: Group[];
  currentGroup: Group | null;
  searchResults: Group[];
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  pagination: PaginationResponse;
}
