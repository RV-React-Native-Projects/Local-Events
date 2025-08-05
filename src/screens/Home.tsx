import { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { AppButton } from '@components/AppButton';
import AppInput from '@components/AppInput/AppInput';
import { AppText } from '@components/AppText';
import {
  HomeNavigationProps,
  HomeRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { lightTheme } from '@themes/colors';

const mockEvents = [
  {
    id: 1,
    title: 'Acoustic Poetry Night',
    description:
      'Join us for an intimate evening of spoken word and acoustic music at the cozy Corner Café.',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    category: 'Music',
    categoryColor: '#8b5cf6',
    date: 'Tonight',
    time: '7:00 PM',
    location: 'Corner Café, Downtown',
    distance: '0.3 miles',
    attendees: 12,
    maxAttendees: 20,
    host: {
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      initials: 'SC',
    },
    isLiked: false,
    price: 'Free',
  },
  {
    id: 2,
    title: 'Sunday Morning Chess',
    description:
      'Casual chess games in the park. All skill levels welcome! Bring your own board or join an existing game.',
    image:
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&h=400&fit=crop',
    category: 'Games',
    categoryColor: '#10b981',
    date: 'Tomorrow',
    time: '10:00 AM',
    location: 'Meridian Hill Park',
    distance: '0.8 miles',
    attendees: 8,
    maxAttendees: 16,
    host: {
      name: 'Marcus Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      initials: 'MJ',
    },
    isLiked: true,
    price: 'Free',
  },
  {
    id: 3,
    title: 'Watercolor Workshop',
    description:
      'Learn basic watercolor techniques in this hands-on workshop. All materials provided for beginners.',
    image:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop',
    category: 'Art',
    categoryColor: '#ec4899',
    date: 'Wed, Oct 25',
    time: '6:30 PM',
    location: 'Art Studio Collective',
    distance: '1.2 miles',
    attendees: 5,
    maxAttendees: 12,
    host: {
      name: 'Emma Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      initials: 'ER',
    },
    isLiked: false,
    price: '$15',
  },
  {
    id: 4,
    title: 'Rooftop Jazz Session',
    description:
      'Impromptu jazz session on the rooftop. Bring your instrument or just come to listen and enjoy the vibes.',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    category: 'Music',
    categoryColor: '#8b5cf6',
    date: 'Fri, Oct 27',
    time: '8:00 PM',
    location: 'Skyline Building Rooftop',
    distance: '2.1 miles',
    attendees: 15,
    maxAttendees: 25,
    host: {
      name: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      initials: 'DK',
    },
    isLiked: true,
    price: '$5',
  },
];

const filters = ['All', 'Tonight', 'Free', 'Music', 'Art', 'Food', 'Outdoor'];

export default function Home({}: ScreenPropsType<
  HomeNavigationProps,
  HomeRouteProp
>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleLike = (eventId: number) => {
    console.log('Liked event:', eventId);
  };

  const handleShare = (eventId: number) => {
    console.log('Shared event:', eventId);
  };

  const handleEventClick = (eventId: number) => {
    console.log('Event clicked:', eventId);
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const renderEventCard = (event: any) => {
    return (
      <TouchableOpacity
        key={event.id}
        style={styles.eventCard}
        onPress={() => handleEventClick(event.id)}
        activeOpacity={0.8}>
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: event.categoryColor },
            ]}>
            <AppText style={styles.categoryText}>{event.category}</AppText>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleLike(event.id)}>
              <AppText
                style={[styles.actionIcon, event.isLiked && styles.likedIcon]}>
                ♥
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleShare(event.id)}>
              <AppText style={styles.actionIcon}>↗</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Event Content */}
        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <View style={styles.eventTitleContainer}>
              <AppText style={styles.eventTitle}>{event.title}</AppText>
              <AppText style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </AppText>
            </View>
          </View>

          {/* Event Details */}
          <View style={styles.eventDetails}>
            <View style={styles.detailRow}>
              <AppText style={styles.detailIcon}>📅</AppText>
              <AppText style={styles.detailText}>
                {event.date} • {event.time}
              </AppText>
            </View>
            <View style={styles.detailRow}>
              <AppText style={styles.detailIcon}>📍</AppText>
              <AppText style={styles.detailText}>{event.location}</AppText>
              <AppText style={styles.distanceText}>• {event.distance}</AppText>
            </View>
            <View style={styles.detailRow}>
              <AppText style={styles.detailIcon}>👥</AppText>
              <AppText style={styles.detailText}>
                {event.attendees}/{event.maxAttendees} attending
              </AppText>
              <AppText style={styles.priceText}>• {event.price}</AppText>
            </View>
          </View>

          {/* Host Info */}
          <View style={styles.hostSection}>
            <View style={styles.hostInfo}>
              <Image
                source={{ uri: event.host.avatar }}
                style={styles.hostAvatar}
              />
              <AppText style={styles.hostText}>
                Hosted by {event.host.name}
              </AppText>
            </View>
            <AppButton
              title="Join"
              onPress={() => {}}
              style={styles.joinButton}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <AppText style={styles.headerTitle}>Events Near You</AppText>
            <AppText style={styles.headerSubtitle}>
              Discover local happenings
            </AppText>
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
            <AppText style={styles.filterIcon}>⚙️</AppText>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <AppText style={styles.searchIcon}>🔍</AppText>
          <AppInput
            placeholder="Search events, categories, or locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Quick Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter.toLowerCase() &&
                  styles.selectedFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter.toLowerCase())}>
              <AppText
                style={[
                  styles.filterChipText,
                  selectedFilter === filter.toLowerCase() &&
                    styles.selectedFilterChipText,
                ]}>
                {filter}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <ScrollView
        style={styles.eventsContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.eventsGrid}>
          {mockEvents.map(event => renderEventCard(event))}
        </View>

        {/* Load More */}
        <View style={styles.loadMoreContainer}>
          <AppButton
            title="Load More Events"
            onPress={() => {}}
            style={styles.loadMoreButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: lightTheme.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: lightTheme.secondaryText,
  },
  filterButton: {
    padding: 8,
  },
  filterIcon: {
    fontSize: 20,
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -8 }],
    fontSize: 16,
    color: lightTheme.secondaryText,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 44,
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    height: 44,
    borderRadius: 8,
  },
  filtersContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    marginRight: 8,
  },
  selectedFilterChip: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterChipText: {
    fontSize: 12,
    color: lightTheme.text,
  },
  selectedFilterChipText: {
    color: 'white',
    fontWeight: '600',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  eventsGrid: {
    gap: 16,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  actionButtons: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 16,
    color: lightTheme.text,
  },
  likedIcon: {
    color: '#ef4444',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    marginBottom: 12,
  },
  eventTitleContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: lightTheme.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  eventDescription: {
    fontSize: 14,
    color: lightTheme.secondaryText,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: lightTheme.secondaryText,
    flex: 1,
  },
  distanceText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  priceText: {
    fontSize: 14,
    color: '#10b981',
  },
  hostSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  hostAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  hostText: {
    fontSize: 14,
    color: lightTheme.secondaryText,
  },
  joinButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
  },
  loadMoreContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  loadMoreButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
