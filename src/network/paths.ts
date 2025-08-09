import Config from 'react-native-config';

export const baseURL = Config.HOST_URL;

// Auth endpoints (exactly from MD file)
export const authPaths = {
  login: '/auth/login',
  register: '/auth/register',
  oauth: '/auth/oauth',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
  logoutAll: '/auth/logout-all',
  me: '/auth/me',
} as const;

// Events endpoints (exactly from MD file)
export const eventPaths = {
  events: '/events',
  create: '/events',
  byId: (id: string) => `/events/${id}`,
  update: (id: string) => `/events/${id}`,
  delete: (id: string) => `/events/${id}`,
  search: '/events/search',
  upcoming: '/events/upcoming',
  byInterest: (interest: string) => `/events/interest/${interest}`,
  byLocation: (location: string) => `/events/location/${location}`,
  join: (id: string) => `/events/${id}/join`,
  leave: (id: string) => `/events/${id}/leave`,
  participants: (id: string) => `/events/${id}/participants`,
  reviews: (id: string) => `/events/${id}/reviews`,
  addReview: (id: string) => `/events/${id}/reviews`,
} as const;
