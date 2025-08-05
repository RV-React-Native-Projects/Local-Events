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
import { lightTheme } from '@themes/colors';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerContent: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
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
    color: '#6b7280',
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 0,
    height: 48,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: lightTheme.text,
    marginBottom: 16,
  },
  trendingGrid: {
    gap: 16,
  },
  trendingCard: {
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
  trendingImageContainer: {
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: 128,
    resizeMode: 'cover',
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#f97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingBadgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  trendingContent: {
    padding: 16,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: lightTheme.text,
    marginBottom: 8,
  },
  trendingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendingCategory: {
    fontSize: 14,
    color: lightTheme.secondaryText,
  },
  trendingStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    fontSize: 14,
    color: lightTheme.secondaryText,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryContent: {
    padding: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: lightTheme.text,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: lightTheme.secondaryText,
  },
  hostsGrid: {
    gap: 16,
  },
  hostCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hostContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: lightTheme.text,
    marginBottom: 4,
  },
  hostBio: {
    fontSize: 14,
    color: lightTheme.secondaryText,
    marginBottom: 8,
  },
  hostStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  hostEventCount: {
    fontSize: 14,
    color: lightTheme.secondaryText,
  },
  hostRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingIcon: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    color: lightTheme.secondaryText,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statsCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: lightTheme.text,
    marginBottom: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: lightTheme.secondaryText,
    textAlign: 'center',
  },
});
