import {
  ProfileNavigationProps,
  ProfileRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
