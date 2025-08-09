import { useSelector } from 'react-redux';
import { UpdateUserRequest, PaginationParams } from '@interfaces/index';
import { useAppDispatch } from '@redux/hooks';
import { RootState } from '@redux/store';
import { clearError, clearCurrentUser, reset } from '@slice/usersSlice';
import {
  fetchUsers,
  fetchUserById,
  updateUserProfile,
  searchUsers,
  followUser,
  unfollowUser,
} from '@thunk/usersThunks';

export const useUsersHook = () => {
  const dispatch = useAppDispatch();
  const usersState = useSelector((state: RootState) => state.users);

  const getUsers = async (
    params: PaginationParams = { page: 1, limit: 10 },
  ) => {
    return await dispatch(fetchUsers(params));
  };

  const getUserById = async (userId: string) => {
    return await dispatch(fetchUserById(userId));
  };

  const updateProfile = async (userData: UpdateUserRequest) => {
    return await dispatch(updateUserProfile(userData));
  };

  const searchUsersData = async (
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

  const resetUsers = () => {
    dispatch(reset());
  };

  return {
    ...usersState,
    getUsers,
    getUserById,
    updateProfile,
    searchUsersData,
    followUserAction,
    unfollowUserAction,
    clearUsersError,
    clearCurrentUserData,
    resetUsers,
  };
};
