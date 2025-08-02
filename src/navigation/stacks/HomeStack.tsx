import { lazy } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { HeaderBackIcon } from '@components/Header';
import { fontFamily, fontSize } from '@themes/fontSize';
import { HomeStackParamList } from '../types';

const Home = lazy(() => import('@screens/Home'));
const EventDetails = lazy(() => import('@screens/EventDetails'));

const Stack = createStackNavigator<HomeStackParamList>();

export const headerLeftIcon = (color?: string) => {
  return <HeaderBackIcon iconColor={color} />;
};

export const screenOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left',
  headerLeft: () => headerLeftIcon(), // Ensure this works for StackNavigationOptions
  headerTitleStyle: {
    fontFamily: fontFamily.Medium,
    fontSize: fontSize[16],
    textTransform: 'capitalize',
    fontWeight: '500',
  },
};

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...screenOptions, headerShadowVisible: true }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="EventDetails"
        options={{ headerShown: false }}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
}
