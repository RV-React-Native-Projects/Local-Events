import { View, Text } from 'react-native';
import {
  ProfileNavigationProps,
  ProfileRouteProp,
  ScreenPropsType,
} from '@navigation/types';

export default function Profile({}: ScreenPropsType<
  ProfileNavigationProps,
  ProfileRouteProp
>) {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
