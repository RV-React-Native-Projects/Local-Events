import { View, Text } from 'react-native';
import {
  ChatPageNavigationProps,
  ChatPageRouteProp,
  ScreenPropsType,
} from '@navigation/types';

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
