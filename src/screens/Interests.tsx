import { View, Text } from 'react-native';
import {
  InterestNavigationProps,
  InterestRouteProp,
  ScreenPropsType,
} from '@navigation/types';

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
