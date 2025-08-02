import {
  AuthNavigationProps,
  AuthRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
