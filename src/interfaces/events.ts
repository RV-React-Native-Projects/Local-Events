import { PaginationResponse } from './api';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizerId: string;
  interests: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string | Date;
  location: string;
  interests?: string[];
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: string;
}

export interface EventsState {
  events: Event[];
  currentEvent: Event | null;
  searchResults: Event[];
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  pagination: PaginationResponse;
}
