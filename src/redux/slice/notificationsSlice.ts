import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState, Notification } from '@interfaces/index';
import {
  getUserNotifications,
  getUnreadNotifications,
  getNotificationCount,
  createNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '@thunk/notificationsThunks';

const initialState: NotificationsState = {
  notifications: [],
  unreadNotifications: [],
  unreadCount: 0,
  isLoading: false,
  isCreating: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearNotifications: state => {
      state.notifications = [];
    },
    clearUnreadNotifications: state => {
      state.unreadNotifications = [];
    },
    resetNotifications: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getUserNotifications.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
        state.error = null;
      })
      .addCase(getUserNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to get notifications';
      })
      .addCase(getUnreadNotifications.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUnreadNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unreadNotifications = action.payload;
        state.error = null;
      })
      .addCase(getUnreadNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to get unread notifications';
      })
      .addCase(getNotificationCount.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNotificationCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unreadCount = action.payload.count;
        state.error = null;
      })
      .addCase(getNotificationCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to get notification count';
      })
      .addCase(createNotification.pending, state => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isCreating = false;
        state.notifications.unshift(action.payload);
        state.error = null;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isCreating = false;
        state.error =
          (action.payload as any)?.message || 'Failed to create notification';
      })
      .addCase(markNotificationAsRead.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to mark notification as read';
      })
      .addCase(markAllNotificationsAsRead.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, state => {
        state.isLoading = false;
        state.unreadCount = 0;
        state.unreadNotifications = [];
        state.error = null;
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to mark all notifications as read';
      })
      .addCase(deleteNotification.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = state.notifications.filter(
          notification => notification.id !== action.payload,
        );
        state.unreadNotifications = state.unreadNotifications.filter(
          (notification: Notification) => notification.id !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to delete notification';
      });
  },
});

export const {
  clearError,
  clearNotifications,
  clearUnreadNotifications,
  resetNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
