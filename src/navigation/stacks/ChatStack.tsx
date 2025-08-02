import { lazy } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatsStackParamList } from '../types';
import { screenOptions } from './HomeStack';

const Chats = lazy(() => import('@screens/Chats'));
const ChatPage = lazy(() => import('@screens/ChatPage'));

const Stack = createStackNavigator<ChatsStackParamList>();

export default function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...screenOptions, headerShadowVisible: true }}
      initialRouteName="Chats"
    >
      <Stack.Screen
        name="Chats"
        options={{ headerShown: false }}
        component={Chats}
      />
      <Stack.Screen
        name="ChatPage"
        options={{ headerShown: false }}
        component={ChatPage}
      />
    </Stack.Navigator>
  );
}
