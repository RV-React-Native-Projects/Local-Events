import { createSlice } from '@reduxjs/toolkit';
import { SocialState } from '@interfaces/index';
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  checkFollowStatus,
} from '@thunk/socialThunks';

const initialState: SocialState = {
  followers: [],
  following: [],
  isLoading: false,
  error: null,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearFollowers: state => {
      state.followers = [];
    },
    clearFollowing: state => {
      state.following = [];
    },
    resetSocial: () => initialState,
  },
  extraReducers: builder => {
    builder
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
      })
      .addCase(getFollowers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followers = action.payload;
        state.error = null;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to get followers';
      })
      .addCase(getFollowing.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following = action.payload;
        state.error = null;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to get following';
      })
      .addCase(checkFollowStatus.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkFollowStatus.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkFollowStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to check follow status';
      });
  },
});

export const { clearError, clearFollowers, clearFollowing, resetSocial } =
  socialSlice.actions;
export default socialSlice.reducer;
