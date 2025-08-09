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

export const userPaths = {
  profile: '/users/profile',
  byId: (id: string) => `/users/${id}`,
  update: '/users/update',
  updateProfile: '/users/profile',
  search: '/users/search',
  follow: (id: string) => `/users/${id}/follow`,
  unfollow: (id: string) => `/users/${id}/unfollow`,
} as const;

export const groupPaths = {
  groups: '/groups',
  create: '/groups',
  byId: (id: string) => `/groups/${id}`,
  update: (id: string) => `/groups/${id}`,
  delete: (id: string) => `/groups/${id}`,
  join: (id: string) => `/groups/${id}/join`,
  leave: (id: string) => `/groups/${id}/leave`,
  members: (id: string) => `/groups/${id}/members`,
  search: '/groups/search',
} as const;

export const notificationPaths = {
  userNotifications: (userId: string) => `/notifications/user/${userId}`,
  unreadNotifications: (userId: string) =>
    `/notifications/user/${userId}/unread`,
  notificationCount: (userId: string) => `/notifications/user/${userId}/count`,
  create: '/notifications',
  markRead: (id: string) => `/notifications/${id}/read`,
  markAllRead: (userId: string) =>
    `/notifications/user/${userId}/mark-all-read`,
  delete: (id: string) => `/notifications/${id}`,
} as const;

export const socialPaths = {
  follow: (userId: string) => `/social/follow/${userId}`,
  unfollow: (userId: string) => `/social/unfollow/${userId}`,
  followers: (userId: string) => `/social/followers/${userId}`,
  following: (userId: string) => `/social/following/${userId}`,
  checkFollowStatus: (userId: string) => `/social/status/${userId}`,
} as const;

export const verificationPaths = {
  getAll: '/verification',
  getPending: '/verification/pending',
  getByUserId: (userId: string) => `/verification/user/${userId}`,
  submit: '/verification',
  approve: (id: string) => `/verification/${id}/approve`,
  reject: (id: string) => `/verification/${id}/reject`,
  delete: (id: string) => `/verification/${id}`,
} as const;
