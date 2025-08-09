import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  Group,
  CreateGroupRequest,
  UpdateGroupRequest,
  ApiResponse,
  PaginationParams,
} from '@interfaces/index';
import { NetworkManager, groupPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const fetchGroups = createAsyncThunk<
  ApiResponse<Group[]>,
  PaginationParams
>(
  'groups/fetchGroups',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<Group[]>>(
        `${groupPaths.groups}?page=${page}&limit=${limit}`,
      );
      console.log('✅ fetchGroups called!');
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in fetchGroups:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Failed to fetch groups',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const searchGroups = createAsyncThunk<
  Group[],
  { query: string } & PaginationParams
>(
  'groups/searchGroups',
  async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<Group[]>>(
        `${groupPaths.search}?q=${encodeURIComponent(
          query,
        )}&page=${page}&limit=${limit}`,
      );
      console.log('✅ searchGroups called!');
      return response.data.data! as Group[];
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in searchGroups:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const fetchGroupById = createAsyncThunk<Group, string>(
  'groups/fetchGroupById',
  async (groupId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<Group>>(
        groupPaths.byId(groupId),
      );
      console.log('✅ fetchGroupById called!');
      return response.data.data! as Group;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in fetchGroupById:',
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

export const createGroup = createAsyncThunk<Group, CreateGroupRequest>(
  'groups/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await server.post<ApiResponse<Group>>(
        groupPaths.create,
        groupData,
      );
      console.log('✅ createGroup called!');
      return response.data.data! as Group;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in createGroup:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const updateGroup = createAsyncThunk<
  Group,
  { groupId: string; groupData: UpdateGroupRequest }
>('groups/updateGroup', async ({ groupId, groupData }, { rejectWithValue }) => {
  try {
    const response = await server.put<ApiResponse<Group>>(
      groupPaths.update(groupId),
      groupData,
    );
    console.log('✅ updateGroup called!');
    return response.data.data! as Group;
  } catch (error) {
    const err = error as AxiosError;
    console.log('❌ Error in updateGroup:', JSON.stringify(error, null, 2));
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const deleteGroup = createAsyncThunk<string, string>(
  'groups/deleteGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(groupPaths.delete(groupId));
      console.log('✅ deleteGroup called!');
      return groupId;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in deleteGroup:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const joinGroup = createAsyncThunk<
  { groupId: string; data: any },
  string
>('groups/joinGroup', async (groupId, { rejectWithValue }) => {
  try {
    const response = await server.post<ApiResponse<any>>(
      groupPaths.join(groupId),
      {},
    );
    console.log('✅ joinGroup called!');
    return { groupId, data: response.data.data! };
  } catch (error) {
    const err = error as AxiosError;
    console.log('❌ Error in joinGroup:', JSON.stringify(error, null, 2));
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const leaveGroup = createAsyncThunk<string, string>(
  'groups/leaveGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(groupPaths.leave(groupId));
      console.log('✅ leaveGroup called!');
      return groupId;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in leaveGroup:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);
