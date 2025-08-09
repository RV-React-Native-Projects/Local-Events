import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  VerificationRequest,
  CreateVerificationRequest,
  UpdateVerificationRequest,
  ApiResponse,
  PaginationParams,
} from '@interfaces/index';
import { NetworkManager, verificationPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const getAllVerificationRequests = createAsyncThunk<
  VerificationRequest[],
  PaginationParams
>(
  'verification/getAllVerificationRequests',
  async (params, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<VerificationRequest[]>>(
        verificationPaths.getAll,
        { params },
      );
      console.log('✅ getAllVerificationRequests called!');
      return response.data.data! as VerificationRequest[];
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in getAllVerificationRequests:',
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

export const getPendingVerificationRequests = createAsyncThunk<
  VerificationRequest[],
  PaginationParams
>(
  'verification/getPendingVerificationRequests',
  async (params, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<VerificationRequest[]>>(
        verificationPaths.getPending,
        { params },
      );
      console.log('✅ getPendingVerificationRequests called!');
      return response.data.data! as VerificationRequest[];
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in getPendingVerificationRequests:',
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

export const getUserVerificationRequests = createAsyncThunk<
  VerificationRequest[],
  string & PaginationParams
>(
  'verification/getUserVerificationRequests',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<VerificationRequest[]>>(
        verificationPaths.getByUserId(userId),
      );
      console.log('✅ getUserVerificationRequests called!');
      return response.data.data! as VerificationRequest[];
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in getUserVerificationRequests:',
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

export const createVerificationRequest = createAsyncThunk<
  VerificationRequest,
  CreateVerificationRequest
>(
  'verification/createVerificationRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await server.post<
        ApiResponse<{ verificationRequest: VerificationRequest }>
      >(verificationPaths.submit, requestData);
      console.log('✅ createVerificationRequest called!');
      return response.data.data!.verificationRequest as VerificationRequest;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in createVerificationRequest:',
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

export const updateVerificationRequest = createAsyncThunk<
  VerificationRequest,
  { id: string; data: UpdateVerificationRequest }
>(
  'verification/updateVerificationRequest',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await server.put<
        ApiResponse<{ verificationRequest: VerificationRequest }>
      >(verificationPaths.approve(id), data);
      console.log('✅ updateVerificationRequest called!');
      return response.data.data!.verificationRequest as VerificationRequest;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in updateVerificationRequest:',
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

export const approveVerificationRequest = createAsyncThunk<
  VerificationRequest,
  { id: string; reviewerId: string; notes?: string }
>(
  'verification/approveVerificationRequest',
  async ({ id, reviewerId, notes }, { rejectWithValue }) => {
    try {
      const response = await server.put<
        ApiResponse<{ verificationRequest: VerificationRequest }>
      >(verificationPaths.approve(id), { reviewerId, notes });
      console.log('✅ approveVerificationRequest called!');
      return response.data.data!.verificationRequest as VerificationRequest;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in approveVerificationRequest:',
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

export const rejectVerificationRequest = createAsyncThunk<
  VerificationRequest,
  { id: string; reviewerId: string; notes?: string }
>(
  'verification/rejectVerificationRequest',
  async ({ id, reviewerId, notes }, { rejectWithValue }) => {
    try {
      const response = await server.put<
        ApiResponse<{ verificationRequest: VerificationRequest }>
      >(verificationPaths.reject(id), { reviewerId, notes });
      console.log('✅ rejectVerificationRequest called!');
      return response.data.data!.verificationRequest as VerificationRequest;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in rejectVerificationRequest:',
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

export const deleteVerificationRequest = createAsyncThunk<string, string>(
  'verification/deleteVerificationRequest',
  async (requestId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(
        verificationPaths.delete(requestId),
      );
      console.log('✅ deleteVerificationRequest called!');
      return requestId;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in deleteVerificationRequest:',
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
