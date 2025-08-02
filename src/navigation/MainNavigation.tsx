import { StyleSheet } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useAppDispatch, useAppTheme } from '@redux/hooks';
import AppNavigation from './AppNavigation';

export default function MainNavigation() {
  const { isDark } = useAppTheme();
  const storeDispatch = useAppDispatch();

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <AppNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
