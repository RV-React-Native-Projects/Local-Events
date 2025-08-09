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

export interface NotificationRequest {
  userId: string;
  content: string;
  type:
    | 'event_invite'
    | 'follow'
    | 'group_invite'
    | 'event_reminder'
    | 'general';
  relatedId?: string;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadNotifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
