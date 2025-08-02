import { View, Text } from 'react-native';
import {
  NewEventNavigationProps,
  NewEventRouteProp,
  ScreenPropsType,
} from '@navigation/types';

export default function NewEvent({}: ScreenPropsType<
  NewEventNavigationProps,
  NewEventRouteProp
>) {
  return (
    <View>
      <Text>NewEvent</Text>
    </View>
  );
}
