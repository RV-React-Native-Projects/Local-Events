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
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}
