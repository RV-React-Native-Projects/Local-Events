import { lazy } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from '../types';
import { screenOptions } from './HomeStack';

const Profile = lazy(() => import('@screens/Profile'));
const EventDetails = lazy(() => import('@screens/EventDetails'));
const Interests = lazy(() => import('@screens/Interests'));

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...screenOptions, headerShadowVisible: true }}
      initialRouteName="Profile"
    >
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <Stack.Screen
        name="EventDetails"
        options={{ headerShown: false }}
        component={EventDetails}
      />
      <Stack.Screen
        name="Interests"
        options={{ headerShown: false }}
        component={Interests}
      />
    </Stack.Navigator>
  );
}
