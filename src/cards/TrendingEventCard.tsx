import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AppText } from '@components/AppText';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { opacity } from '@themes/opacity';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

export interface TrendingEventCardProps {
  id: number;
  title: string;
  category: string;
  attendees: number;
  rating: number;
  trending: boolean;
  image: string;
  onPress?: (eventId: number) => void;
  style?: any;
  testID?: string;
}

const TrendingEventCard: React.FC<TrendingEventCardProps> = ({
  id,
  title,
  category,
  attendees,
  rating,
  trending,
  image,
  onPress,
  style,
  testID,
}) => {
  const styles = useStyles();

  const handlePress = () => {
    onPress?.(id);
  };

  return (
    <TouchableOpacity
      key={id}
      style={[styles.trendingCard, style]}
      onPress={handlePress}
      activeOpacity={opacity.dark}
      testID={testID}>
      <View style={styles.trendingImageContainer}>
        <FastImage
          source={{ uri: image }}
          style={styles.trendingImage}
          resizeMode="cover"
        />
        {trending && (
          <View style={styles.trendingBadge}>
            <AppText>🔥</AppText>
          </View>
        )}
      </View>
      <View style={styles.trendingContent}>
        <AppText variant="title3" numberOfLines={2}>
          {title}
        </AppText>
        <View style={styles.trendingDetails}>
          <AppText color="border">{category}</AppText>
          <View style={styles.trendingStats}>
            <View style={styles.statItem}>
              <AppText>👥</AppText>
              <AppText>{attendees}</AppText>
            </View>
            <View style={styles.statItem}>
              <AppText>⭐</AppText>
              <AppText>{rating}</AppText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { colors, shadow } = useAppTheme();
  return StyleSheet.create({
    trendingCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.sm,
      ...shadow.small,
    },
    trendingImageContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: radius.sm,
    },
    trendingImage: {
      width: '100%',
      height: moderateScale(128),
    },
    trendingBadge: {
      position: 'absolute',
      top: spacing.base,
      right: spacing.base,
      backgroundColor: '#FFFFFF60',
      padding: spacing.small,
      borderRadius: radius.round,
    },

    trendingContent: {
      padding: spacing.mediumLarge,
    },

    trendingDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    trendingStats: {
      flexDirection: 'row',
      gap: spacing.smallMedium,
    },
    statItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.xs,
    },
  });
};

export default TrendingEventCard;
