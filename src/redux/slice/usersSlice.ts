import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from '@interfaces/index';
import {
  fetchUserProfile,
  fetchUserById,
  updateUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
} from '@thunk/usersThunks';

const initialState: UsersState = {
  users: [],
  currentUser: null,
  searchResults: [],
  isLoading: false,
  isUpdating: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentUser: state => {
      state.currentUser = null;
    },
    clearSearchResults: state => {
      state.searchResults = [];
    },
    resetUsers: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to fetch user profile';
      })
      .addCase(fetchUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to fetch user';
      })
      .addCase(updateUserProfile.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.currentUser = action.payload;
        const index = state.users.findIndex(
          user => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          (action.payload as any)?.message || 'Failed to update profile';
      })
      .addCase(searchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
        state.error = null;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to search users';
      })
      .addCase(followUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to follow user';
      })
      .addCase(unfollowUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to unfollow user';
      });
  },
});

export const { clearError, clearCurrentUser, clearSearchResults, resetUsers } =
  usersSlice.actions;
export default usersSlice.reducer;
