export interface Notification {
  id: string;
  userId: string;
  content: string;
  read: boolean;
  type:
    | 'event_invite'
    | 'follow'
    | 'group_invite'
    | 'event_reminder'
    | 'general';
  relatedId?: string;
  createdAt: string;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}
