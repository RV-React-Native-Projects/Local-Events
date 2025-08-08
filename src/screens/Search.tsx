import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppInput from '@components/AppInput/AppInput';
import { AppText } from '@components/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  ScreenPropsType,
  SearchNavigationProps,
  SearchRouteProp,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { gradient } from '@themes/colors';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { gully, spacing } from '@themes/spacing';
import CategoryCard from '@cards/CategoryCard';
import FeaturedHostCard from '@cards/FeaturedHostCard';
import TrendingEventCard from '@cards/TrendingEventCard';

const trendingEvents = [
  {
    id: 1,
    title: 'Midnight Jazz Lounge',
    category: 'Music',
    attendees: 47,
    rating: 4.9,
    trending: true,
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Artisan Coffee Tasting',
    category: 'Food & Drink',
    attendees: 23,
    rating: 4.8,
    trending: true,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop',
  },
];

const featuredHosts = [
  {
    id: 1,
    name: 'Sarah Chen',
    bio: 'Poetry enthusiast & event organizer',
    events: 15,
    rating: 4.9,
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    bio: 'Chess master & community builder',
    events: 12,
    rating: 4.8,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
];

const categories = [
  { icon: '🎵', name: 'Music', count: 24, color: '#8b5cf6' },
  { icon: '☕', name: 'Social', count: 18, color: '#d97706' },
  { icon: '🎨', name: 'Arts', count: 15, color: '#ec4899' },
  { icon: '📷', name: 'Photo', count: 12, color: '#3b82f6' },
];

export default function Search({}: ScreenPropsType<
  SearchNavigationProps,
  SearchRouteProp
>) {
  const [searchQuery, setSearchQuery] = useState('');
  const styles = useStyles();

  const handleEventClick = (eventId: number) => {
    console.log('Event clicked:', eventId);
  };

  const handleCategoryClick = (categoryName: string) => {
    console.log('Category clicked:', categoryName);
  };

  const handleHostClick = (hostId: number) => {
    console.log('Host clicked:', hostId);
  };

  const handleFollowHost = (hostId: number) => {
    console.log('Follow host:', hostId);
  };

  return (
    <ScreenWrapper scrollEnabled={false} statusBarColor="primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: moderateScale(100) }}
        stickyHeaderIndices={[1]}>
        <View style={styles.header}>
          <AppText variant="title1" color="onPrimary" size={fontSize[28]}>
            Discover!
          </AppText>
          <AppText variant="label" color="onPrimary">
            Find your next adventure
          </AppText>
        </View>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <AppInput
            placeholder="Search events, people, or places..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.section}>
          <AppText variant="header">🔥 Trending Now</AppText>
          {trendingEvents.map(event => (
            <TrendingEventCard
              key={event.id}
              {...event}
              onPress={handleEventClick}
            />
          ))}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <AppText variant="header">Browse Categories</AppText>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <CategoryCard
                key={category.name}
                {...category}
                onPress={() => handleCategoryClick(category.name)}
              />
            ))}
          </View>
        </View>
        {/* Featured Hosts */}
        <View style={styles.section}>
          <AppText variant="header">Featured Hosts</AppText>
          <View style={styles.hostsGrid}>
            {featuredHosts.map(host => (
              <FeaturedHostCard
                key={host.id}
                {...host}
                onPress={handleHostClick}
                onFollow={handleFollowHost}
              />
            ))}
          </View>
        </View>
        <LinearGradient
          colors={gradient.territoryGradient}
          style={styles.LgContainer}>
          <View style={styles.statsCard}>
            <AppText variant="body" color="onPrimary">
              Community Stats
            </AppText>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <AppText variant="button" color="onPrimary">
                  150+
                </AppText>
                <AppText variant="footnote" color="onPrimary">
                  Active Events
                </AppText>
              </View>
              <View style={styles.statCard}>
                <AppText variant="button" color="onPrimary">
                  2.5k+
                </AppText>
                <AppText
                  variant="footnote"
                  color="onPrimary"
                  textAlign="center">
                  Community Members
                </AppText>
              </View>
              <View style={styles.statCard}>
                <AppText variant="button" color="onPrimary">
                  50+
                </AppText>
                <AppText variant="footnote" color="onPrimary">
                  Host Partners
                </AppText>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </ScreenWrapper>
  );
}

const useStyles = () => {
  const { colors, shadow } = useAppTheme();
  return StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: gully,
    },
    searchContainer: {
      position: 'relative',
      padding: gully,
      backgroundColor: colors.primary,
    },
    section: {
      marginVertical: spacing.mediumLarge,
      gap: spacing.baseLarge,
      paddingHorizontal: gully,
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    hostsGrid: {
      gap: spacing.mediumLarge,
    },
    LgContainer: {
      ...shadow.large,
      borderRadius: radius.xl,
      paddingHorizontal: gully,
    },
    statsCard: {
      paddingVertical: spacing.mediumLarge,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    statCard: {
      alignItems: 'center',
      gap: spacing.base,
      marginTop: spacing.baseLarge,
      paddingHorizontal: spacing.baseLarge,
    },
  });
};
