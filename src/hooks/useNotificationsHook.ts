import { useSelector, useDispatch } from 'react-redux';
import { NotificationRequest, PaginationParams } from '@interfaces/index';
import { RootState, AppDispatch } from '@redux/store';
import {
  clearError,
  clearNotifications,
  clearUnreadNotifications,
  resetNotifications,
} from '@slice/notificationsSlice';
import {
  getUserNotifications,
  getUnreadNotifications,
  getNotificationCount,
  createNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '@thunk/notificationsThunks';

export const useNotificationsHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    notifications,
    unreadNotifications,
    unreadCount,
    isLoading,
    isCreating,
    error,
    pagination,
  } = useSelector((state: RootState) => state.notifications);

  const getUserNotificationsAction = async (
    userId: string & PaginationParams,
  ) => {
    return await dispatch(getUserNotifications(userId));
  };

  const getUnreadNotificationsAction = async (
    userId: string & PaginationParams,
  ) => {
    return await dispatch(getUnreadNotifications(userId));
  };

  const getNotificationCountAction = async (userId: string) => {
    return await dispatch(getNotificationCount(userId));
  };

  const createNotificationAction = async (
    notificationData: NotificationRequest,
  ) => {
    return await dispatch(createNotification(notificationData));
  };

  const markNotificationAsReadAction = async (notificationId: string) => {
    return await dispatch(markNotificationAsRead(notificationId));
  };

  const markAllNotificationsAsReadAction = async (userId: string) => {
    return await dispatch(markAllNotificationsAsRead(userId));
  };

  const deleteNotificationAction = async (notificationId: string) => {
    return await dispatch(deleteNotification(notificationId));
  };

  const clearNotificationsError = () => {
    dispatch(clearError());
  };

  const clearNotificationsData = () => {
    dispatch(clearNotifications());
  };

  const clearUnreadNotificationsData = () => {
    dispatch(clearUnreadNotifications());
  };

  const resetNotificationsData = () => {
    dispatch(resetNotifications());
  };

  return {
    notifications,
    unreadNotifications,
    unreadCount,
    isLoading,
    isCreating,
    error,
    pagination,
    getUserNotificationsAction,
    getUnreadNotificationsAction,
    getNotificationCountAction,
    createNotificationAction,
    markNotificationAsReadAction,
    markAllNotificationsAsReadAction,
    deleteNotificationAction,
    clearNotificationsError,
    clearNotificationsData,
    clearUnreadNotificationsData,
    resetNotificationsData,
  };
};
