import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AppButton } from '@components/AppButton';
import { AppText } from '@components/AppText';
import { useAppTheme } from '@redux/hooks';
import { radius, border } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

export interface FeaturedHostCardProps {
  id: number;
  name: string;
  bio: string;
  events: number;
  rating: number;
  avatar: string;
  onPress?: (hostId: number) => void;
  onFollow?: (hostId: number) => void;
  style?: any;
  testID?: string;
}

const FeaturedHostCard: React.FC<FeaturedHostCardProps> = ({
  id,
  name,
  bio,
  events,
  rating,
  avatar,
  onPress,
  onFollow,
  style,
  testID,
}) => {
  const styles = useStyles();

  const handlePress = () => {
    onPress?.(id);
  };

  const handleFollow = () => {
    onFollow?.(id);
  };

  return (
    <TouchableOpacity
      style={[styles.hostCard, style]}
      onPress={handlePress}
      activeOpacity={0.8}
      testID={testID}>
      <View style={styles.hostContent}>
        <FastImage
          source={{ uri: avatar }}
          style={styles.hostAvatar}
          resizeMode="cover"
        />
        <View style={styles.hostInfo}>
          <AppText variant="label">{name}</AppText>
          <AppText variant="footnote">{bio}</AppText>
          <View style={styles.hostStats}>
            <AppText style={styles.hostEventCount}>{events} events</AppText>
            <View style={styles.hostRating}>
              <AppText style={styles.ratingIcon}>⭐</AppText>
              <AppText style={styles.ratingText}>{rating}</AppText>
            </View>
          </View>
        </View>
        <AppButton
          color="success"
          variant="outline"
          title="Follow"
          onPress={handleFollow}
          style={styles.followButton}
          size="mini-button"
        />
      </View>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
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
      borderRadius: radius.lg,
    },
  });
};

export default FeaturedHostCard;
