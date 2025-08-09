import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from '@interfaces/index';
import {
  fetchEvents,
  searchEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
} from '@thunk/eventsThunks';

const initialState: EventsState = {
  events: [],
  currentEvent: null,
  searchResults: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentEvent: state => {
      state.currentEvent = null;
    },
    clearSearchResults: state => {
      state.searchResults = [];
    },
    resetEvents: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to fetch events';
      })
      .addCase(searchEvents.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to search events';
      })
      .addCase(fetchEventById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEvent = action.payload;
        state.error = null;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to fetch event';
      })
      .addCase(createEvent.pending, state => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isCreating = false;
        state.events.unshift(action.payload);
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isCreating = false;
        state.error =
          (action.payload as any)?.message || 'Failed to create event';
      })
      .addCase(updateEvent.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.events.findIndex(
          event => event.id === action.payload.id,
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          (action.payload as any)?.message || 'Failed to update event';
      })
      .addCase(deleteEvent.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.events = state.events.filter(
          event => event.id !== action.payload,
        );
        if (state.currentEvent?.id === action.payload) {
          state.currentEvent = null;
        }
        state.error = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isDeleting = false;
        state.error =
          (action.payload as any)?.message || 'Failed to delete event';
      })
      .addCase(joinEvent.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinEvent.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(joinEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to join event';
      })
      .addCase(leaveEvent.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(leaveEvent.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(leaveEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to leave event';
      });
  },
});

export const {
  clearError,
  clearCurrentEvent,
  clearSearchResults,
  resetEvents,
} = eventsSlice.actions;
export default eventsSlice.reducer;
