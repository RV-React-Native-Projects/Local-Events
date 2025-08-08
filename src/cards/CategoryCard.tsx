import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@components/AppText';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

export interface CategoryCardProps {
  icon: string;
  name: string;
  count: number;
  color: string;
  onPress?: () => void;
  style?: any;
  testID?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  name,
  count,
  color,
  onPress,
  style,
  testID,
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.categoryCard, style]}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}>
      <View style={styles.categoryContent}>
        <View style={[styles.categoryIcon, { backgroundColor: color }]}>
          <AppText>{icon}</AppText>
        </View>
        <AppText variant="title">{name}</AppText>
        <AppText variant="footnote" color="secondary">
          {count} events
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { colors, shadow } = useAppTheme();
  return StyleSheet.create({
    categoryCard: {
      width: '48%',
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.sm,
      marginBottom: spacing.smallMedium,
      ...shadow.small,
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
    categoryCount: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
  });
};

export default CategoryCard;
