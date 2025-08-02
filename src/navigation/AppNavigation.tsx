import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useAppSelector } from '@redux/hooks';
import TabNavigation from './TabNavigation';
import AuthStack from './stacks/AuthStack';

export default function AppNavigation() {
  const { isAuth } = useAppSelector(state => state.user);
  const canAccessApp = isAuth;

  return canAccessApp ? <TabNavigation /> : <AuthStack />;
}

export const useAppNavigation: () => NavigationProp<ParamListBase> =
  useNavigation;
