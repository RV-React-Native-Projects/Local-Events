import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Follow, ApiResponse, PaginationParams } from '@interfaces/index';
import { NetworkManager, socialPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const followUser = createAsyncThunk<boolean, string>(
  'social/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      await server.post<ApiResponse<null>>(socialPaths.follow(userId), {});
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
  'social/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(socialPaths.unfollow(userId));
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

export const getFollowers = createAsyncThunk<
  Follow[],
  string & PaginationParams
>('social/getFollowers', async (userId, { rejectWithValue }) => {
  try {
    const response = await server.get<ApiResponse<Follow[]>>(
      socialPaths.followers(userId),
    );
    console.log('✅ getFollowers called!');
    return response.data.data! as Follow[];
  } catch (error) {
    const err = error as AxiosError;
    console.log('❌ Error in getFollowers:', JSON.stringify(error, null, 2));
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const getFollowing = createAsyncThunk<
  Follow[],
  string & PaginationParams
>('social/getFollowing', async (userId, { rejectWithValue }) => {
  try {
    const response = await server.get<ApiResponse<Follow[]>>(
      socialPaths.following(userId),
    );
    console.log('✅ getFollowing called!');
    return response.data.data! as Follow[];
  } catch (error) {
    const err = error as AxiosError;
    console.log('❌ Error in getFollowing:', JSON.stringify(error, null, 2));
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const checkFollowStatus = createAsyncThunk<boolean, string>(
  'social/checkFollowStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<{ isFollowing: boolean }>>(
        socialPaths.checkFollowStatus(userId),
      );
      console.log('✅ checkFollowStatus called!');
      return response.data.data!.isFollowing;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in checkFollowStatus:',
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
