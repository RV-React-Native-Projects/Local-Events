import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import SecureStorage from '@storage/SecureStorage';

export interface UserState {
  loading: boolean;
  isAuth: boolean;
}

const initialState: UserState = {
  loading: false,
  isAuth: false,
};

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: _ => ({
    toggleAuth: state => {
      state.isAuth = !state.isAuth;
    },
    resetAuth: state => {
      state.isAuth = initialState.isAuth;
    },
    logout: state => {
      state = initialState;
      SecureStorage.clear();
    },
    resetUser: () => initialState,
  }),
  extraReducers: builder => {},
});

export const { toggleAuth, resetAuth, logout, resetUser } = userSlice.actions;
export default userSlice.reducer;
