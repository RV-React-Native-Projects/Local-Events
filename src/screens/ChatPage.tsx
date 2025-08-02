import {
  ChatPageNavigationProps,
  ChatPageRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

export default function ChatPage({}: ScreenPropsType<
  ChatPageNavigationProps,
  ChatPageRouteProp
>) {
  return (
    <View>
      <Text>ChatPage</Text>
    </View>
  );
}
