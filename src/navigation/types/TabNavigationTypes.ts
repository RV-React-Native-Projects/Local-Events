import { NavigatorScreenParams } from '@react-navigation/native';
import {
  HomeStackParamList,
  SearchStackParamList,
  EventStackParamList,
  ChatsStackParamList,
  ProfileStackParamList,
} from './StackNavigationTypes';

// Only touch it in case of adding or removing extra Tab to Bottom Tab Navigation

export type TabParamsList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  EventTab: NavigatorScreenParams<EventStackParamList>;
  ChatsTab: NavigatorScreenParams<ChatsStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};
