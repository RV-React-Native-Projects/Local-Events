import {
  NewEventNavigationProps,
  NewEventRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
