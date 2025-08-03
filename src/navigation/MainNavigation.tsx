import BootSplash from 'react-native-bootsplash';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useAppTheme } from '@redux/hooks';
import AppNavigation from './AppNavigation';

export default function MainNavigation() {
  const { isDark } = useAppTheme();

  return (
    <NavigationContainer
      onReady={() => BootSplash.hide()}
      theme={isDark ? DarkTheme : DefaultTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}
