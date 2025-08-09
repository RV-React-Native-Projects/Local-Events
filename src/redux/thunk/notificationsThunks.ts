import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  Notification,
  NotificationRequest,
  ApiResponse,
  PaginationParams,
} from '@interfaces/index';
import { NetworkManager, notificationPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const getUserNotifications = createAsyncThunk<
  Notification[],
  string & PaginationParams
>('notifications/getUserNotifications', async (userId, { rejectWithValue }) => {
  try {
    const response = await server.get<ApiResponse<Notification[]>>(
      notificationPaths.userNotifications(userId),
    );
    console.log('✅ getUserNotifications called!');
    return response.data.data! as Notification[];
  } catch (error) {
    const err = error as AxiosError;
    console.log(
      '❌ Error in getUserNotifications:',
      JSON.stringify(error, null, 2),
    );
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const getUnreadNotifications = createAsyncThunk<
  Notification[],
  string & PaginationParams
>(
  'notifications/getUnreadNotifications',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<Notification[]>>(
        notificationPaths.unreadNotifications(userId),
      );
      console.log('✅ getUnreadNotifications called!');
      return response.data.data! as Notification[];
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in getUnreadNotifications:',
        JSON.stringify(error, null, 2),
      );
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const getNotificationCount = createAsyncThunk<{ count: number }, string>(
  'notifications/getNotificationCount',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<{ count: number }>>(
        notificationPaths.notificationCount(userId),
      );
      console.log('✅ getNotificationCount called!');
      return response.data.data! as { count: number };
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in getNotificationCount:',
        JSON.stringify(error, null, 2),
      );
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const createNotification = createAsyncThunk<
  Notification,
  NotificationRequest
>(
  'notifications/createNotification',
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await server.post<
        ApiResponse<{ notification: Notification }>
      >(notificationPaths.create, notificationData);
      console.log('✅ createNotification called!');
      return response.data.data!.notification as Notification;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in createNotification:',
        JSON.stringify(error, null, 2),
      );
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const markNotificationAsRead = createAsyncThunk<boolean, string>(
  'notifications/markNotificationAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      await server.put<ApiResponse<null>>(
        notificationPaths.markRead(notificationId),
        {},
      );
      console.log('✅ markNotificationAsRead called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in markNotificationAsRead:',
        JSON.stringify(error, null, 2),
      );
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const markAllNotificationsAsRead = createAsyncThunk<boolean, string>(
  'notifications/markAllNotificationsAsRead',
  async (userId, { rejectWithValue }) => {
    try {
      await server.put<ApiResponse<null>>(
        notificationPaths.markAllRead(userId),
        {},
      );
      console.log('✅ markAllNotificationsAsRead called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in markAllNotificationsAsRead:',
        JSON.stringify(error, null, 2),
      );
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const deleteNotification = createAsyncThunk<string, string>(
  'notifications/deleteNotification',
  async (notificationId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(
        notificationPaths.delete(notificationId),
      );
      console.log('✅ deleteNotification called!');
      return notificationId;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in deleteNotification:',
        JSON.stringify(error, null, 2),
      );
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);
