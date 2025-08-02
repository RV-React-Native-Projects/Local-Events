import { lazy } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventStackParamList } from '../types';
import { screenOptions } from './HomeStack';

const NewEvent = lazy(() => import('@screens/NewEvent'));

const Stack = createStackNavigator<EventStackParamList>();

export default function EventStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...screenOptions, headerShadowVisible: true }}
      initialRouteName="NewEvent"
    >
      <Stack.Screen
        name="NewEvent"
        options={{ headerShown: false }}
        component={NewEvent}
      />
    </Stack.Navigator>
  );
}
