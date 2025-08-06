/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import AppButton from '@components/AppButton/AppButton';
import AppText from '@components/AppText/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  EventDetailsNavigationProps,
  EventDetailsRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { radius, border } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

// Mock data
const mockEventDetails = {
  id: 1,
  title: 'Acoustic Poetry Night',
  description:
    "Join us for an intimate evening of spoken word and acoustic music at the cozy Corner Café. We'll have local poets sharing their latest work, followed by an open mic session where anyone can participate.",
  longDescription:
    'This monthly gathering has become a beloved tradition in our neighborhood. We believe in the power of words and music to bring people together, spark conversations, and inspire creativity.',
  image:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop',
  category: 'Music & Poetry',
  date: 'Tonight, Oct 24',
  time: '7:00 PM - 10:00 PM',
  location: 'Corner Café',
  address: '1847 14th St NW, Washington, DC 20009',
  distance: '0.3 miles away',
  attendees: 12,
  maxAttendees: 20,
  price: 'Free',
  host: {
    name: 'Sarah Chen',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    initials: 'SC',
    bio: 'Poet and community organizer who loves bringing people together through art.',
    eventsHosted: 15,
    rating: 4.9,
  },
  attendeesData: [
    {
      name: 'Alex Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      initials: 'AJ',
    },
    {
      name: 'Maria Garcia',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      initials: 'MG',
    },
    {
      name: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      initials: 'DK',
    },
  ],
  isLiked: false,
  isJoined: false,
  tags: ['Poetry', 'Open Mic', 'Community', 'Beginner Friendly'],
  rules: [
    'Respect all performers and audience members',
    'Keep performances under 5 minutes during open mic',
    'No offensive or discriminatory content',
    'Food and drinks available for purchase',
  ],
};

