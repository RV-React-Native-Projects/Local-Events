import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { AppButton } from '@components/AppButton';
import { AppText } from '@components/AppText';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { opacity } from '@themes/opacity';
import { moderateScale } from '@themes/responsive';
import size from '@themes/size';
import { spacing } from '@themes/spacing';

export interface EventHost {
  name: string;
  avatar: string;
  initials: string;
}

export interface EventCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  categoryColor: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  attendees: number;
  maxAttendees: number;
  host: EventHost;
  price: string;
  style?: any;
  testID?: string;
  onPress?: (eventId: number) => void;
  onShare?: (eventId: number) => void;
  onJoin?: (eventId: number) => void;
}

export default function EventCard({
  id,
  title,
  description,
  image,
  category,
  categoryColor,
  date,
  time,
  location,
  distance,
  attendees,
  maxAttendees,
  host,
  price,
  onPress,
  onShare,
  onJoin,
  style,
  testID,
}: EventCardProps): React.ReactElement {
  const styles = useStyles();

  const handlePress = () => {
    onPress?.(id);
  };

  const handleShare = () => {
    onShare?.(id);
  };

  const handleJoin = () => {
    onJoin?.(id);
  };

  return (
    <TouchableOpacity
      style={[styles.eventCard, style]}
      onPress={handlePress}
      activeOpacity={opacity.dark}
      testID={testID}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: image }}
          style={styles.eventImage}
          resizeMode="cover"
        />
        <View
          style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
          <AppText variant="footnote10" color="white">
            {category}
          </AppText>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <MaterialIcons name="share" size={size.xs} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.eventContent}>
        <View style={styles.eventTitleContainer}>
          <AppText variant="title" color="text">
            {title}
          </AppText>
          <AppText variant="footnote" color="secondaryText" numberOfLines={2}>
            {description}
          </AppText>
        </View>
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <AppText style={styles.detailIcon}>📅</AppText>
            <AppText variant="footnote" color="secondaryText">
              {date} • {time}
            </AppText>
          </View>
          <View style={styles.detailRow}>
            <AppText style={styles.detailIcon}>📍</AppText>
            <AppText variant="footnote" color="secondaryText">
              {location}
            </AppText>
            <AppText variant="footnote" color="primary">
              • {distance}
            </AppText>
          </View>
          <View style={styles.detailRow}>
            <AppText style={styles.detailIcon}>👥</AppText>
            <AppText variant="footnote" color="secondaryText">
              {attendees}/{maxAttendees} attending
            </AppText>
            <AppText variant="footnote" color="success">
              • {price}
            </AppText>
          </View>
        </View>

        {/* Host Info */}
        <View style={styles.hostSection}>
          <View style={styles.hostInfo}>
            <FastImage
              source={{ uri: host.avatar }}
              style={styles.hostAvatar}
              resizeMode="cover"
            />
            <AppText variant="footnote" color="secondaryText">
              Hosted by{' '}
              <AppText
                variant="footnote"
                fontFamily="Bold"
                color="secondaryText">
                {host.name}
              </AppText>
            </AppText>
          </View>
          <AppButton
            title="Join"
            onPress={handleJoin}
            size="mini-button"
            color="secondary"
            style={styles.joinButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const useStyles = () => {
  const { colors, shadow } = useAppTheme();
  return StyleSheet.create({
    eventCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.sm,
      overflow: 'hidden',
      // marginVertical: spacing.base,
      ...shadow.regular,
    },
    imageContainer: {
      position: 'relative',
    },
    eventImage: {
      width: '100%',
      height: moderateScale(180),
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
    eventTitleContainer: {
      gap: spacing.base,
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
      borderRadius: radius.round,
      marginRight: spacing.smallMedium,
    },
    joinButton: { borderRadius: radius.sm },
  });
};
