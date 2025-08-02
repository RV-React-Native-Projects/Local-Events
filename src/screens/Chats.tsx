import {
  ChatsNavigationProps,
  ChatsRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
