import {
  InterestNavigationProps,
  InterestRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

export default function Interests({}: ScreenPropsType<
  InterestNavigationProps,
  InterestRouteProp
>) {
  return (
    <View>
      <Text>Interests</Text>
    </View>
  );
}
