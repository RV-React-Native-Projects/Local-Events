import { useSelector, useDispatch } from 'react-redux';
import { UpdateUserRequest, PaginationParams } from '@interfaces/index';
import { RootState, AppDispatch } from '@redux/store';
import {
  clearError,
  clearCurrentUser,
  clearSearchResults,
} from '@slice/usersSlice';
import {
  fetchUserProfile,
  fetchUserById,
  updateUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
} from '@thunk/usersThunks';

export const useUsersHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    users,
    currentUser,
    searchResults,
    isLoading,
    isUpdating,
    error,
    pagination,
  } = useSelector((state: RootState) => state.users);

  const getUserProfile = async () => {
    return await dispatch(fetchUserProfile());
  };

  const getUserById = async (userId: string) => {
    return await dispatch(fetchUserById(userId));
  };

  const updateProfile = async (userData: UpdateUserRequest) => {
    return await dispatch(updateUserProfile(userData));
  };

  const searchUsersAction = async (
    params: { query: string } & PaginationParams,
  ) => {
    return await dispatch(searchUsers(params));
  };

  const followUserAction = async (userId: string) => {
    return await dispatch(followUser(userId));
  };

  const unfollowUserAction = async (userId: string) => {
    return await dispatch(unfollowUser(userId));
  };

  const clearUsersError = () => {
    dispatch(clearError());
  };

  const clearCurrentUserData = () => {
    dispatch(clearCurrentUser());
  };

  const clearSearchResultsData = () => {
    dispatch(clearSearchResults());
  };

  return {
    users,
    currentUser,
    searchResults,
    isLoading,
    isUpdating,
    error,
    pagination,
    getUserProfile,
    getUserById,
    updateProfile,
    searchUsersAction,
    followUserAction,
    unfollowUserAction,
    clearUsersError,
    clearCurrentUserData,
    clearSearchResultsData,
  };
};
