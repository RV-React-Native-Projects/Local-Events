import { lazy } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import { screenOptions } from './HomeStack';

const OnBoarding = lazy(() => import('@screens/Auth/OnBoarding'));
const AuthScreen = lazy(() => import('@screens/Auth/AuthScreen'));
const ForgetPassword = lazy(() => import('@screens/Auth/ForgetPassword'));
const Interests = lazy(() => import('@screens/Interests'));

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...screenOptions, headerShadowVisible: true }}
      initialRouteName="OnBoarding"
    >
      <Stack.Screen
        name="OnBoarding"
        options={{ headerShown: false }}
        component={OnBoarding}
      />
      <Stack.Screen
        name="Auth"
        options={{ headerShown: false }}
        component={AuthScreen}
      />
      <Stack.Screen
        name="ForgetPassword"
        options={{ headerShown: false }}
        component={ForgetPassword}
      />
      <Stack.Screen
        name="Interests"
        options={{ headerShown: false }}
        component={Interests}
      />
    </Stack.Navigator>
  );
}
