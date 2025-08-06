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
  ScreenPropsType,
  SearchNavigationProps,
  SearchRouteProp,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { radius, border } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

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

  const renderTrendingEvent = (event: any) => {
    return (
      <TouchableOpacity
        key={event.id}
        style={styles.trendingCard}
        onPress={() => handleEventClick(event.id)}
        activeOpacity={0.8}>
        <View style={styles.trendingImageContainer}>
          <Image source={{ uri: event.image }} style={styles.trendingImage} />
          <View style={styles.trendingBadge}>
            <AppText style={styles.trendingBadgeText}>🔥 Trending</AppText>
          </View>
        </View>
        <View style={styles.trendingContent}>
          <AppText style={styles.trendingTitle}>{event.title}</AppText>
          <View style={styles.trendingDetails}>
            <AppText style={styles.trendingCategory}>{event.category}</AppText>
            <View style={styles.trendingStats}>
              <View style={styles.statItem}>
                <AppText style={styles.statIcon}>👥</AppText>
                <AppText style={styles.statText}>{event.attendees}</AppText>
              </View>
              <View style={styles.statItem}>
                <AppText style={styles.statIcon}>⭐</AppText>
                <AppText style={styles.statText}>{event.rating}</AppText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategory = (category: any) => {
    return (
      <TouchableOpacity
        key={category.name}
        style={styles.categoryCard}
        activeOpacity={0.8}>
        <View style={styles.categoryContent}>
          <View
            style={[styles.categoryIcon, { backgroundColor: category.color }]}>
            <AppText style={styles.categoryIconText}>{category.icon}</AppText>
          </View>
          <AppText style={styles.categoryName}>{category.name}</AppText>
          <AppText style={styles.categoryCount}>
            {category.count} events
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFeaturedHost = (host: any) => {
    return (
      <TouchableOpacity
        key={host.id}
        style={styles.hostCard}
        activeOpacity={0.8}>
        <View style={styles.hostContent}>
          <Image source={{ uri: host.avatar }} style={styles.hostAvatar} />
          <View style={styles.hostInfo}>
            <AppText style={styles.hostName}>{host.name}</AppText>
            <AppText style={styles.hostBio}>{host.bio}</AppText>
            <View style={styles.hostStats}>
              <AppText style={styles.hostEventCount}>
                {host.events} events
              </AppText>
              <View style={styles.hostRating}>
                <AppText style={styles.ratingIcon}>⭐</AppText>
                <AppText style={styles.ratingText}>{host.rating}</AppText>
              </View>
            </View>
          </View>
          <AppButton
            title="Follow"
            onPress={() => {}}
            style={styles.followButton}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <AppText style={styles.headerTitle}>Discover</AppText>
          <AppText style={styles.headerSubtitle}>
            Find your next adventure
          </AppText>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <AppText style={styles.searchIcon}>🔍</AppText>
          <AppInput
            placeholder="Search events, people, or places..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Trending Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionIcon}>📈</AppText>
            <AppText style={styles.sectionTitle}>Trending Now</AppText>
          </View>

          <View style={styles.trendingGrid}>
            {trendingEvents.map(event => renderTrendingEvent(event))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Browse Categories</AppText>

          <View style={styles.categoriesGrid}>
            {categories.map(category => renderCategory(category))}
          </View>
        </View>

        {/* Featured Hosts */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Featured Hosts</AppText>

          <View style={styles.hostsGrid}>
            {featuredHosts.map(host => renderFeaturedHost(host))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsCard}>
            <AppText style={styles.statsTitle}>Community Stats</AppText>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <AppText style={styles.statNumber}>150+</AppText>
                <AppText style={styles.statLabel}>Active Events</AppText>
              </View>
              <View style={styles.statCard}>
                <AppText style={styles.statNumber}>2.5k+</AppText>
                <AppText style={styles.statLabel}>Community Members</AppText>
              </View>
              <View style={styles.statCard}>
                <AppText style={styles.statNumber}>50+</AppText>
                <AppText style={styles.statLabel}>Host Partners</AppText>
              </View>
            </View>
          </View>
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
      paddingHorizontal: spacing.medium,
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
      marginBottom: spacing.medium,
    },
    trendingGrid: {
      gap: spacing.mediumLarge,
    },
    trendingCard: {
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
    trendingImageContainer: {
      position: 'relative',
    },
    trendingImage: {
      width: '100%',
      height: moderateScale(128),
      resizeMode: 'cover',
    },
    trendingBadge: {
      position: 'absolute',
      top: spacing.base,
      right: spacing.base,
      backgroundColor: colors.warning,
      paddingHorizontal: spacing.base,
      paddingVertical: spacing.xs,
      borderRadius: radius.xl,
    },
    trendingBadgeText: {
      fontSize: fontSize[12],
      color: colors.onPrimary,
      fontWeight: '600',
    },
    trendingContent: {
      padding: spacing.mediumLarge,
    },
    trendingTitle: {
      fontSize: fontSize[16],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.base,
    },
    trendingDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    trendingCategory: {
      fontSize: fontSize[14],
      color: colors.secondaryText,
    },
    trendingStats: {
      flexDirection: 'row',
      gap: spacing.smallMedium,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    statIcon: {
      fontSize: fontSize[14],
    },
    statText: {
      fontSize: fontSize[14],
      color: colors.secondaryText,
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryCard: {
      width: '48%',
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      marginBottom: spacing.smallMedium,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: moderateScale(1) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(2),
      elevation: 1,
    },
    categoryContent: {
      padding: spacing.mediumLarge,
      alignItems: 'center',
    },
    categoryIcon: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(24),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.smallMedium,
    },
    categoryIconText: {
      fontSize: fontSize[24],
    },
    categoryName: {
      fontSize: fontSize[14],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    categoryCount: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
    hostsGrid: {
      gap: spacing.mediumLarge,
    },
    hostCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      marginBottom: spacing.mediumLarge,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    hostContent: {
      padding: spacing.mediumLarge,
      flexDirection: 'row',
      alignItems: 'center',
    },
    hostAvatar: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(24),
      marginRight: spacing.mediumLarge,
    },
    hostInfo: {
      flex: 1,
    },
    hostName: {
      fontSize: fontSize[16],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    hostBio: {
      fontSize: fontSize[14],
      color: colors.secondaryText,
      marginBottom: spacing.base,
    },
    hostStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.mediumLarge,
    },
    hostEventCount: {
      fontSize: fontSize[14],
      color: colors.secondaryText,
    },
    hostRating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    ratingIcon: {
      fontSize: fontSize[14],
    },
    ratingText: {
      fontSize: fontSize[14],
      color: colors.secondaryText,
    },
    followButton: {
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.base,
      borderRadius: radius.lg,
    },
    statsCard: {
      backgroundColor: colors.info,
      borderRadius: radius.xl,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      padding: spacing.mediumLarge,
    },
    statsTitle: {
      fontSize: fontSize[18],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.medium,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statCard: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: fontSize[20],
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    statLabel: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
      textAlign: 'center',
    },
  });
};
