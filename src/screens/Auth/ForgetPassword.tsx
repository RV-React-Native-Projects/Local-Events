import { View, Text } from 'react-native';
import {
  ForgetPasswordNavigationProps,
  ForgetPasswordRouteProp,
  ScreenPropsType,
} from '@navigation/types';

export default function ForgetPassword({}: ScreenPropsType<
  ForgetPasswordNavigationProps,
  ForgetPasswordRouteProp
>) {
  return (
    <View>
      <Text>ForgetPassword</Text>
    </View>
  );
}
