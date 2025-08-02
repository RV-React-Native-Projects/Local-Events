import {
  ForgetPasswordNavigationProps,
  ForgetPasswordRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