export default function EventDetails({}: ScreenPropsType<
  EventDetailsNavigationProps,
  EventDetailsRouteProp
>) {
  const styles = useStyles();
  const [isLiked, setIsLiked] = useState(mockEventDetails.isLiked);
  const [isJoined, setIsJoined] = useState(mockEventDetails.isJoined);
  const [showAllAttendees, setShowAllAttendees] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleJoin = () => {
    setIsJoined(!isJoined);
  };

  const handleShare = () => {
    Alert.alert('Share', 'Event shared successfully!');
  };

  const handleMessage = () => {
    Alert.alert('Message', 'Opening chat with host...');
  };

  const handleDirections = () => {
    Alert.alert('Directions', 'Opening maps...');
  };

  const AttendeeAvatar = ({
    attendee,
    index,
  }: {
    attendee: any;
    index: number;
  }) => (
    <View
      style={[
        styles.attendeeAvatar,
        index > 0 ? styles.attendeeOverlap : null,
      ]}>
      <Image source={{ uri: attendee.avatar }} style={styles.attendeeImage} />
    </View>
  );

  const EventDetailItem = ({
    title,
    subtitle,
    extra,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    extra?: string;
  }) => (
    <View style={styles.detailItem}>
      <View style={styles.detailIconContainer}>
        {/* Icon placeholder */}
        <View style={styles.detailIcon} />
      </View>
      <View style={styles.detailContent}>
        <AppText variant="body" color="text" style={styles.detailTitle}>
          {title}
        </AppText>
        {subtitle && (
          <AppText
            variant="footnote"
            color="secondaryText"
            style={styles.detailSubtitle}>
            {subtitle}
          </AppText>
        )}
        {extra && (
          <AppText variant="footnote" color="primary">
            {extra}
          </AppText>
        )}
      </View>
    </View>
  );

  const TagBadge = ({ tag }: { tag: string }) => (
    <View style={styles.tagBadge}>
      <AppText variant="footnote" color="secondaryText" style={styles.tagText}>
        {tag}
      </AppText>
    </View>
  );

  return (
    <ScreenWrapper scrollEnabled>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            {/* Back arrow placeholder */}
            <View style={styles.backIcon} />
          </TouchableOpacity>
          <AppText
            variant="title"
            color="text"
            numberOfLines={1}
            style={styles.headerTitle}>
            Event Details
          </AppText>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleLike} style={styles.headerButton}>
            {/* Heart icon placeholder */}
            <View
              style={[
                styles.headerIcon,
                isLiked ? styles.likedIcon : styles.unlikedIcon,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
            {/* Share icon placeholder */}
            <View style={[styles.headerIcon, styles.unlikedIcon]} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: mockEventDetails.image }}
            style={styles.eventImage}
          />
          <View style={styles.categoryBadge}>
            <AppText
              variant="footnote"
              color="primary"
              style={styles.categoryText}>
              {mockEventDetails.category}
            </AppText>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Main Content Card */}
          <View style={styles.eventInfo}>
            {/* Title and Description */}
            <View style={styles.titleSection}>
              <AppText variant="title" color="text" style={styles.eventTitle}>
                {mockEventDetails.title}
              </AppText>
              <AppText
                variant="body"
                color="secondaryText"
                style={styles.eventDescription}>
                {mockEventDetails.description}
              </AppText>
              <AppText
                variant="body"
                color="secondaryText"
                style={styles.longDescription}>
                {mockEventDetails.longDescription}
              </AppText>
            </View>

            {/* Event Details */}
            <View style={styles.detailsSection}>
              <EventDetailItem
                icon="calendar"
                title={mockEventDetails.date}
                subtitle={mockEventDetails.time}
              />
              <EventDetailItem
                icon="location"
                title={mockEventDetails.location}
                subtitle={mockEventDetails.address}
                extra={mockEventDetails.distance}
              />
              <EventDetailItem
                icon="users"
                title={`${mockEventDetails.attendees}/${mockEventDetails.maxAttendees} attending`}
                extra={mockEventDetails.price}
              />
            </View>

            {/* Tags */}
            <View style={styles.tagsSection}>
              <AppText variant="body" color="text" style={styles.tagsTitle}>
                Tags
              </AppText>
              <View style={styles.tagsContainer}>
                {mockEventDetails.tags.map(tag => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Host Information */}
            <View style={styles.hostSection}>
              <AppText variant="title" color="text" style={styles.hostTitle}>
                Hosted by
              </AppText>
              <View style={styles.hostContent}>
                <Image
                  source={{ uri: mockEventDetails.host.avatar }}
                  style={styles.hostAvatar}
                />
                <View style={styles.hostInfo}>
                  <AppText variant="body" color="text" style={styles.hostName}>
                    {mockEventDetails.host.name}
                  </AppText>
                  <AppText
                    variant="footnote"
                    color="secondaryText"
                    style={styles.hostBio}>
                    {mockEventDetails.host.bio}
                  </AppText>
                  <View style={styles.hostStats}>
                    <AppText variant="footnote" color="secondaryText">
                      {mockEventDetails.host.eventsHosted} events hosted
                    </AppText>
                    <AppText variant="footnote" color="secondaryText">
                      ⭐ {mockEventDetails.host.rating}
                    </AppText>
                  </View>
                </View>
                <AppButton
                  title="Message"
                  variant="outline"
                  size="compact"
                  onPress={handleMessage}
                />
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Attendees */}
            <View style={styles.attendeesSection}>
              <View style={styles.attendeesHeader}>
                <AppText variant="title" color="text">
                  Who&apos;s going ({mockEventDetails.attendees})
                </AppText>
                <TouchableOpacity
                  onPress={() => setShowAllAttendees(!showAllAttendees)}>
                  <AppText variant="body" color="primary">
                    {showAllAttendees ? 'Show less' : 'See all'}
                  </AppText>
                </TouchableOpacity>
              </View>
              <View style={styles.attendeesList}>
                {mockEventDetails.attendeesData
                  .slice(0, showAllAttendees ? undefined : 6)
                  .map((attendee, index) => (
                    <AttendeeAvatar
                      key={index}
                      attendee={attendee}
                      index={index}
                    />
                  ))}
                {mockEventDetails.attendees > 6 && !showAllAttendees && (
                  <View style={styles.moreAttendees}>
                    <AppText
                      variant="footnote"
                      color="secondaryText"
                      style={styles.moreText}>
                      +{mockEventDetails.attendees - 6}
                    </AppText>
                  </View>
                )}
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Event Rules */}
            <View style={styles.rulesSection}>
              <AppText variant="title" color="text" style={styles.rulesTitle}>
                Event Guidelines
              </AppText>
              {mockEventDetails.rules.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <View style={styles.ruleBullet} />
                  <AppText
                    variant="footnote"
                    color="secondaryText"
                    style={styles.ruleText}>
                    {rule}
                  </AppText>
                </View>
              ))}
            </View>
          </View>

          {/* Location Card */}
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <AppText variant="title" color="text">
                Location
              </AppText>
              <AppButton
                title="Directions"
                variant="outline"
                size="compact"
                onPress={handleDirections}
              />
            </View>
            <View style={styles.mapContainer}>
              <AppText
                variant="footnote"
                color="secondaryText"
                style={styles.mapText}>
                Map View (Integration with Maps API)
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <View style={styles.ctaButtons}>
          <AppButton
            title={isJoined ? 'Cancel RSVP' : 'RSVP for Free'}
            variant="outline"
            style={styles.ctaButton}
            onPress={handleJoin}
          />
          <AppButton
            title={isJoined ? "You're Going!" : 'Join Event'}
            style={styles.ctaButton}
            onPress={handleJoin}
          />
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
      backgroundColor: colors.appBackgroundColor,
    },
    header: {
      backgroundColor: colors.backgroundColor,
      borderBottomWidth: border.normal,
      borderBottomColor: colors.inputBorder,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.medium,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      padding: spacing.small,
      borderRadius: radius.lg,
      marginRight: spacing.medium,
    },
    backIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
      backgroundColor: colors.borderAlt,
      borderRadius: moderateScale(10),
    },
    headerTitle: {
      flex: 1,
    },
    headerActions: {
      flexDirection: 'row',
      gap: spacing.small,
    },
    headerButton: {
      padding: spacing.small,
      borderRadius: radius.lg,
    },
    headerIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(10),
    },
    likedIcon: {
      backgroundColor: colors.error,
    },
    unlikedIcon: {
      backgroundColor: colors.borderAlt,
    },

    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: spacing.mediumLarge,
    },
    contentContainer: {
      padding: spacing.mediumLarge,
    },
    titleSection: {
      marginBottom: spacing.large,
    },
    longDescription: {
      lineHeight: moderateScale(20),
    },
    divider: {
      height: border.normal,
      backgroundColor: colors.borderAlt,
      marginVertical: spacing.large,
    },
    imageContainer: {
      position: 'relative',
      marginBottom: spacing.large,
    },
    eventImage: {
      width: '100%',
      height: moderateScale(200),
      borderRadius: radius.xl,
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: radius.xl,
    },
    categoryBadge: {
      position: 'absolute',
      top: spacing.small,
      left: spacing.small,
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.small,
      paddingVertical: spacing.xs,
      borderRadius: radius.xl,
    },
    categoryText: {
      fontSize: fontSize[12],
      fontWeight: '600',
      color: colors.onPrimary,
    },
    eventInfo: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    eventTitle: {
      fontSize: fontSize[24],
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: spacing.small,
    },
    eventDescription: {
      fontSize: fontSize[14],
      color: colors.secondaryText,
      lineHeight: moderateScale(20),
      marginBottom: spacing.medium,
    },
    hostSection: {
      marginBottom: spacing.large,
    },
    hostTitle: {
      marginBottom: spacing.medium,
    },
    hostContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    hostName: {
      marginBottom: spacing.small,
    },
    hostBio: {
      marginBottom: spacing.small,
    },
    hostStats: {
      flexDirection: 'row',
      gap: spacing.medium,
    },
    hostAvatar: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(24),
      marginRight: spacing.medium,
    },
    hostInfo: {
      flex: 1,
    },

    actionButtons: {
      flexDirection: 'row',
      gap: spacing.medium,
      marginBottom: spacing.large,
    },
    actionButton: {
      flex: 1,
    },
    detailsSection: {
      marginBottom: spacing.large,
    },
    detailsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    detailsTitle: {
      fontSize: fontSize[18],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.medium,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    detailIconContainer: {
      marginRight: spacing.medium,
      marginTop: spacing.small,
    },
    detailIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
      backgroundColor: colors.borderAlt,
      borderRadius: moderateScale(10),
    },
    detailContent: {
      flex: 1,
    },
    detailTitle: {
      fontSize: fontSize[14],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    detailSubtitle: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
    attendeesSection: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    attendeesHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    attendeesTitle: {
      fontSize: fontSize[18],
      fontWeight: '600',
      color: colors.text,
    },
    attendeesCount: {
      fontSize: fontSize[14],
      color: colors.secondaryText,
    },
    attendeesList: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    attendeeAvatar: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      borderWidth: border.thick,
      borderColor: colors.backgroundColor,
      overflow: 'hidden',
    },
    attendeeImage: {
      width: '100%',
      height: '100%',
    },
    attendeeOverlap: {
      marginLeft: -spacing.xs,
    },
    moreAttendees: {
      width: moderateScale(32),
      height: moderateScale(32),
      borderRadius: moderateScale(16),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -spacing.xs,
    },
    moreText: {
      fontSize: fontSize[10],
      fontWeight: '600',
      color: colors.onPrimary,
    },
    tagsSection: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    tagsTitle: {
      fontSize: fontSize[18],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.medium,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.small,
    },
    tagBadge: {
      backgroundColor: colors.info,
      paddingHorizontal: spacing.medium,
      paddingVertical: spacing.xs,
      borderRadius: radius.xl,
    },
    tagText: {
      fontSize: fontSize[12],
      color: colors.primary,
      fontWeight: '500',
    },
    rulesSection: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    rulesTitle: {
      fontSize: fontSize[18],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.medium,
    },
    ruleItem: {
      flexDirection: 'row',
      marginBottom: spacing.small,
    },
    ruleBullet: {
      width: moderateScale(6),
      height: moderateScale(6),
      backgroundColor: colors.borderAlt,
      borderRadius: moderateScale(3),
      marginTop: spacing.small,
      marginRight: spacing.small,
    },
    ruleText: {
      flex: 1,
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
    locationCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    locationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    locationTitle: {
      fontSize: fontSize[18],
      fontWeight: '600',
      color: colors.text,
    },
    mapContainer: {
      backgroundColor: colors.background,
      height: moderateScale(120),
      borderRadius: radius.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapText: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
    bottomCTA: {
      backgroundColor: colors.backgroundColor,
      borderTopWidth: border.normal,
      borderTopColor: colors.inputBorder,
      paddingHorizontal: spacing.mediumLarge,
      paddingVertical: spacing.medium,
    },
    ctaButtons: {
      flexDirection: 'row',
      gap: spacing.medium,
    },
    ctaButton: {
      flex: 1,
    },
  });
};
