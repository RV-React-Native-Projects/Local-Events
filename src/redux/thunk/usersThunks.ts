import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  UserProfile,
  UpdateUserRequest,
  ApiResponse,
  PaginationParams,
} from '@interfaces/index';
import { NetworkManager, userPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const fetchUsers = createAsyncThunk<UserProfile[], PaginationParams>(
  'users/fetchUsers',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<UserProfile[]>>(
        `${userPaths.profile}?page=${page}&limit=${limit}`,
      );
      console.log('✅ fetchUsers called!');
      return response.data.data! as UserProfile[];
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in fetchUsers:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const fetchUserById = createAsyncThunk<UserProfile, string>(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<UserProfile>>(
        userPaths.byId(userId),
      );
      console.log('✅ fetchUserById called!');
      return response.data.data! as UserProfile;
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

export const updateUserProfile = createAsyncThunk<
  UserProfile,
  UpdateUserRequest
>('users/updateUserProfile', async (userData, { rejectWithValue }) => {
  try {
    const response = await server.put<ApiResponse<UserProfile>>(
      userPaths.updateProfile,
      userData,
    );
    console.log('✅ updateUserProfile called!');
    return response.data.data! as UserProfile;
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
});

export const searchUsers = createAsyncThunk<
  UserProfile[],
  { query: string } & PaginationParams
>(
  'users/searchUsers',
  async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<UserProfile[]>>(
        `${userPaths.search}?q=${encodeURIComponent(
          query,
        )}&page=${page}&limit=${limit}`,
      );
      console.log('✅ searchUsers called!');
      return response.data.data! as UserProfile[];
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
  },
);

export const followUser = createAsyncThunk<{ userId: string }, string>(
  'users/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      await server.post<ApiResponse<null>>(userPaths.follow(userId), {});
      console.log('✅ followUser called!');
      return { userId };
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

export const unfollowUser = createAsyncThunk<{ userId: string }, string>(
  'users/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(userPaths.unfollow(userId));
      console.log('✅ unfollowUser called!');
      return { userId };
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
