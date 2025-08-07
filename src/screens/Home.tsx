import { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AppInput from '@components/AppInput/AppInput';
import { AppText } from '@components/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  HomeNavigationProps,
  HomeRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { opacity } from '@themes/opacity';
import { moderateScale } from '@themes/responsive';
import { gully, spacing } from '@themes/spacing';
import { EventCard, EventCardProps } from '../cards';

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

  const renderEventCard = ({ item }: { item: EventCardProps }) => (
    <EventCard
      {...item}
      onPress={handleEventClick}
      onLike={handleLike}
      onShare={handleShare}
      onJoin={() => {}}
    />
  );

  const scrollRef = useRef<ScrollView>(null);

  return (
    <ScreenWrapper scrollEnabled={false} statusBarColor="primary">
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: moderateScale(100) }}
        stickyHeaderIndices={[1]}>
        <View style={styles.header}>
          <View>
            <AppText variant="header" color="text">
              Events Near You
            </AppText>
            <AppText variant="footnote" color="secondaryText">
              Discover local happenings
            </AppText>
          </View>
          <Pressable onPress={handleFilter}>
            <MaterialIcons name="filter-list" size={24} />
          </Pressable>
        </View>
        <View style={styles.stickySearchWrapper}>
          <AppInput
            label={undefined}
            placeholder="Search events, categories, or locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {/* <MaterialDesignIcons name="search-web" size={30} /> */}
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {filters.map(filter => (
            <TouchableOpacity
              activeOpacity={opacity.dark}
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter.toLowerCase() &&
                  styles.selectedFilterChip,
              ]}
              onPress={() => setSelectedFilter(filter.toLowerCase())}>
              <AppText variant="label" color={'onPrimary'}>
                {filter}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={mockEvents}
          scrollEnabled={false}
          renderItem={renderEventCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: gully }}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const useStyles = () => {
  const { colors, shadow } = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.appBackgroundColor,
    },
    header: {
      backgroundColor: colors.onPrimary,
      paddingHorizontal: gully,
      paddingVertical: spacing.baseLarge,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      ...shadow.regular,
    },
    stickySearchWrapper: {
      backgroundColor: colors.appBackgroundColor,
      paddingHorizontal: gully,
      paddingVertical: spacing.base,
      flexDirection: 'row',
      ...shadow.regular,
    },
    searchContainer: {
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInput: {
      backgroundColor: colors.appBackgroundColor,
    },
    filterChip: {
      backgroundColor: colors.inputBorder,
      paddingHorizontal: spacing.medium,
      paddingVertical: spacing.small,
      borderRadius: radius.round,
    },
    selectedFilterChip: {
      backgroundColor: colors.primary,
    },
    scrollContentContainer: {
      gap: spacing.base,
      paddingVertical: spacing.base,
      paddingHorizontal: gully,
    },
  });
};
