import { useSelector, useDispatch } from 'react-redux';
import { LoginRequest, RegisterRequest, OAuthRequest } from '@interfaces/index';
import { RootState, AppDispatch } from '@redux/store';
import { clearError } from '@slice/authSlice';
import {
  loginUser,
  registerUser,
  getCurrentUser,
  refreshToken,
  logoutUser,
  logoutAllDevices,
  oauthLogin,
} from '@thunk/authThunks';

export const useAuthHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading, error, tokens } = useSelector(
    (state: RootState) => state.auth,
  );

  const login = async (credentials: LoginRequest) => {
    return await dispatch(loginUser(credentials));
  };

  const register = async (userData: RegisterRequest) => {
    return await dispatch(registerUser(userData));
  };

  const oAuthLogin = async (oauthData: OAuthRequest) => {
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

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    tokens,
    login,
    register,
    oAuthLogin,
    getCurrentUserData,
    refresh,
    logoutUser: logoutUserAction,
    logoutAllDevicesUser,
    clearAuthError,
  };
};
