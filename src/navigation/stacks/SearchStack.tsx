import { lazy } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchStackParamList } from '../types';
import { screenOptions } from './HomeStack';

const Search = lazy(() => import('@screens/Search'));
const EventDetails = lazy(() => import('@screens/EventDetails'));

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...screenOptions, headerShadowVisible: true }}
      initialRouteName="Search"
    >
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={Search}
      />
      <Stack.Screen
        name="EventDetails"
        options={{ headerShown: false }}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
}
