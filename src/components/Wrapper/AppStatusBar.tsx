import React from 'react';
import { StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useAppTheme } from '@redux/hooks';
import { ColorThemeTypes } from '@themes/colors';

export interface AppStatusBarProps {
  statusBarColor?: ColorThemeTypes;
}

const AppStatusBar: React.FC<AppStatusBarProps> = ({
  statusBarColor = 'backgroundColor',
  ...props
}) => {
  const { colors } = useAppTheme();
  const height = useHeaderHeight();
  if (!height) {
    return null;
  }
  return (
    <StatusBar
      backgroundColor={
        statusBarColor ? colors[statusBarColor] : colors.background
      }
      {...props}
    />
  );
};

export default AppStatusBar;
