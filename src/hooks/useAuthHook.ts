import { useSelector } from 'react-redux';
import {
  LoginRequest,
  RegisterRequest,
  OAuthRequest,
  User,
} from '@interfaces/index';
import { useAppDispatch } from '@redux/hooks';
import { RootState } from '@redux/store';
import {
  logout,
  clearError,
  setUser,
  setTokens,
  reset,
} from '@slice/authSlice';
import {
  loginUser,
  registerUser,
  oauthLogin,
  getCurrentUser,
  refreshToken,
  logoutUser,
  logoutAllDevices,
} from '@thunk/authThunks';

export const useAuthHook = () => {
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginRequest) => {
    return await dispatch(loginUser(credentials));
  };

  const register = async (userData: RegisterRequest) => {
    return await dispatch(registerUser(userData));
  };

  const oauth = async (oauthData: OAuthRequest) => {
    return await dispatch(oauthLogin(oauthData));
  };

  const getCurrentUserData = async () => {
    return await dispatch(getCurrentUser());
  };

  const refresh = async (token: string) => {
    return await dispatch(refreshToken(token));
  };

  const logoutUserAction = async () => {
    return await dispatch(logoutUser());
  };

  const logoutAllDevicesUser = async () => {
    return await dispatch(logoutAllDevices());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const setUserData = (user: User) => {
    dispatch(setUser(user));
  };

  const setUserTokens = (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    dispatch(setTokens(tokens));
  };

  const logoutLocal = () => {
    dispatch(logout());
  };

  const resetAuth = () => {
    dispatch(reset());
  };

  return {
    ...authState,
    login,
    register,
    oauth,
    getCurrentUserData,
    refresh,
    logoutUser: logoutUserAction,
    logoutAllDevicesUser,
    clearAuthError,
    setUserData,
    setUserTokens,
    logoutLocal,
    resetAuth,
  };
};
