import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  OAuthRequest,
  User,
  ApiResponse,
} from '@interfaces/index';
import SecureStorage from '@storage/SecureStorage';
import { NetworkManager, authPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await server.post<ApiResponse<AuthResponse>>(
        authPaths.login,
        { email, password },
      );
      console.log('✅ loginUser called!');
      await SecureStorage.setItem(
        'USER-TOKEN',
        response.data.data!.accessToken,
      );
      await SecureStorage.setItem(
        'USER-REFRESH-TOKEN',
        response.data.data!.refreshToken,
      );
      return response.data.data! as AuthResponse;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in loginUser:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const registerUser = createAsyncThunk<AuthResponse, RegisterRequest>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await server.post<ApiResponse<AuthResponse>>(
        authPaths.register,
        userData,
      );
      console.log('✅ registerUser called!');
      await SecureStorage.setItem(
        'USER-TOKEN',
        response.data.data!.accessToken,
      );
      await SecureStorage.setItem(
        'USER-REFRESH-TOKEN',
        response.data.data!.refreshToken,
      );
      return response.data.data! as AuthResponse;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in registerUser:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const oauthLogin = createAsyncThunk<AuthResponse, OAuthRequest>(
  'auth/oauthLogin',
  async (oauthData, { rejectWithValue }) => {
    try {
      const response = await server.post<ApiResponse<AuthResponse>>(
        authPaths.oauth,
        {
          provider: oauthData.provider,
          providerAccountId: oauthData.providerAccountId,
          name: oauthData.name,
          email: oauthData.email,
          image: oauthData.image,
        },
      );
      console.log('✅ oauthLogin called!');
      await SecureStorage.setItem(
        'USER-TOKEN',
        response.data.data!.accessToken,
      );
      await SecureStorage.setItem(
        'USER-REFRESH-TOKEN',
        response.data.data!.refreshToken,
      );
      return response.data.data! as AuthResponse;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in oauthLogin:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const getCurrentUser = createAsyncThunk<User>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<{ user: User }>>(
        authPaths.me,
      );
      console.log('✅ getCurrentUser called!');
      return response.data.data!.user as User;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in getCurrentUser:',
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

export const refreshToken = createAsyncThunk<AuthResponse, string>(
  'auth/refreshToken',
  async (refreshTokenValue, { rejectWithValue }) => {
    try {
      const response = await server.post<ApiResponse<AuthResponse>>(
        authPaths.refresh,
        {
          refreshToken: refreshTokenValue,
        },
      );
      console.log('✅ refreshToken called!');
      await SecureStorage.setItem(
        'USER-TOKEN',
        response.data.data!.accessToken,
      );
      await SecureStorage.setItem(
        'USER-REFRESH-TOKEN',
        response.data.data!.refreshToken,
      );
      return response.data.data! as AuthResponse;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in refreshToken:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const logoutUser = createAsyncThunk<boolean>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = await SecureStorage.getItem(
        'USER-REFRESH-TOKEN',
      );
      if (refreshTokenValue) {
        await server.post<ApiResponse<null>>(authPaths.logout, {
          refreshToken: refreshTokenValue,
        });
      }
      await SecureStorage.removeItem('USER-TOKEN');
      await SecureStorage.removeItem('USER-REFRESH-TOKEN');
      console.log('✅ logoutUser called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in logoutUser:', JSON.stringify(error, null, 2));
      await SecureStorage.removeItem('USER-TOKEN');
      await SecureStorage.removeItem('USER-REFRESH-TOKEN');
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const logoutAllDevices = createAsyncThunk<boolean>(
  'auth/logoutAllDevices',
  async (_, { rejectWithValue }) => {
    try {
      await server.post<ApiResponse<null>>(authPaths.logoutAll, {});
      await SecureStorage.removeItem('USER-TOKEN');
      await SecureStorage.removeItem('USER-REFRESH-TOKEN');
      console.log('✅ logoutAllDevices called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in logoutAllDevices:',
        JSON.stringify(error, null, 2),
      );
      await SecureStorage.removeItem('USER-TOKEN');
      await SecureStorage.removeItem('USER-REFRESH-TOKEN');
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);
