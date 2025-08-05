import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppButton } from '@components/AppButton';
import { AppText } from '@components/AppText';
import {
  InterestNavigationProps,
  InterestRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { lightTheme } from '@themes/colors';
import size from '@themes/size';
import { spacing } from '@themes/spacing';

const categories = [
  {
    id: 'music',
    name: 'Music & Audio',
    icon: 'home',
    description: 'Live performances, jam sessions, karaoke nights',
    examples: ['Jazz nights', 'Open mic', 'Concerts'],
  },
  {
    id: 'coffee',
    name: 'Coffee & Chat',
    icon: 'home',
    description: 'Casual meetups, networking, conversations',
    examples: ['Coffee talks', 'Networking', 'Book clubs'],
  },
  {
    id: 'art',
    name: 'Arts & Crafts',
    icon: 'home',
    description: 'Creative workshops, painting, DIY projects',
    examples: ['Painting', 'Pottery', 'Crafting'],
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: 'camera',
    description: 'Photo walks, exhibitions, technique sharing',
    examples: ['Photo walks', 'Exhibitions', 'Workshops'],
  },
  {
    id: 'reading',
    name: 'Books & Poetry',
    icon: 'home',
    description: 'Literary discussions, poetry readings',
    examples: ['Book clubs', 'Poetry', 'Readings'],
  },
  {
    id: 'games',
    name: 'Games & Sports',
    icon: 'home',
    description: 'Board games, chess, casual sports',
    examples: ['Chess', 'Board games', 'Sports'],
  },
  {
    id: 'food',
    name: 'Food & Cooking',
    icon: 'home',
    description: 'Cooking classes, food tours, dining',
    examples: ['Cooking', 'Food tours', 'Tastings'],
  },
  {
    id: 'tech',
    name: 'Tech & Innovation',
    icon: 'home',
    description: 'Coding meetups, startup events, demos',
    examples: ['Coding', 'Startups', 'Tech talks'],
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    icon: 'home',
    description: 'Yoga classes, running groups, meditation',
    examples: ['Yoga', 'Running', 'Meditation'],
  },
  {
    id: 'social',
    name: 'Social Impact',
    icon: 'home',
    description: 'Volunteering, community service, charity',
    examples: ['Volunteering', 'Charity', 'Community'],
  },
  {
    id: 'music-production',
    name: 'Music Production',
    icon: 'home',
    description: 'Beat making, mixing, electronic music',
    examples: ['Beat making', 'Mixing', 'Electronic'],
  },
  {
    id: 'business',
    name: 'Business & Career',
    icon: 'home',
    description: 'Professional networking, career development',
    examples: ['Networking', 'Career', 'Business'],
  },
  {
    id: 'learning',
    name: 'Learning & Education',
    icon: 'home',
    description: 'Workshops, skill sharing, study groups',
    examples: ['Workshops', 'Skills', 'Study groups'],
  },
  {
    id: 'outdoor',
    name: 'Outdoor Adventures',
    icon: 'home',
    description: 'Hiking, picnics, nature exploration',
    examples: ['Hiking', 'Picnics', 'Nature'],
  },
  {
    id: 'nightlife',
    name: 'Nightlife & Entertainment',
    icon: 'home',
    description: 'Parties, clubs, evening entertainment',
    examples: ['Parties', 'Clubs', 'Entertainment'],
  },
  {
    id: 'community',
    name: 'Community Building',
    icon: 'home',
    description: 'Local initiatives, neighborhood events',
    examples: ['Local events', 'Initiatives', 'Neighbors'],
  },
];

export default function Interests({}: ScreenPropsType<
  InterestNavigationProps,
  InterestRouteProp
>) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('cards');

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleContinue = () => {
    // Handle continue logic here
    console.log('Selected categories:', selectedCategories);
  };

  const renderCategoryCard = (category: any, index: number) => {
    const isSelected = selectedCategories.includes(category.id);

    return (
      <TouchableOpacity
        key={category.id + index}
        style={[styles.categoryCard, isSelected && styles.selectedCard]}
        onPress={() => toggleCategory(category.id)}
        activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <View
            style={[styles.iconContainer, isSelected && styles.selectedIcon]}>
            {/* <AppIcon icon={category.icon} iconSize="md" color="white" /> */}
          </View>

          <View style={styles.cardText}>
            <AppText
              style={[styles.categoryName, isSelected && styles.selectedText]}>
              {category.name}
            </AppText>
            <AppText style={styles.categoryDescription} numberOfLines={2}>
              {category.description}
            </AppText>

            <View style={styles.examplesContainer}>
              {category.examples.slice(0, 2).map((example: string) => (
                <View
                  key={example}
                  style={[styles.exampleTag, isSelected && styles.selectedTag]}>
                  <AppText
                    style={[
                      styles.exampleText,
                      isSelected && styles.selectedTagText,
                    ]}>
                    {example}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryGrid = (category: any, index: number) => {
    const isSelected = selectedCategories.includes(category.id);

    return (
      <TouchableOpacity
        key={category.id + index}
        style={[styles.gridCard, isSelected && styles.selectedGridCard]}
        onPress={() => toggleCategory(category.id)}
        activeOpacity={0.7}>
        <View
          style={[styles.gridIconContainer, isSelected && styles.selectedIcon]}>
          {/* <AppIcon icon={category.icon} iconSize="sm" color="white" /> */}
        </View>
        <AppText
          style={[styles.gridCategoryName, isSelected && styles.selectedText]}
          numberOfLines={2}>
          {category.name}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <AppText style={styles.title}>Choose Your Interests</AppText>
          <AppText style={styles.subtitle}>
            Select what excites you most
          </AppText>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'cards' && styles.activeToggle,
            ]}
            onPress={() => setViewMode('cards')}>
            <AppText
              style={[
                styles.toggleText,
                viewMode === 'cards' && styles.activeToggleText,
              ]}>
              Cards
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'grid' && styles.activeToggle,
            ]}
            onPress={() => setViewMode('grid')}>
            <AppText
              style={[
                styles.toggleText,
                viewMode === 'grid' && styles.activeToggleText,
              ]}>
              Grid
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Count */}
      <View style={styles.selectedCount}>
        <View style={styles.badge}>
          <AppText style={styles.badgeText}>
            ✨ {selectedCategories.length} interests selected
          </AppText>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View
          style={
            viewMode === 'cards' ? styles.cardsContainer : styles.gridContainer
          }>
          {categories.map((category, index) =>
            viewMode === 'cards'
              ? renderCategoryCard(category, index)
              : renderCategoryGrid(category, index),
          )}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <AppButton
          title={`Continue ${
            selectedCategories.length > 0
              ? `(${selectedCategories.length})`
              : ''
          }`}
          onPress={handleContinue}
          disabled={selectedCategories.length === 0}
          style={styles.continueButton}
        />

        {selectedCategories.length === 0 && (
          <AppText style={styles.helperText}>
            Select at least one interest to continue
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerContent: {
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: size.lg,
    fontWeight: 'bold',
    color: lightTheme.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: size.sm,
    color: lightTheme.secondaryText,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: size.xs,
    color: lightTheme.secondaryText,
  },
  activeToggleText: {
    color: lightTheme.text,
    fontWeight: '600',
  },
  selectedCount: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  badge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  badgeText: {
    color: '#1d4ed8',
    fontSize: size.sm,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  cardsContainer: {
    paddingVertical: spacing.md,
  },
  gridContainer: {
    paddingVertical: spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: [{ scale: 1.02 }],
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  selectedIcon: {
    backgroundColor: '#1d4ed8',
  },
  cardText: {
    flex: 1,
  },
  categoryName: {
    fontSize: size.md,
    fontWeight: '600',
    color: lightTheme.text,
    marginBottom: spacing.xs,
  },
  selectedText: {
    color: '#1e40af',
  },
  categoryDescription: {
    fontSize: size.sm,
    color: lightTheme.secondaryText,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  exampleTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  selectedTag: {
    backgroundColor: '#dbeafe',
  },
  exampleText: {
    fontSize: size.xs,
    color: lightTheme.secondaryText,
  },
  selectedTagText: {
    color: '#1d4ed8',
  },
  gridCard: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedGridCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: [{ scale: 1.05 }],
  },
  gridIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  gridCategoryName: {
    fontSize: size.xs,
    fontWeight: '500',
    color: lightTheme.text,
    textAlign: 'center',
    lineHeight: 16,
  },
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  continueButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: spacing.md,
  },
  helperText: {
    textAlign: 'center',
    color: lightTheme.secondaryText,
    fontSize: size.xs,
    marginTop: spacing.sm,
  },
});
