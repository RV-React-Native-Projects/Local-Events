import { createSlice } from '@reduxjs/toolkit';
import { VerificationState, VerificationRequest } from '@interfaces/index';
import {
  getAllVerificationRequests,
  getPendingVerificationRequests,
  getUserVerificationRequests,
  createVerificationRequest,
  updateVerificationRequest,
  approveVerificationRequest,
  rejectVerificationRequest,
  deleteVerificationRequest,
} from '@thunk/verificationThunks';

const initialState: VerificationState = {
  verificationRequests: [],
  currentRequest: null,
  pendingRequests: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentRequest: state => {
      state.currentRequest = null;
    },
    clearPendingRequests: state => {
      state.pendingRequests = [];
    },
    resetVerification: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getAllVerificationRequests.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllVerificationRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationRequests = action.payload;
        state.error = null;
      })
      .addCase(getAllVerificationRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to get verification requests';
      })
      .addCase(getPendingVerificationRequests.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPendingVerificationRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingRequests = action.payload;
        state.error = null;
      })
      .addCase(getPendingVerificationRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message || 'Failed to get pending requests';
      })
      .addCase(getUserVerificationRequests.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserVerificationRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationRequests = action.payload;
        state.error = null;
      })
      .addCase(getUserVerificationRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to get user verification requests';
      })
      .addCase(createVerificationRequest.pending, state => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createVerificationRequest.fulfilled, (state, action) => {
        state.isCreating = false;
        state.verificationRequests.unshift(action.payload);
        state.error = null;
      })
      .addCase(createVerificationRequest.rejected, (state, action) => {
        state.isCreating = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to create verification request';
      })
      .addCase(updateVerificationRequest.pending, state => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateVerificationRequest.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.verificationRequests.findIndex(
          request => request.id === action.payload.id,
        );
        if (index !== -1) {
          state.verificationRequests[index] = action.payload;
        }
        if (state.currentRequest?.id === action.payload.id) {
          state.currentRequest = action.payload;
        }
        state.error = null;
      })
      .addCase(updateVerificationRequest.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to update verification request';
      })
      .addCase(approveVerificationRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveVerificationRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.verificationRequests.findIndex(
          request => request.id === action.payload.id,
        );
        if (index !== -1) {
          state.verificationRequests[index] = action.payload;
        }
        state.pendingRequests = state.pendingRequests.filter(
          request => request.id !== action.payload.id,
        );
        state.error = null;
      })
      .addCase(approveVerificationRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to approve verification request';
      })
      .addCase(rejectVerificationRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(rejectVerificationRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.verificationRequests.findIndex(
          request => request.id === action.payload.id,
        );
        if (index !== -1) {
          state.verificationRequests[index] = action.payload;
        }
        state.pendingRequests = state.pendingRequests.filter(
          request => request.id !== action.payload.id,
        );
        state.error = null;
      })
      .addCase(rejectVerificationRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to reject verification request';
      })
      .addCase(deleteVerificationRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVerificationRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verificationRequests = state.verificationRequests.filter(
          (request: VerificationRequest) => request.id !== action.payload,
        );
        state.pendingRequests = state.pendingRequests.filter(
          (request: VerificationRequest) => request.id !== action.payload,
        );
        if (state.currentRequest?.id === action.payload) {
          state.currentRequest = null;
        }
        state.error = null;
      })
      .addCase(deleteVerificationRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as any)?.message ||
          'Failed to delete verification request';
      });
  },
});

export const {
  clearError,
  clearCurrentRequest,
  clearPendingRequests,
  resetVerification,
} = verificationSlice.actions;
export default verificationSlice.reducer;
