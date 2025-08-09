import { useSelector, useDispatch } from 'react-redux';
import {
  CreateVerificationRequest,
  UpdateVerificationRequest,
  PaginationParams,
} from '@interfaces/index';
import { RootState, AppDispatch } from '@redux/store';
import {
  clearError,
  clearCurrentRequest,
  clearPendingRequests,
  resetVerification,
} from '@slice/verificationSlice';
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

export const useVerificationHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    verificationRequests,
    currentRequest,
    pendingRequests,
    isLoading,
    isCreating,
    isUpdating,
    error,
    pagination,
  } = useSelector((state: RootState) => state.verification);

  const getAllVerificationRequestsAction = async (params: PaginationParams) => {
    return await dispatch(getAllVerificationRequests(params));
  };

  const getPendingVerificationRequestsAction = async (
    params: PaginationParams,
  ) => {
    return await dispatch(getPendingVerificationRequests(params));
  };

  const getUserVerificationRequestsAction = async (
    userId: string & PaginationParams,
  ) => {
    return await dispatch(getUserVerificationRequests(userId));
  };

  const createVerificationRequestAction = async (
    requestData: CreateVerificationRequest,
  ) => {
    return await dispatch(createVerificationRequest(requestData));
  };

  const updateVerificationRequestAction = async (
    id: string,
    data: UpdateVerificationRequest,
  ) => {
    return await dispatch(updateVerificationRequest({ id, data }));
  };

  const approveVerificationRequestAction = async (
    id: string,
    reviewerId: string,
    notes?: string,
  ) => {
    return await dispatch(
      approveVerificationRequest({ id, reviewerId, notes }),
    );
  };

  const rejectVerificationRequestAction = async (
    id: string,
    reviewerId: string,
    notes?: string,
  ) => {
    return await dispatch(rejectVerificationRequest({ id, reviewerId, notes }));
  };

  const deleteVerificationRequestAction = async (requestId: string) => {
    return await dispatch(deleteVerificationRequest(requestId));
  };

  const clearVerificationError = () => {
    dispatch(clearError());
  };

  const clearCurrentRequestData = () => {
    dispatch(clearCurrentRequest());
  };

  const clearPendingRequestsData = () => {
    dispatch(clearPendingRequests());
  };

  const resetVerificationData = () => {
    dispatch(resetVerification());
  };

  return {
    verificationRequests,
    currentRequest,
    pendingRequests,
    isLoading,
    isCreating,
    isUpdating,
    error,
    pagination,
    getAllVerificationRequestsAction,
    getPendingVerificationRequestsAction,
    getUserVerificationRequestsAction,
    createVerificationRequestAction,
    updateVerificationRequestAction,
    approveVerificationRequestAction,
    rejectVerificationRequestAction,
    deleteVerificationRequestAction,
    clearVerificationError,
    clearCurrentRequestData,
    clearPendingRequestsData,
    resetVerificationData,
  };
};
