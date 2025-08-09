import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  Event,
  CreateEventRequest,
  UpdateEventRequest,
  ApiResponse,
  PaginationParams,
} from '@interfaces/index';
import { NetworkManager, eventPaths, baseURL } from '@network';

const server = new NetworkManager(baseURL);

export const fetchEvents = createAsyncThunk<Event[], PaginationParams>(
  'events/fetchEvents',
  async (params, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<Event[]>>(
        eventPaths.events,
        { params },
      );
      console.log('✅ fetchEvents called!');
      return response.data.data! as Event[];
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in fetchEvents:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const searchEvents = createAsyncThunk<
  Event[],
  { query: string } & PaginationParams
>('events/searchEvents', async (params, { rejectWithValue }) => {
  try {
    const response = await server.get<ApiResponse<Event[]>>(eventPaths.search, {
      params,
    });
    console.log('✅ searchEvents called!');
    return response.data.data! as Event[];
  } catch (error) {
    const err = error as AxiosError;
    console.log('❌ Error in searchEvents:', JSON.stringify(error, null, 2));
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const fetchEventById = createAsyncThunk<Event, string>(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await server.get<ApiResponse<{ event: Event }>>(
        eventPaths.byId(eventId),
      );
      console.log('✅ fetchEventById called!');
      return response.data.data!.event as Event;
    } catch (error) {
      const err = error as AxiosError;
      console.log(
        '❌ Error in fetchEventById:',
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

export const createEvent = createAsyncThunk<Event, CreateEventRequest>(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await server.post<ApiResponse<{ event: Event }>>(
        eventPaths.create,
        eventData,
      );
      console.log('✅ createEvent called!');
      return response.data.data!.event as Event;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in createEvent:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const updateEvent = createAsyncThunk<
  Event,
  { id: string; data: UpdateEventRequest }
>('events/updateEvent', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await server.put<ApiResponse<{ event: Event }>>(
      eventPaths.update(id),
      data,
    );
    console.log('✅ updateEvent called!');
    return response.data.data!.event as Event;
  } catch (error) {
    const err = error as AxiosError;
    console.log('❌ Error in updateEvent:', JSON.stringify(error, null, 2));
    return rejectWithValue({
      message: err.message || 'Something went wrong',
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
});

export const deleteEvent = createAsyncThunk<string, string>(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(eventPaths.delete(eventId));
      console.log('✅ deleteEvent called!');
      return eventId;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in deleteEvent:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const joinEvent = createAsyncThunk<boolean, string>(
  'events/joinEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await server.post<ApiResponse<null>>(eventPaths.join(eventId), {});
      console.log('✅ joinEvent called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in joinEvent:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);

export const leaveEvent = createAsyncThunk<boolean, string>(
  'events/leaveEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await server.delete<ApiResponse<null>>(eventPaths.leave(eventId));
      console.log('✅ leaveEvent called!');
      return true;
    } catch (error) {
      const err = error as AxiosError;
      console.log('❌ Error in leaveEvent:', JSON.stringify(error, null, 2));
      return rejectWithValue({
        message: err.message || 'Something went wrong',
        code: err.code,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  },
);
