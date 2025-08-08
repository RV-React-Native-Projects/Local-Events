import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@redux/hooks';
import { ColorThemeTypes } from '@themes/colors';
import { device } from '@utils/device';

export interface AppStatusBarProps {
  statusBarColor?: ColorThemeTypes;
}

const AppStatusBar: React.FC<AppStatusBarProps> = ({
  statusBarColor = 'background',
  ...props
}) => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return device.isIOS ? (
    <View
      style={{
        height: insets.top,
        backgroundColor: statusBarColor
          ? colors[statusBarColor]
          : colors.background,
      }}>
      <StatusBar
        backgroundColor={
          statusBarColor
            ? (colors[statusBarColor] as string)
            : colors.background
        }
        {...props}
      />
    </View>
  ) : (
    <StatusBar
      backgroundColor={
        statusBarColor ? colors[statusBarColor] : colors.transparent
      }
      {...props}
    />
  );
};

export default AppStatusBar;
