import { PaginationResponse } from './api';

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  membersCount?: number;
  createdAt: string;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
}

export interface GroupsState {
  groups: Group[];
  currentGroup: Group | null;
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  pagination: PaginationResponse;
}
