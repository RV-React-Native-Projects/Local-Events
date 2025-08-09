import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  User,
  UpdateUserRequest,
  ApiResponse,
  PaginationParams,
} from '@interfaces/index';
import { NetworkManager, userPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const fetchUserProfile = createAsyncThunk<User>(
  'users/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<{ user: User }>>(
        userPaths.profile,
      );
      console.log('✅ fetchUserProfile called!');
      return response.data.data!.user as User;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in fetchUserProfile:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const fetchUserById = createAsyncThunk<User, string>(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<{ user: User }>>(
        userPaths.byId(userId),
      );
      console.log('✅ fetchUserById called!');
      return response.data.data!.user as User;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in fetchUserById:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const updateUserProfile = createAsyncThunk<User, UpdateUserRequest>(
  'users/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await server.put<ApiResponse<{ user: User }>>(
        userPaths.updateProfile,
        userData,
      );
      console.log('✅ updateUserProfile called!');
      return response.data.data!.user as User;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in updateUserProfile:',
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

export const searchUsers = createAsyncThunk<
  User[],
  { query: string } & PaginationParams
>('users/searchUsers', async (params, { rejectWithValue }) => {
  try {
    const response = await server.get<ApiResponse<User[]>>(
      userPaths.search,
      { params },
    );
    console.log('✅ searchUsers called!');
    return response.data.data! as User[];
  } catch (error) {
    const err = error as AxiosError;
    console.log('❌ Error in searchUsers:', JSON.stringify(error, null, 2));
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const followUser = createAsyncThunk<boolean, string>(
  'users/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      await server.post<ApiResponse<null>>(userPaths.follow(userId), {});
      console.log('✅ followUser called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in followUser:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const unfollowUser = createAsyncThunk<boolean, string>(
  'users/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(userPaths.unfollow(userId));
      console.log('✅ unfollowUser called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in unfollowUser:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);