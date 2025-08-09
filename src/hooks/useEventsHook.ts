import { useSelector } from 'react-redux';
import {
  CreateEventRequest,
  UpdateEventRequest,
  PaginationParams,
} from '@interfaces/index';
import { useAppDispatch } from '@redux/hooks';
import { RootState } from '@redux/store';
import {
  clearError,
  clearCurrentEvent,
  clearSearchResults,
  resetEvents,
} from '@slice/eventsSlice';
import {
  fetchEvents,
  searchEvents,
  fetchEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
} from '@thunk/eventsThunks';

export const useEventsHook = () => {
  const dispatch = useAppDispatch();
  const eventsState = useSelector((state: RootState) => state.events);

  const getEvents = async (params: PaginationParams) => {
    return await dispatch(fetchEvents(params));
  };

  const searchEventsList = async (
    params: { query: string } & PaginationParams,
  ) => {
    return await dispatch(searchEvents(params));
  };

  const getEventById = async (eventId: string) => {
    return await dispatch(fetchEventById(eventId));
  };

  const createNewEvent = async (eventData: CreateEventRequest) => {
    return await dispatch(createEvent(eventData));
  };

  const updateExistingEvent = async (id: string, data: UpdateEventRequest) => {
    return await dispatch(updateEvent({ id, data }));
  };

  const removeEvent = async (eventId: string) => {
    return await dispatch(deleteEvent(eventId));
  };

  const joinEventAction = async (eventId: string) => {
    return await dispatch(joinEvent(eventId));
  };

  const leaveEventAction = async (eventId: string) => {
    return await dispatch(leaveEvent(eventId));
  };

  const clearEventsError = () => {
    dispatch(clearError());
  };

  const clearCurrentEventData = () => {
    dispatch(clearCurrentEvent());
  };

  const clearSearchResultsData = () => {
    dispatch(clearSearchResults());
  };

  const resetEventSlice = () => {
    dispatch(resetEvents());
  };

  return {
    ...eventsState,
    getEvents,
    searchEventsList,
    getEventById,
    createNewEvent,
    updateExistingEvent,
    removeEvent,
    joinEventAction,
    leaveEventAction,
    clearEventsError,
    clearCurrentEventData,
    clearSearchResultsData,
    resetEventSlice,
  };
};
