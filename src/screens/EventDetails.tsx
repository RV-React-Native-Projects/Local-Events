/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import AppButton from '@components/AppButton/AppButton';
import AppText from '@components/AppText/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  EventDetailsNavigationProps,
  EventDetailsRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
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
  const { colors } = useAppTheme();
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
      style={{
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        borderWidth: 2,
        borderColor: colors.white,
        marginLeft: index > 0 ? -spacing.small : 0,
        overflow: 'hidden',
      }}>
      <Image
        source={{ uri: attendee.avatar }}
        style={{ width: '100%', height: '100%' }}
      />
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.medium,
      }}>
      <View style={{ marginRight: spacing.medium, marginTop: spacing.small }}>
        {/* Icon placeholder */}
        <View
          style={{
            width: moderateScale(20),
            height: moderateScale(20),
            backgroundColor: colors.borderAlt,
            borderRadius: moderateScale(10),
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <AppText
          variant="body"
          color="text"
          style={{ marginBottom: spacing.small }}>
          {title}
        </AppText>
        {subtitle && (
          <AppText
            variant="footnote"
            color="secondaryText"
            style={{ marginBottom: spacing.small }}>
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
    <View
      style={{
        backgroundColor: colors.background,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
        borderRadius: moderateScale(12),
        marginRight: spacing.small,
        marginBottom: spacing.small,
      }}>
      <AppText
        variant="footnote"
        color="secondaryText"
        style={{ fontSize: moderateScale(10) }}>
        {tag}
      </AppText>
    </View>
  );

  return (
    <ScreenWrapper scrollEnabled>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderAlt,
          paddingHorizontal: spacing.mediumLarge,
          paddingVertical: spacing.medium,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              padding: spacing.small,
              borderRadius: moderateScale(8),
              marginRight: spacing.medium,
            }}>
            {/* Back arrow placeholder */}
            <View
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                backgroundColor: colors.borderAlt,
                borderRadius: moderateScale(10),
              }}
            />
          </TouchableOpacity>
          <AppText
            variant="title"
            color="text"
            numberOfLines={1}
            style={{ flex: 1 }}>
            Event Details
          </AppText>
        </View>
        <View style={{ flexDirection: 'row', gap: spacing.small }}>
          <TouchableOpacity
            onPress={handleLike}
            style={{
              padding: spacing.small,
              borderRadius: moderateScale(8),
            }}>
            {/* Heart icon placeholder */}
            <View
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                backgroundColor: isLiked ? colors.error : colors.borderAlt,
                borderRadius: moderateScale(10),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            style={{
              padding: spacing.small,
              borderRadius: moderateScale(8),
            }}>
            {/* Share icon placeholder */}
            <View
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                backgroundColor: colors.borderAlt,
                borderRadius: moderateScale(10),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: spacing.massive }}
        showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <View style={{ position: 'relative', marginBottom: spacing.large }}>
          <Image
            source={{ uri: mockEventDetails.image }}
            style={{
              width: '100%',
              height: moderateScale(200),
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: spacing.medium,
              left: spacing.medium,
              backgroundColor: colors.primaryVariant,
              paddingHorizontal: spacing.medium,
              paddingVertical: spacing.small,
              borderRadius: moderateScale(12),
            }}>
            <AppText
              variant="footnote"
              color="primary"
              style={{ fontSize: moderateScale(10) }}>
              {mockEventDetails.category}
            </AppText>
          </View>
        </View>

        <View style={{ padding: spacing.mediumLarge }}>
          {/* Main Content Card */}
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: moderateScale(12),
              padding: spacing.large,
              marginBottom: spacing.large,
              borderWidth: 1,
              borderColor: colors.borderAlt,
            }}>
            {/* Title and Description */}
            <View style={{ marginBottom: spacing.large }}>
              <AppText
                variant="title"
                color="text"
                style={{
                  marginBottom: spacing.medium,
                  fontSize: moderateScale(24),
                }}>
                {mockEventDetails.title}
              </AppText>
              <AppText
                variant="body"
                color="secondaryText"
                style={{
                  marginBottom: spacing.medium,
                  lineHeight: moderateScale(20),
                }}>
                {mockEventDetails.description}
              </AppText>
              <AppText
                variant="body"
                color="secondaryText"
                style={{ lineHeight: moderateScale(20) }}>
                {mockEventDetails.longDescription}
              </AppText>
            </View>

            {/* Event Details */}
            <View style={{ marginBottom: spacing.large }}>
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
            <View style={{ marginBottom: spacing.large }}>
              <AppText
                variant="body"
                color="text"
                style={{ marginBottom: spacing.medium }}>
                Tags
              </AppText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {mockEventDetails.tags.map(tag => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </View>
            </View>

            {/* Divider */}
            <View
              style={{
                height: 1,
                backgroundColor: colors.borderAlt,
                marginVertical: spacing.large,
              }}
            />

            {/* Host Information */}
            <View style={{ marginBottom: spacing.large }}>
              <AppText
                variant="title"
                color="text"
                style={{ marginBottom: spacing.medium }}>
                Hosted by
              </AppText>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Image
                  source={{ uri: mockEventDetails.host.avatar }}
                  style={{
                    width: moderateScale(48),
                    height: moderateScale(48),
                    borderRadius: moderateScale(24),
                    marginRight: spacing.medium,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <AppText
                    variant="body"
                    color="text"
                    style={{ marginBottom: spacing.small }}>
                    {mockEventDetails.host.name}
                  </AppText>
                  <AppText
                    variant="footnote"
                    color="secondaryText"
                    style={{ marginBottom: spacing.small }}>
                    {mockEventDetails.host.bio}
                  </AppText>
                  <View style={{ flexDirection: 'row', gap: spacing.medium }}>
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
            <View
              style={{
                height: 1,
                backgroundColor: colors.borderAlt,
                marginVertical: spacing.large,
              }}
            />

            {/* Attendees */}
            <View style={{ marginBottom: spacing.large }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: spacing.medium,
                }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  <View
                    style={{
                      width: moderateScale(40),
                      height: moderateScale(40),
                      borderRadius: moderateScale(20),
                      backgroundColor: colors.background,
                      borderWidth: 2,
                      borderColor: colors.white,
                      marginLeft: -spacing.small,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AppText variant="footnote" color="secondaryText">
                      +{mockEventDetails.attendees - 6}
                    </AppText>
                  </View>
                )}
              </View>
            </View>

            {/* Divider */}
            <View
              style={{
                height: 1,
                backgroundColor: colors.borderAlt,
                marginVertical: spacing.large,
              }}
            />

            {/* Event Rules */}
            <View>
              <AppText
                variant="title"
                color="text"
                style={{ marginBottom: spacing.medium }}>
                Event Guidelines
              </AppText>
              {mockEventDetails.rules.map((rule, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', marginBottom: spacing.small }}>
                  <View
                    style={{
                      width: moderateScale(6),
                      height: moderateScale(6),
                      backgroundColor: colors.borderAlt,
                      borderRadius: moderateScale(3),
                      marginTop: spacing.small,
                      marginRight: spacing.small,
                    }}
                  />
                  <AppText
                    variant="footnote"
                    color="secondaryText"
                    style={{ flex: 1 }}>
                    {rule}
                  </AppText>
                </View>
              ))}
            </View>
          </View>

          {/* Location Card */}
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: moderateScale(12),
              padding: spacing.large,
              marginBottom: spacing.large,
              borderWidth: 1,
              borderColor: colors.borderAlt,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.medium,
              }}>
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
            <View
              style={{
                backgroundColor: colors.background,
                height: moderateScale(120),
                borderRadius: moderateScale(8),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText variant="footnote" color="secondaryText">
                Map View (Integration with Maps API)
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={{
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.borderAlt,
          paddingHorizontal: spacing.mediumLarge,
          paddingVertical: spacing.medium,
        }}>
        <View style={{ flexDirection: 'row', gap: spacing.medium }}>
          <AppButton
            title={isJoined ? 'Cancel RSVP' : 'RSVP for Free'}
            variant="outline"
            style={{ flex: 1 }}
            onPress={handleJoin}
          />
          <AppButton
            title={isJoined ? "You're Going!" : 'Join Event'}
            style={{ flex: 1 }}
            onPress={handleJoin}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
