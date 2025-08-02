import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { setTheme } from '@slice/themeSlice';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSystemTheme = () => {
  const systemColorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (systemColorScheme === 'dark') {
      dispatch(setTheme('light'));
    } else {
      dispatch(setTheme('light'));
    }
  }, [systemColorScheme, dispatch]);
};

export const useAppTheme = () => {
  const theme = useAppSelector((state: RootState) => state.theme);
  return theme;
};
