import { useSelector } from 'react-redux';
import {
  CreateGroupRequest,
  UpdateGroupRequest,
  PaginationParams,
} from '@interfaces/index';
import { useAppDispatch } from '@redux/hooks';
import { RootState } from '@redux/store';
import {
  clearError,
  clearCurrentGroup,
  clearSearchResults,
  resetGroups,
} from '@slice/groupsSlice';
import {
  fetchGroups,
  searchGroups,
  fetchGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
} from '@thunk/groupsThunks';

export const useGroupsHook = () => {
  const dispatch = useAppDispatch();
  const groupsState = useSelector((state: RootState) => state.groups);

  const getGroups = async (
    params: PaginationParams = { page: 1, limit: 10 },
  ) => {
    return await dispatch(fetchGroups(params));
  };

  const searchGroupsData = async (
    params: { query: string } & PaginationParams,
  ) => {
    return await dispatch(searchGroups(params));
  };

  const getGroupById = async (groupId: string) => {
    return await dispatch(fetchGroupById(groupId));
  };

  const createNewGroup = async (groupData: CreateGroupRequest) => {
    return await dispatch(createGroup(groupData));
  };

  const updateExistingGroup = async (
    groupId: string,
    groupData: UpdateGroupRequest,
  ) => {
    return await dispatch(updateGroup({ groupId, groupData }));
  };

  const removeGroup = async (groupId: string) => {
    return await dispatch(deleteGroup(groupId));
  };

  const joinGroupAction = async (groupId: string) => {
    return await dispatch(joinGroup(groupId));
  };

  const leaveGroupAction = async (groupId: string) => {
    return await dispatch(leaveGroup(groupId));
  };

  const clearGroupsError = () => {
    dispatch(clearError());
  };

  const clearCurrentGroupData = () => {
    dispatch(clearCurrentGroup());
  };

  const clearSearchResultsData = () => {
    dispatch(clearSearchResults());
  };

  const resetGroupsSlice = () => {
    dispatch(resetGroups());
  };

  return {
    ...groupsState,
    getGroups,
    searchGroupsData,
    getGroupById,
    createNewGroup,
    updateExistingGroup,
    removeGroup,
    joinGroupAction,
    leaveGroupAction,
    clearGroupsError,
    clearCurrentGroupData,
    clearSearchResultsData,
    resetGroupsSlice,
  };
};
