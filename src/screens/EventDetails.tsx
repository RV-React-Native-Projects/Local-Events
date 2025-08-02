import { View, Text } from 'react-native';
import {
  EventDetailsNavigationProps,
  EventDetailsRouteProp,
  ScreenPropsType,
} from '@navigation/types';

export default function EventDetails({}: ScreenPropsType<
  EventDetailsNavigationProps,
  EventDetailsRouteProp
>) {
  return (
    <View>
      <Text>EventDetails</Text>
    </View>
  );
}
