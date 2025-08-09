import { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { AppButton } from '@components/AppButton';
import AppInput from '@components/AppInput/AppInput';
import AppSwitch from '@components/AppSwitch/AppSwitch';
import { AppText } from '@components/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  ProfileNavigationProps,
  ProfileRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { radius, border } from '@themes/border';
import { moderateScale } from '@themes/responsive';
import size from '@themes/size';
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

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <AppText variant="title" style={styles.headerText}>
              Profile
            </AppText>
            <AppText variant="body" color="secondaryText">
              Manage your account and preferences
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            style={styles.editButton}>
            <AppText variant="label" color="primary">
              {isEditing ? 'Cancel' : 'Edit'}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        scrollEventThrottle={16}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.scrollContent}>
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
                      <AppText variant="footnote" color="onPrimary">
                        📷
                      </AppText>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.profileInfo}>
                  {isEditing ? (
                    <View style={styles.inputContainer}>
                      <AppInput
                        label="Name"
                        value={userInfo.name}
                        onChangeText={text =>
                          setUserInfo(prev => ({ ...prev, name: text }))
                        }
                      />
                      <AppInput
                        label="Bio"
                        value={userInfo.bio}
                        onChangeText={text =>
                          setUserInfo(prev => ({ ...prev, bio: text }))
                        }
                        multiline
                        numberOfLines={3}
                      />
                      <AppInput
                        label="Location"
                        value={userInfo.location}
                        onChangeText={text =>
                          setUserInfo(prev => ({ ...prev, location: text }))
                        }
                      />
                      <AppButton
                        title="Save Changes"
                        onPress={handleSaveProfile}
                      />
                    </View>
                  ) : (
                    <View>
                      <AppText variant="title1">{userInfo.name}</AppText>
                      <AppText
                        variant="body"
                        color="paragraph"
                        style={styles.userBio}>
                        {userInfo.bio}
                      </AppText>
                      <View style={styles.userDetails}>
                        <View style={styles.userDetailItem}>
                          <AppText variant="footnote" color="secondary">
                            📍 {userInfo.location}
                          </AppText>
                        </View>
                        <View style={styles.userDetailItem}>
                          <AppText variant="footnote" color="secondary">
                            📅 Joined {userInfo.joinDate}
                          </AppText>
                        </View>
                        <View style={styles.userDetailItem}>
                          <AppText variant="footnote" color="secondary">
                            ⭐ {userStats.rating} rating
                          </AppText>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.statsCard}>
              <AppText variant="title2">Activity</AppText>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <AppText variant="title1" color="primary">
                    {userStats.eventsAttended}
                  </AppText>
                  <AppText variant="footnote" color="secondary">
                    Events Attended
                  </AppText>
                </View>
                <View style={styles.statCard}>
                  <AppText variant="title1" color="primary">
                    {userStats.eventsHosted}
                  </AppText>
                  <AppText variant="footnote" color="secondary">
                    Events Hosted
                  </AppText>
                </View>
                <View style={styles.statCard}>
                  <AppText variant="title1" color="primary">
                    {userStats.friendsMade}
                  </AppText>
                  <AppText variant="footnote" color="secondary">
                    Connections
                  </AppText>
                </View>
                <View style={styles.statCard}>
                  <AppText variant="title1" color="primary">
                    {userStats.rating}
                  </AppText>
                  <AppText variant="footnote" color="secondary">
                    Rating
                  </AppText>
                </View>
              </View>
            </View>

            <View style={styles.interestsCard}>
              <View style={styles.interestsHeader}>
                <AppText variant="title2">Interests</AppText>
                <AppButton title="Edit" variant="outline" />
              </View>
              <View style={styles.interestsContainer}>
                {userInterests.map(interest => (
                  <View key={interest} style={styles.interestBadge}>
                    <AppText variant="footnote" color="primary">
                      {interest}
                    </AppText>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.eventsCard}>
              <View style={styles.eventsHeader}>
                <AppText variant="title2">Recent Events</AppText>
                <AppButton title="View All" variant="ghost" />
              </View>
              <View style={styles.eventsList}>
                {recentEvents.map(event => (
                  <View key={event.id} style={styles.eventItem}>
                    <Image
                      source={{ uri: event.image }}
                      style={styles.eventImage}
                    />
                    <View style={styles.eventInfo}>
                      <AppText variant="body">{event.title}</AppText>
                      <AppText variant="footnote" color="secondary">
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
                      <AppText variant="footnote" color="onPrimary">
                        {event.role}
                      </AppText>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.notificationsCard}>
              <View style={styles.notificationsHeader}>
                <AppText variant="body">🔔</AppText>
                <AppText variant="title2">Notifications</AppText>
              </View>
              <View>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationInfo}>
                    <AppText variant="body">Event Reminders</AppText>
                    <AppText variant="footnote" color="secondary">
                      Get notified before events you&apos;re attending
                    </AppText>
                  </View>
                  <AppSwitch
                    value={notifications.eventReminders}
                    onValueChange={value =>
                      handleNotificationChange('eventReminders', value)
                    }
                  />
                </View>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationInfo}>
                    <AppText variant="body">New Events</AppText>
                    <AppText variant="footnote" color="secondary">
                      Discover events matching your interests
                    </AppText>
                  </View>
                  <AppSwitch
                    value={notifications.newEvents}
                    onValueChange={value =>
                      handleNotificationChange('newEvents', value)
                    }
                  />
                </View>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationInfo}>
                    <AppText variant="body">Messages</AppText>
                    <AppText variant="footnote" color="secondary">
                      New messages and replies
                    </AppText>
                  </View>
                  <AppSwitch
                    value={notifications.messages}
                    onValueChange={value =>
                      handleNotificationChange('messages', value)
                    }
                  />
                </View>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationInfo}>
                    <AppText variant="body">Marketing</AppText>
                    <AppText variant="footnote" color="secondary">
                      Tips and community highlights
                    </AppText>
                  </View>
                  <AppSwitch
                    value={notifications.marketing}
                    onValueChange={value =>
                      handleNotificationChange('marketing', value)
                    }
                  />
                </View>
              </View>
            </View>

            <View style={styles.settingsCard}>
              <View style={styles.settingsHeader}>
                <MaterialIcons name="settings" size={size.xs} />
                <AppText variant="title2">Settings</AppText>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => {}}>
                  <View style={styles.settingsInfo}>
                    <AppText variant="body">Privacy & Safety</AppText>
                    <AppText variant="footnote" color="secondary">
                      Manage your privacy settings
                    </AppText>
                  </View>
                  <MaterialIcons name="privacy-tip" size={size.sm} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => {}}>
                  <View style={styles.settingsInfo}>
                    <AppText variant="body">Help & Support</AppText>
                    <AppText variant="footnote" color="secondary">
                      Get help or contact us
                    </AppText>
                  </View>
                  <MaterialIcons name="help-outline" size={size.sm} />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={handleSignOut}>
                  <View style={styles.settingsInfo}>
                    <AppText variant="body" color="error">
                      Sign Out
                    </AppText>
                    <AppText variant="footnote" color="error">
                      Log out of your account
                    </AppText>
                  </View>
                  <MaterialIcons name="logout" size={size.sm} color="#F00" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ScreenWrapper>
  );
}

const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
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
    contentContainer: {
      flexGrow: 1,
      paddingBottom: moderateScale(100),
    },
    scrollContent: {
      minHeight: '100%',
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
    statsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.medium,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
    },
    interestsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
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
    eventsCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      padding: spacing.large,
      marginBottom: spacing.large,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
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
    eventRole: {
      paddingHorizontal: spacing.small,
      paddingVertical: spacing.xs,
      borderRadius: radius.sm,
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
      gap: spacing.small,
    },
    notificationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.medium,
    },
    notificationInfo: {
      flex: 1,
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
      gap: spacing.small,
    },
    settingsItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.medium,
    },
    settingsInfo: {
      flex: 1,
    },
    divider: {
      height: border.normal,
      backgroundColor: colors.inputBorder,
      marginVertical: spacing.medium,
    },
  });
};
