import {
  EventDetailsNavigationProps,
  EventDetailsRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
