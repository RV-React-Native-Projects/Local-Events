import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AuthStackParamList,
  ChatsStackParamList,
  EventStackParamList,
  HomeStackParamList,
  ProfileStackParamList,
  SearchStackParamList,
} from './StackNavigationTypes';
import { TabParamsList } from './TabNavigationTypes';

export type ScreenPropsType<N, R> = {
  navigation: N;
  route: R;
};

// HOME TAB
export type HomeNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'HomeTab'>,
  StackNavigationProp<HomeStackParamList, 'Home'>
>;

export type HomeRouteProp = RouteProp<HomeStackParamList, 'Home'>;

export type EventDetailsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<
    TabParamsList,
    'HomeTab' | 'SearchTab' | 'ProfileTab'
  >,
  StackNavigationProp<
    HomeStackParamList | SearchStackParamList | ProfileStackParamList,
    'EventDetails'
  >
>;

export type EventDetailsRouteProp = RouteProp<
  HomeStackParamList | SearchStackParamList | ProfileStackParamList,
  'EventDetails'
>;

// SEARCH TAB
export type SearchNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'SearchTab'>,
  StackNavigationProp<SearchStackParamList, 'Search'>
>;

export type SearchRouteProp = RouteProp<SearchStackParamList, 'Search'>;

// PROFILE TAB
export type ProfileNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'ProfileTab'>,
  StackNavigationProp<ProfileStackParamList, 'Profile'>
>;

export type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;

export type InterestsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'ProfileTab'>,
  StackNavigationProp<ProfileStackParamList, 'Interests'>
>;

export type InterestsRouteProp = RouteProp<ProfileStackParamList, 'Interests'>;

// NEW EVENT TAB
export type NewEventNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'EventTab'>,
  StackNavigationProp<EventStackParamList, 'NewEvent'>
>;

export type NewEventRouteProp = RouteProp<EventStackParamList, 'NewEvent'>;

// CHAT TAB
export type ChatsNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'ChatsTab'>,
  StackNavigationProp<ChatsStackParamList, 'Chats'>
>;

export type ChatsRouteProp = RouteProp<ChatsStackParamList, 'Chats'>;

export type ChatPageNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'ChatsTab'>,
  StackNavigationProp<ChatsStackParamList, 'ChatPage'>
>;

export type ChatPageRouteProp = RouteProp<ChatsStackParamList, 'ChatPage'>;

// EVENT TAB
export type EventNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamsList, 'EventTab'>,
  StackNavigationProp<EventStackParamList, 'NewEvent'>
>;

export type EventRouteProp = RouteProp<EventStackParamList, 'NewEvent'>;

// Auth Stack
export type AuthNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'Auth'
>;

export type AuthRouteProp = RouteProp<AuthStackParamList, 'Auth'>;

export type ForgetPasswordNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'ForgetPassword'
>;

export type ForgetPasswordRouteProp = RouteProp<
  AuthStackParamList,
  'ForgetPassword'
>;

export type InterestNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'Interests'
>;

export type InterestRouteProp = RouteProp<AuthStackParamList, 'Interests'>;

export type OnBoardingNavigationProps = StackNavigationProp<
  AuthStackParamList,
  'OnBoarding'
>;

export type OnBoardingRouteProp = RouteProp<AuthStackParamList, 'OnBoarding'>;
