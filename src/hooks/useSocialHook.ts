import { useSelector, useDispatch } from 'react-redux';
import { PaginationParams } from '@interfaces/index';
import { RootState, AppDispatch } from '@redux/store';
import {
  clearError,
  clearFollowers,
  clearFollowing,
  resetSocial,
} from '@slice/socialSlice';
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  checkFollowStatus,
} from '@thunk/socialThunks';

export const useSocialHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { followers, following, isLoading, error } = useSelector(
    (state: RootState) => state.social,
  );

  const followUserAction = async (userId: string) => {
    return await dispatch(followUser(userId));
  };

  const unfollowUserAction = async (userId: string) => {
    return await dispatch(unfollowUser(userId));
  };

  const getFollowersAction = async (userId: string & PaginationParams) => {
    return await dispatch(getFollowers(userId));
  };

  const getFollowingAction = async (userId: string & PaginationParams) => {
    return await dispatch(getFollowing(userId));
  };

  const checkFollowStatusAction = async (userId: string) => {
    return await dispatch(checkFollowStatus(userId));
  };

  const clearSocialError = () => {
    dispatch(clearError());
  };

  const clearFollowersData = () => {
    dispatch(clearFollowers());
  };

  const clearFollowingData = () => {
    dispatch(clearFollowing());
  };

  const resetSocialData = () => {
    dispatch(resetSocial());
  };

  return {
    followers,
    following,
    isLoading,
    error,
    followUserAction,
    unfollowUserAction,
    getFollowersAction,
    getFollowingAction,
    checkFollowStatusAction,
    clearSocialError,
    clearFollowersData,
    clearFollowingData,
    resetSocialData,
  };
};
