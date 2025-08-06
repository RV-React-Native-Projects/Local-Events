import { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { AppButton, SegmentButton } from '@components/AppButton';
import { AppText } from '@components/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import { categories, ICategoriesData } from '@constants/interestData';
import {
  InterestNavigationProps,
  InterestRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppDispatch, useAppTheme } from '@redux/hooks';
import { toggleAuth } from '@slice/userSlice';
import { radius, border } from '@themes/border';
import { moderateScale } from '@themes/responsive';
import size from '@themes/size';
import { spacing } from '@themes/spacing';

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<ICategoriesData>,
);

export default function Interests({}: ScreenPropsType<
  InterestNavigationProps,
  InterestRouteProp
>) {
  const styles = useStyles();
  const storeDispatch = useAppDispatch();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('cards');
  const scrollY = useRef(new Animated.Value(0)).current;

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
    storeDispatch(toggleAuth());
  };

  const renderCategoryCard = (
    category: (typeof categories)[0],
    index: number,
  ) => {
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
            <MaterialIcons name={category.icon} size={size[20]} color="white" />
          </View>

          <View style={styles.cardText}>
            <AppText
              variant="title3"
              color={isSelected ? 'primary' : 'text'}
              style={styles.categoryName}>
              {category.name}
            </AppText>
            <AppText
              variant="footnote"
              color="secondaryText"
              numberOfLines={2}
              style={styles.categoryDescription}>
              {category.description}
            </AppText>

            <View style={styles.examplesContainer}>
              {category.examples.slice(0, 2).map((example: string) => (
                <View
                  key={example}
                  style={[styles.exampleTag, isSelected && styles.selectedTag]}>
                  <AppText
                    variant="footnote10"
                    color={isSelected ? 'primary' : 'secondaryText'}>
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

  const renderCategoryGrid = (
    category: (typeof categories)[0],
    index: number,
  ) => {
    const isSelected = selectedCategories.includes(category.id);

    return (
      <TouchableOpacity
        key={category.id + index}
        style={[styles.gridCard, isSelected && styles.selectedGridCard]}
        onPress={() => toggleCategory(category.id)}
        activeOpacity={0.7}>
        <View
          style={[styles.gridIconContainer, isSelected && styles.selectedIcon]}>
          <MaterialIcons name={category.icon} size={size[20]} color="white" />
        </View>
        <AppText
          variant="label"
          color={isSelected ? 'primary' : 'text'}
          textAlign="center"
          numberOfLines={2}>
          {category.name}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper scrollEnabled={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <AppText variant="title1" color="text">
              Choose Your Interests
            </AppText>
            <AppText variant="subhead" color="secondaryText">
              Select what excites you most
            </AppText>
          </View>
          <SegmentButton
            items={[
              { key: 'cards', value: 'Cards' },
              { key: 'grid', value: 'Grid' },
            ]}
            onPress={val => setViewMode(val as typeof viewMode)}
          />
        </View>
        <View style={styles.selectedCount}>
          <View style={styles.badge}>
            <AppText variant="label" color="primary">
              ✨ {selectedCategories.length} interests selected
            </AppText>
          </View>
        </View>

        <AnimatedFlatList
          data={categories}
          renderItem={({
            item,
            index,
          }: {
            item: (typeof categories)[0];
            index: number;
          }) =>
            viewMode === 'cards'
              ? renderCategoryCard(item, index)
              : renderCategoryGrid(item, index)
          }
          keyExtractor={item => item.id}
          style={styles.scrollView}
          contentContainerStyle={
            viewMode === 'cards' ? styles.cardsContainer : styles.gridContainer
          }
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
        />

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
            <AppText
              variant="footnote"
              color="secondaryText"
              textAlign="center">
              Select at least one interest to continue
            </AppText>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    header: {
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.small,
      borderBottomWidth: border.normal,
      borderBottomColor: 'transparent',
    },
    headerContent: {
      marginBottom: spacing.small,
    },
    selectedCount: {
      alignItems: 'center',
      paddingVertical: spacing.small,
    },
    badge: {
      backgroundColor: colors.info,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.xs,
      borderRadius: moderateScale(20),
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: spacing.mediumLarge,
    },
    cardsContainer: {
      paddingVertical: spacing.mediumLarge,
    },
    gridContainer: {
      paddingVertical: spacing.mediumLarge,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.mediumLarge,
      marginBottom: spacing.small,
      borderWidth: border.thick,
      borderColor: colors.inputBorder,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    selectedCard: {
      borderColor: colors.primary,
      backgroundColor: colors.info,
      transform: [{ scale: 1.02 }],
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    iconContainer: {
      width: moderateScale(56),
      height: moderateScale(56),
      borderRadius: radius.xl,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.mediumLarge,
    },
    selectedIcon: {
      backgroundColor: colors.primary,
    },
    cardText: {
      flex: 1,
    },
    categoryName: {
      marginBottom: spacing.xs,
    },
    categoryDescription: {
      marginBottom: spacing.small,
      lineHeight: moderateScale(20),
    },
    examplesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
    },
    exampleTag: {
      backgroundColor: colors.appBackgroundColor,
      paddingHorizontal: spacing.small,
      paddingVertical: spacing.xs,
      borderRadius: radius.xl,
    },
    selectedTag: {
      backgroundColor: colors.info,
    },
    gridCard: {
      width: '48%',
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.lg,
      padding: spacing.small,
      marginBottom: spacing.small,
      borderWidth: border.thick,
      borderColor: colors.inputBorder,
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: moderateScale(1) },
      shadowOpacity: 0.1,
      shadowRadius: moderateScale(2),
      elevation: 1,
    },
    selectedGridCard: {
      borderColor: colors.primary,
      backgroundColor: colors.info,
      transform: [{ scale: 1.05 }],
    },
    gridIconContainer: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: radius.lg,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xs,
    },
    buttonContainer: {
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.mediumLarge,
      backgroundColor: colors.backgroundColor,
      borderTopWidth: border.normal,
      borderTopColor: colors.inputBorder,
    },
    continueButton: {
      backgroundColor: colors.primary,
      borderRadius: radius.xl,
      paddingVertical: spacing.mediumLarge,
    },
  });
};
