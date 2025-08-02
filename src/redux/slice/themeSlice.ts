import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorTheme, darkTheme, lightTheme } from '@colors';
import { shadow, Shadows } from '@themes/shadow';

type Theme = 'light' | 'dark';

interface ThemeState {
  colors: ColorTheme;
  isDark: boolean;
  shadow: Shadows;
  theme: Theme;
}

const initialState: ThemeState = {
  colors: lightTheme,
  isDark: false,
  shadow: shadow(lightTheme.shadow),
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      state.colors = action.payload === 'dark' ? darkTheme : lightTheme;
      state.isDark = action.payload === 'dark';
      state.shadow = shadow(state.colors.shadow);
    },
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      state.colors = state.theme === 'dark' ? darkTheme : lightTheme;
      state.isDark = state.theme === 'dark';
      state.shadow = shadow(state.colors.shadow);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
