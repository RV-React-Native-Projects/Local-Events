import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { useAppSelector } from '@redux/hooks';
import { TabNavigation } from './TabNavigation';

export default () => {
  const { isAuth } = useAppSelector(state => state.user);
  const canAccessApp = isAuth;

  return <TabNavigation />;
  // return canAccessApp ? <TabNavigation /> : <AuthStack />;
};

export const useAppNavigation: () => NavigationProp<ParamListBase> =
  useNavigation;
