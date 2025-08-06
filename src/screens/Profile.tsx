/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  StyleSheet,
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
import { radius, border } from '@themes/border';
import { fontSize } from '@themes/fontSize';
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
  const styles = useStyles();
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
    <View style={styles.statCard}>
      <View style={styles.statContent}>
        {/* {icon && <AppIcon icon={icon as any} iconSize="sm" color="primary" />} */}
        <AppText variant="title" color="text" style={styles.statValue}>
          {value}
        </AppText>
      </View>
      <AppText
        variant="footnote"
        color="secondaryText"
        style={styles.statLabel}>
        {title} {icon}
      </AppText>
    </View>
  );

  const InterestBadge = ({ interest }: { interest: string }) => (
    <View style={styles.interestBadge}>
      <AppText variant="footnote" color="primary" style={styles.interestText}>
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
    <View style={styles.notificationItem}>
      <View style={styles.notificationInfo}>
        <AppText variant="body" color="text" style={styles.notificationTitle}>
          {title}
        </AppText>
        <AppText
          variant="footnote"
          color="secondaryText"
          style={styles.notificationDescription}>
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
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      {/* <AppIcon
        icon={icon}
        iconSize="md"
        color={isDestructive ? 'error' : 'text'}
        style={styles.settingsIcon}
      /> */}
      <View style={styles.settingsInfo}>
        <AppText
          variant="body"
          color={isDestructive ? 'error' : 'text'}
          style={styles.settingsItemTitle}>
          {title}
        </AppText>
        <AppText
          variant="footnote"
          color={isDestructive ? 'error' : 'secondaryText'}
          style={styles.settingsDescription}>
          {description} {icon}
        </AppText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper scrollEnabled>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <AppText variant="title" color="text" style={styles.headerText}>
              Profile
            </AppText>
            <AppText variant="body" color="secondaryText">
              Manage your account and preferences
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            style={styles.editButton}>
            {/* <AppIcon icon="edit" iconSize="md" color="text" /> */}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                }}
                style={styles.avatar}
              />
              {isEditing && (
                <TouchableOpacity style={styles.cameraButton}>
                  {/* <AppIcon icon="camera-alt" iconSize="sm" color="onPrimary" /> */}
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.profileInfo}>
              {isEditing ? (
                <View style={styles.inputContainer}>
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
                  <View style={styles.buttonRow}>
                    <AppButton
                      title="Save Changes"
                      onPress={handleSaveProfile}
                      style={styles.buttonHalf}
                    />
                    <AppButton
                      title="Cancel"
                      variant="outline"
                      onPress={() => setIsEditing(false)}
                      style={styles.buttonHalf}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <AppText variant="title" color="text" style={styles.userName}>
                    {userInfo.name}
                  </AppText>
                  <AppText
                    variant="body"
                    color="secondaryText"
                    style={styles.userBio}>
                    {userInfo.bio}
                  </AppText>
                  <View style={styles.userDetails}>
                    <View style={styles.userDetailItem}>
                      {/* <AppIcon
                        icon="location-on"
                        iconSize="sm"
                        color="secondaryText"
                        style={styles.detailIcon}
                      /> */}
                      <AppText variant="footnote" color="secondaryText">
                        {userInfo.location}
                      </AppText>
                    </View>
                    <View style={styles.userDetailItem}>
                      {/* <AppIcon
                        icon="event"
                        iconSize="sm"
                        color="secondaryText"
                        style={styles.detailIcon}
                      /> */}
                      <AppText variant="body" color="secondaryText">
                        Joined {userInfo.joinDate}
                      </AppText>
                    </View>
                    <View style={styles.userDetailItem}>
                      {/* <AppIcon
                        icon="star"
                        iconSize="sm"
                        color="primary"
                        style={styles.detailIcon}
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
        <View style={styles.statsCard}>
          <AppText variant="title" color="text" style={styles.statsTitle}>
            Activity
          </AppText>
          <View style={styles.statsGrid}>
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
        <View style={styles.interestsCard}>
          <View style={styles.interestsHeader}>
            <AppText variant="title" color="text">
              Interests
            </AppText>
            <AppButton title="Edit" variant="outline" size="compact" />
          </View>
          <View style={styles.interestsContainer}>
            {userInterests.map(interest => (
              <InterestBadge key={interest} interest={interest} />
            ))}
          </View>
        </View>

        {/* Recent Events Card */}
        <View style={styles.eventsCard}>
          <View style={styles.eventsHeader}>
            <AppText variant="title" color="text">
              Recent Events
            </AppText>
            <AppButton title="View All" variant="ghost" size="compact" />
          </View>
          <View style={styles.eventsList}>
            {recentEvents.map(event => (
              <View key={event.id} style={styles.eventItem}>
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                />
                <View style={styles.eventInfo}>
                  <AppText
                    variant="body"
                    color="text"
                    style={styles.eventTitle}>
                    {event.title}
                  </AppText>
                  <AppText variant="body" color="secondaryText">
                    {event.date} • {event.role}
                  </AppText>
                </View>
                <View
                  style={[
                    styles.eventRole,
                    event.role === 'hosted'
                      ? styles.roleHosted
                      : styles.roleAttended,
                  ]}>
                  <AppText variant="body" style={styles.roleText}>
                    {event.role}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Notifications Card */}
        <View style={styles.notificationsCard}>
          <View style={styles.notificationsHeader}>
            {/* <AppIcon
              icon="notifications"
              iconSize="md"
              color="text"
              style={styles.cardIcon}
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
        <View style={styles.settingsCard}>
          <View style={styles.settingsHeader}>
            {/* <AppIcon
              icon="settings"
              iconSize="md"
              color="text"
              style={styles.cardIcon}
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
            <View style={styles.divider} />
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

const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
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
    headerText: {
      marginBottom: spacing.small,
    },
    editButton: {
      padding: spacing.small,
      borderRadius: radius.lg,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.appBackgroundColor,
    },
    scrollContent: {
      padding: spacing.mediumLarge,
    },
    profileCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    profileContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    avatarContainer: {
      position: 'relative',
      marginRight: spacing.large,
    },
    avatar: {
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(40),
    },
    cameraButton: {
      position: 'absolute',
      bottom: -spacing.small,
      right: -spacing.small,
      backgroundColor: colors.primary,
      width: moderateScale(32),
      height: moderateScale(32),
      borderRadius: moderateScale(16),
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileInfo: {
      flex: 1,
    },
    inputContainer: {
      gap: spacing.medium,
    },
    statsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    statsTitle: {
      marginBottom: spacing.medium,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.medium,
    },
    statContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.small,
    },
    statValue: {
      fontSize: moderateScale(18),
    },
    statLabel: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: fontSize[20],
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    interestsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    interestsTitle: {
      marginBottom: spacing.medium,
    },
    interestsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.small,
    },
    interestBadge: {
      backgroundColor: colors.info,
      paddingHorizontal: spacing.medium,
      paddingVertical: spacing.xs,
      borderRadius: radius.xl,
    },
    interestText: {
      fontSize: fontSize[12],
      color: colors.primary,
      fontWeight: '500',
    },
    eventsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    eventsTitle: {
      marginBottom: spacing.medium,
    },
    eventsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    eventsList: {
      gap: spacing.medium,
    },
    eventItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    eventImage: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: radius.lg,
      marginRight: spacing.medium,
    },
    eventInfo: {
      flex: 1,
    },
    eventTitle: {
      fontSize: fontSize[14],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    eventDetails: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
    eventRole: {
      fontSize: fontSize[10],
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xs,
      borderRadius: radius.sm,
      overflow: 'hidden',
    },
    roleAttended: {
      backgroundColor: colors.success,
    },
    roleHosted: {
      backgroundColor: colors.warning,
    },
    notificationsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    notificationsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    notificationsTitle: {
      marginBottom: spacing.medium,
    },
    notificationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.small,
    },
    notificationInfo: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: fontSize[14],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    notificationDescription: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
    settingsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    settingsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.medium,
    },
    settingsTitle: {
      marginBottom: spacing.medium,
    },
    settingsItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.small,
    },
    settingsInfo: {
      flex: 1,
    },
    settingsItemTitle: {
      fontSize: fontSize[14],
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    settingsDescription: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: spacing.medium,
    },
    buttonHalf: {
      flex: 1,
    },
    userName: {
      marginBottom: spacing.small,
    },
    userBio: {
      marginBottom: spacing.medium,
      lineHeight: moderateScale(20),
    },
    userDetails: {
      gap: spacing.medium,
    },
    userDetailItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailIcon: {
      marginRight: spacing.small,
    },
    cardIcon: {
      marginRight: spacing.small,
    },
    settingsIcon: {
      marginRight: spacing.medium,
    },
    roleText: {
      textTransform: 'capitalize',
    },
    divider: {
      height: border.normal,
      backgroundColor: colors.inputBorder,
      marginVertical: spacing.medium,
    },
  });
};
