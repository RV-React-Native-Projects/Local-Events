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
import { useAppTheme } from '@redux/hooks';
import { radius, border } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

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
  const styles = useStyles();
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
            <AppText variant="footnote10" color="white">
              {event.category}
            </AppText>
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
              <AppText variant="title3" color="text">
                {event.title}
              </AppText>
              <AppText
                variant="footnote"
                color="secondaryText"
                numberOfLines={2}>
                {event.description}
              </AppText>
            </View>
          </View>

          {/* Event Details */}
          <View style={styles.eventDetails}>
            <View style={styles.detailRow}>
              <AppText style={styles.detailIcon}>📅</AppText>
              <AppText variant="footnote" color="secondaryText">
                {event.date} • {event.time}
              </AppText>
            </View>
            <View style={styles.detailRow}>
              <AppText style={styles.detailIcon}>📍</AppText>
              <AppText variant="footnote" color="secondaryText">
                {event.location}
              </AppText>
              <AppText variant="footnote" color="primary">
                • {event.distance}
              </AppText>
            </View>
            <View style={styles.detailRow}>
              <AppText style={styles.detailIcon}>👥</AppText>
              <AppText variant="footnote" color="secondaryText">
                {event.attendees}/{event.maxAttendees} attending
              </AppText>
              <AppText variant="footnote" color="success">
                • {event.price}
              </AppText>
            </View>
          </View>

          {/* Host Info */}
          <View style={styles.hostSection}>
            <View style={styles.hostInfo}>
              <Image
                source={{ uri: event.host.avatar }}
                style={styles.hostAvatar}
              />
              <AppText variant="footnote" color="secondaryText">
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
            <AppText variant="title1" color="text">
              Events Near You
            </AppText>
            <AppText variant="subhead" color="secondaryText">
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
                variant="label"
                color={
                  selectedFilter === filter.toLowerCase()
                    ? 'primary'
                    : 'secondaryText'
                }>
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

const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.appBackgroundColor,
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.large,
    },
    headerContent: {
      marginBottom: spacing.large,
    },
    headerTitle: {
      fontSize: fontSize[28],
      fontWeight: 'bold',
      color: colors.onPrimary,
      marginBottom: spacing.base,
    },
    headerSubtitle: {
      fontSize: fontSize[16],
      color: colors.onPrimary,
      opacity: 0.9,
    },
    searchContainer: {
      position: 'relative',
    },
    searchIcon: {
      position: 'absolute',
      left: spacing.smallMedium,
      top: '50%',
      transform: [{ translateY: -spacing.base }],
      fontSize: fontSize[16],
      color: colors.secondaryText,
      zIndex: 1,
    },
    searchInput: {
      paddingLeft: moderateScale(44),
      backgroundColor: colors.onPrimary,
      opacity: 0.9,
      borderWidth: 0,
      height: moderateScale(48),
      borderRadius: radius.lg,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.mediumLarge,
    },
    section: {
      marginBottom: spacing.extraLargePlus,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.mediumLarge,
    },
    sectionIcon: {
      fontSize: fontSize[20],
      marginRight: spacing.base,
    },
    sectionTitle: {
      fontSize: fontSize[20],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.mediumLarge,
    },
    eventCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      overflow: 'hidden',
      marginBottom: spacing.mediumLarge,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    imageContainer: {
      position: 'relative',
    },
    eventImage: {
      width: '100%',
      height: moderateScale(180),
      resizeMode: 'cover',
    },
    categoryBadge: {
      position: 'absolute',
      top: spacing.smallMedium,
      left: spacing.smallMedium,
      paddingHorizontal: spacing.smallMedium,
      paddingVertical: spacing.xs,
      borderRadius: radius.xl,
    },
    actionButtons: {
      position: 'absolute',
      top: spacing.smallMedium,
      right: spacing.smallMedium,
      flexDirection: 'row',
      gap: spacing.base,
    },
    actionButton: {
      backgroundColor: colors.onPrimary,
      opacity: 0.9,
      padding: spacing.base,
      borderRadius: radius.lg,
      width: moderateScale(36),
      height: moderateScale(36),
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionIcon: {
      fontSize: fontSize[16],
      color: colors.text,
    },
    likedIcon: {
      color: colors.error,
    },
    eventContent: {
      padding: spacing.mediumLarge,
    },
    eventHeader: {
      marginBottom: spacing.smallMedium,
    },
    eventTitleContainer: {
      flex: 1,
    },
    eventDetails: {
      marginBottom: spacing.mediumLarge,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.base,
    },
    detailIcon: {
      fontSize: fontSize[16],
      marginRight: spacing.base,
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
      width: moderateScale(36),
      height: moderateScale(36),
      borderRadius: moderateScale(18),
      marginRight: spacing.smallMedium,
    },
    joinButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.base,
      borderRadius: radius.lg,
      minWidth: moderateScale(80),
    },
    loadMoreContainer: {
      alignItems: 'center',
      marginTop: spacing.large,
      marginBottom: spacing.mediumLarge,
    },
    loadMoreButton: {
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: spacing.extraLargePlus,
      paddingVertical: spacing.smallMedium,
      borderRadius: radius.lg,
    },
    filterButton: {
      backgroundColor: colors.onPrimary,
      opacity: 0.9,
      padding: spacing.base,
      borderRadius: radius.lg,
      width: moderateScale(36),
      height: moderateScale(36),
      alignItems: 'center',
      justifyContent: 'center',
    },
    filterIcon: {
      fontSize: fontSize[16],
      color: colors.text,
    },
    filtersContainer: {
      flexDirection: 'row',
      gap: spacing.small,
      marginTop: spacing.medium,
    },
    filterChip: {
      backgroundColor: colors.inputBorder,
      paddingHorizontal: spacing.medium,
      paddingVertical: spacing.small,
      borderRadius: radius.xl,
    },
    selectedFilterChip: {
      backgroundColor: colors.primary,
    },
    eventsContainer: {
      flex: 1,
    },
    eventsGrid: {
      gap: spacing.mediumLarge,
    },
  });
};
