import { View, Text } from 'react-native';
import {
  ChatsNavigationProps,
  ChatsRouteProp,
  ScreenPropsType,
} from '@navigation/types';

export default function Chats({}: ScreenPropsType<
  ChatsNavigationProps,
  ChatsRouteProp
>) {
  return (
    <View>
      <Text>Chats</Text>
    </View>
  );
}
