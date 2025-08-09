import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from '@interfaces/index';
import {
  fetchUsers,
  fetchUserById,
  updateUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
} from '@thunk/usersThunks';

const initialState: UsersState = {
  users: [],
  currentUser: null,
  isLoading: false,
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
    reset: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to fetch users';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
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
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to update profile';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(followUser.fulfilled, state => {
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, state => {
        state.error = null;
      });
  },
});

export const { clearError, clearCurrentUser, reset } = usersSlice.actions;
export default usersSlice.reducer;
