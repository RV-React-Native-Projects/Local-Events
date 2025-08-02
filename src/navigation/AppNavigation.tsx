import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useAppSelector } from '@redux/hooks';
import AuthStack from './stacks/AuthStack';
import TabNavigation from './TabNavigation';

export default function AppNavigation() {
  const { isAuth } = useAppSelector(state => state.user);
  const canAccessApp = isAuth;

  return canAccessApp ? <TabNavigation /> : <AuthStack />;
}

export const useAppNavigation: () => NavigationProp<ParamListBase> =
  useNavigation;
