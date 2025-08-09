import { createSlice } from '@reduxjs/toolkit';
import { GroupsState } from '@interfaces/index';
import {
  fetchGroups,
  searchGroups,
  fetchGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
} from '../thunk/groupsThunks';

const initialState: GroupsState = {
  groups: [],
  currentGroup: null,
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

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentGroup: state => {
      state.currentGroup = null;
    },
    clearSearchResults: state => {
      state.searchResults = [];
    },
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGroups.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload.data!;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to fetch groups';
      })
      .addCase(searchGroups.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.currentGroup = action.payload;
      })
      .addCase(createGroup.pending, state => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isCreating = false;
        state.groups.unshift(action.payload);
        state.error = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isCreating = false;
        state.error =
          (action.payload as any)?.message || 'Failed to create group';
      })
      .addCase(updateGroup.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.groups.findIndex(
          group => group.id === action.payload.id,
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        if (state.currentGroup?.id === action.payload.id) {
          state.currentGroup = action.payload;
        }
        state.error = null;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          (action.payload as any)?.message || 'Failed to update group';
      })
      .addCase(deleteGroup.pending, state => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.groups = state.groups.filter(
          group => group.id !== action.payload,
        );
        if (state.currentGroup?.id === action.payload) {
          state.currentGroup = null;
        }
        state.error = null;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isDeleting = false;
        state.error =
          (action.payload as any)?.message || 'Failed to delete group';
      })
      .addCase(joinGroup.fulfilled, state => {
        state.error = null;
      })
      .addCase(leaveGroup.fulfilled, state => {
        state.error = null;
      });
  },
});

export const { clearError, clearCurrentGroup, clearSearchResults, reset } =
  groupsSlice.actions;
export default groupsSlice.reducer;
