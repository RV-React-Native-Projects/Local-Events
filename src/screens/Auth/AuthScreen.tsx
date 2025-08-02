import { View, Text } from 'react-native';
import {
  AuthNavigationProps,
  AuthRouteProp,
  ScreenPropsType,
} from '@navigation/types';

export default function AuthScreen({}: ScreenPropsType<
  AuthNavigationProps,
  AuthRouteProp
>) {
  return (
    <View>
      <Text>AuthScreen</Text>
    </View>
  );
}
