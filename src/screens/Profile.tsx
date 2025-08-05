/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import AppButton from '@components/AppButton/AppButton';
import AppInput from '@components/AppInput/AppInput';
import AppText from '@components/AppText/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  ProfileNavigationProps,
  ProfileRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

// Mock data
const userStats = {
  eventsAttended: 23,
  eventsHosted: 5,
  friendsMade: 47,
  rating: 4.8,
};

const recentEvents = [
  {
    id: 1,
    title: 'Acoustic Poetry Night',
    date: 'Oct 24',
    role: 'attended',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    title: 'Sunday Morning Chess',
    date: 'Oct 22',
    role: 'hosted',
    image:
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    title: 'Watercolor Workshop',
    date: 'Oct 20',
    role: 'attended',
    image:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop',
  },
];

const userInterests = ['Music', 'Poetry', 'Chess', 'Art', 'Coffee'];

export default function Profile({}: ScreenPropsType<
  ProfileNavigationProps,
  ProfileRouteProp
>) {
  const { colors } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Johnson',
    bio: 'Poetry enthusiast and chess player. Love discovering new spots in the city and meeting creative people!',
    location: 'Washington, DC',
    joinDate: 'March 2024',
  });

  const [notifications, setNotifications] = useState({
    eventReminders: true,
    newEvents: true,
    messages: true,
    marketing: false,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile changes
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => {} },
    ]);
  };

  const StatCard = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: string | number;
    icon?: string;
  }) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.medium,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: spacing.small,
        }}>
        {/* {icon && <AppIcon icon={icon as any} iconSize="sm" color="primary" />} */}
        <AppText
          variant="title"
          color="text"
          style={{ fontSize: moderateScale(18) }}>
          {value}
        </AppText>
      </View>
      <AppText
        variant="footnote"
        color="secondaryText"
        style={{ textAlign: 'center' }}>
        {title} {icon}
      </AppText>
    </View>
  );

  const InterestBadge = ({ interest }: { interest: string }) => (
    <View
      style={{
        backgroundColor: colors.primaryVariant,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.small,
        borderRadius: moderateScale(20),
        marginRight: spacing.small,
        marginBottom: spacing.small,
      }}>
      <AppText
        variant="footnote"
        color="primary"
        style={{ fontSize: moderateScale(12) }}>
        {interest}
      </AppText>
    </View>
  );

  const NotificationItem = ({
    title,
    description,
    key,
    value,
  }: {
    title: string;
    description: string;
    key: string;
    value: boolean;
  }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderAlt,
      }}>
      <View style={{ flex: 1, marginRight: spacing.medium }}>
        <AppText
          variant="body"
          color="text"
          style={{ marginBottom: spacing.small }}>
          {title}
        </AppText>
        <AppText variant="footnote" color="secondaryText">
          {description}
        </AppText>
      </View>
      <Switch
        value={value}
        onValueChange={newValue => handleNotificationChange(key, newValue)}
        trackColor={{ false: colors.borderAlt, true: colors.primary }}
        thumbColor={value ? colors.onPrimary : colors.white}
      />
    </View>
  );

  const SettingsItem = ({
    icon,
    title,
    description,
    onPress,
    isDestructive = false,
  }: {
    icon: string;
    title: string;
    description: string;
    onPress: () => void;
    isDestructive?: boolean;
  }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderAlt,
      }}
      onPress={onPress}>
      {/* <AppIcon
        icon={icon}
        iconSize="md"
        color={isDestructive ? 'error' : 'text'}
        style={{ marginRight: spacing.medium }}
      /> */}
      <View style={{ flex: 1 }}>
        <AppText
          variant="body"
          color={isDestructive ? 'error' : 'text'}
          style={{ marginBottom: spacing.small }}>
          {title}
        </AppText>
        <AppText
          variant="footnote"
          color={isDestructive ? 'error' : 'secondaryText'}>
          {description} {icon}
        </AppText>
      </View>
    </TouchableOpacity>
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
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <AppText
              variant="title"
              color="text"
              style={{ marginBottom: spacing.small }}>
              Profile
            </AppText>
            <AppText variant="body" color="secondaryText">
              Manage your account and preferences
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            style={{
              padding: spacing.small,
              borderRadius: moderateScale(8),
            }}>
            {/* <AppIcon icon="edit" iconSize="md" color="text" /> */}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: spacing.mediumLarge }}
        showsVerticalScrollIndicator={false}>
        {/* Profile Info Card */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: moderateScale(12),
            padding: spacing.large,
            marginBottom: spacing.large,
            borderWidth: 1,
            borderColor: colors.borderAlt,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ position: 'relative', marginRight: spacing.large }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                }}
                style={{
                  width: moderateScale(80),
                  height: moderateScale(80),
                  borderRadius: moderateScale(40),
                }}
              />
              {isEditing && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: -spacing.small,
                    right: -spacing.small,
                    backgroundColor: colors.primary,
                    width: moderateScale(32),
                    height: moderateScale(32),
                    borderRadius: moderateScale(16),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <AppIcon icon="camera-alt" iconSize="sm" color="onPrimary" /> */}
                </TouchableOpacity>
              )}
            </View>

            <View style={{ flex: 1 }}>
              {isEditing ? (
                <View style={{ gap: spacing.medium }}>
                  <AppInput
                    value={userInfo.name}
                    onChangeText={text =>
                      setUserInfo(prev => ({ ...prev, name: text }))
                    }
                    placeholder="Name"
                  />
                  <AppInput
                    value={userInfo.bio}
                    onChangeText={text =>
                      setUserInfo(prev => ({ ...prev, bio: text }))
                    }
                    placeholder="Tell us about yourself..."
                    multiline
                  />
                  <AppInput
                    value={userInfo.location}
                    onChangeText={text =>
                      setUserInfo(prev => ({ ...prev, location: text }))
                    }
                    placeholder="Location"
                  />
                  <View style={{ flexDirection: 'row', gap: spacing.medium }}>
                    <AppButton
                      title="Save Changes"
                      onPress={handleSaveProfile}
                      style={{ flex: 1 }}
                    />
                    <AppButton
                      title="Cancel"
                      variant="outline"
                      onPress={() => setIsEditing(false)}
                      style={{ flex: 1 }}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <AppText
                    variant="title"
                    color="text"
                    style={{ marginBottom: spacing.small }}>
                    {userInfo.name}
                  </AppText>
                  <AppText
                    variant="body"
                    color="secondaryText"
                    style={{
                      marginBottom: spacing.medium,
                      lineHeight: moderateScale(20),
                    }}>
                    {userInfo.bio}
                  </AppText>
                  <View style={{ gap: spacing.medium }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/* <AppIcon
                        icon="location-on"
                        iconSize="sm"
                        color="secondaryText"
                        style={{ marginRight: spacing.small }}
                      /> */}
                      <AppText variant="footnote" color="secondaryText">
                        {userInfo.location}
                      </AppText>
                    </View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/* <AppIcon
                        icon="event"
                        iconSize="sm"
                        color="secondaryText"
                        style={{ marginRight: spacing.small }}
                      /> */}
                      <AppText variant="body" color="secondaryText">
                        Joined {userInfo.joinDate}
                      </AppText>
                    </View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/* <AppIcon
                        icon="star"
                        iconSize="sm"
                        color="primary"
                        style={{ marginRight: spacing.small }}
                      /> */}
                      <AppText variant="body" color="secondaryText">
                        {userStats.rating}
                      </AppText>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Stats Card */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: moderateScale(12),
            padding: spacing.large,
            marginBottom: spacing.large,
            borderWidth: 1,
            borderColor: colors.borderAlt,
          }}>
          <AppText
            variant="title"
            color="text"
            style={{ marginBottom: spacing.medium }}>
            Activity
          </AppText>
          <View style={{ flexDirection: 'row' }}>
            <StatCard
              title="Events Attended"
              value={userStats.eventsAttended}
            />
            <StatCard title="Events Hosted" value={userStats.eventsHosted} />
            <StatCard title="Connections" value={userStats.friendsMade} />
            <StatCard title="Rating" value={userStats.rating} icon="star" />
          </View>
        </View>

        {/* Interests Card */}
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
              Interests
            </AppText>
            <AppButton title="Edit" variant="outline" size="compact" />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {userInterests.map(interest => (
              <InterestBadge key={interest} interest={interest} />
            ))}
          </View>
        </View>

        {/* Recent Events Card */}
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
              Recent Events
            </AppText>
            <AppButton title="View All" variant="ghost" size="compact" />
          </View>
          <View style={{ gap: spacing.medium }}>
            {recentEvents.map(event => (
              <View
                key={event.id}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: event.image }}
                  style={{
                    width: moderateScale(48),
                    height: moderateScale(48),
                    borderRadius: moderateScale(8),
                    marginRight: spacing.medium,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <AppText
                    variant="body"
                    color="text"
                    style={{ marginBottom: spacing.small }}>
                    {event.title}
                  </AppText>
                  <AppText variant="body" color="secondaryText">
                    {event.date} • {event.role}
                  </AppText>
                </View>
                <View
                  style={{
                    backgroundColor:
                      event.role === 'hosted'
                        ? colors.border
                        : colors.background,
                    paddingHorizontal: spacing.medium,
                    paddingVertical: spacing.small,
                    borderRadius: moderateScale(12),
                  }}>
                  <AppText
                    variant="body"
                    // color={
                    //   event.role === 'hosted' ? 'darkGreen' : 'secondaryText'
                    // }
                    style={{ textTransform: 'capitalize' }}>
                    {event.role}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Notifications Card */}
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
              alignItems: 'center',
              marginBottom: spacing.medium,
            }}>
            {/* <AppIcon
              icon="notifications"
              iconSize="md"
              color="text"
              style={{ marginRight: spacing.small }}
            /> */}
            <AppText variant="title" color="text">
              Notifications
            </AppText>
          </View>
          <View>
            <NotificationItem
              title="Event Reminders"
              description="Get notified before events you're attending"
              key="eventReminders"
              value={notifications.eventReminders}
            />
            <NotificationItem
              title="New Events"
              description="Discover events matching your interests"
              key="newEvents"
              value={notifications.newEvents}
            />
            <NotificationItem
              title="Messages"
              description="New messages and replies"
              key="messages"
              value={notifications.messages}
            />
            <NotificationItem
              title="Marketing"
              description="Tips and community highlights"
              key="marketing"
              value={notifications.marketing}
            />
          </View>
        </View>

        {/* Settings Card */}
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
              alignItems: 'center',
              marginBottom: spacing.medium,
            }}>
            {/* <AppIcon
              icon="settings"
              iconSize="md"
              color="text"
              style={{ marginRight: spacing.small }}
            /> */}
            <AppText variant="title" color="text">
              Settings
            </AppText>
          </View>
          <View>
            <SettingsItem
              icon="security"
              title="Privacy & Safety"
              description="Manage your privacy settings"
              onPress={() => {}}
            />
            <SettingsItem
              icon="help"
              title="Help & Support"
              description="Get help or contact us"
              onPress={() => {}}
            />
            <View
              style={{
                height: 1,
                backgroundColor: colors.borderAlt,
                marginVertical: spacing.medium,
              }}
            />
            <SettingsItem
              icon="logout"
              title="Sign Out"
              description="Log out of your account"
              onPress={handleSignOut}
              isDestructive
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
