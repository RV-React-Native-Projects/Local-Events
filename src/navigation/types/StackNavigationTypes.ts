export type HomeStackParamList = {
  Home: undefined;
  EventDetails: { eventID: string };
};

export type SearchStackParamList = {
  Search: undefined;
  EventDetails: { eventID: string };
};

export type ProfileStackParamList = {
  EventDetails: { eventID: string };
  Profile: undefined;
  Interests: undefined;
};

export type ChatsStackParamList = {
  Chats: undefined;
  ChatPage: undefined;
};

export type EventStackParamList = {
  NewEvent: undefined;
};

export type AuthStackParamList = {
  Interests: undefined;
  OnBoarding: undefined;
  ForgetPassword: undefined;
  Auth: undefined;
};
