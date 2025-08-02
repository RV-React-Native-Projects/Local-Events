/* eslint-disable react/no-unstable-nested-components */
import { lazy, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  ParamListBase,
  TabNavigationState,
  useNavigationState,
} from '@react-navigation/native';
import { translate } from '@context/I18n';
import { useAppDispatch, useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';
import { TAB_HEIGHT, TAB_WIDTH } from '@utils/constants';
import { TabParamsList } from './types';
import { AppText } from '@components/AppText';

const HomeStack = lazy(() => import('./stacks/HomeStack'));
const SearchStack = lazy(() => import('./stacks/SearchStack'));
const EventStack = lazy(() => import('./stacks/EventStack'));
const ChatStack = lazy(() => import('./stacks/ChatStack'));
const ProfileStack = lazy(() => import('./stacks/ProfileStack'));

const Tab = createBottomTabNavigator<TabParamsList>();

const isTabVisible = (key: string) => {
  const TAB_VISIBLE_AT = ['HomeTab', 'SearchTab', 'ChatTab', 'ProfileTab'];
  return key && TAB_VISIBLE_AT.includes(key);
};

export function TabNavigation() {
  const { isDark, colors } = useAppTheme();

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        headerShown: false,
        tabBarActiveTintColor: isDark ? colors.white : colors.primary,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'EOI',
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          title: 'Leads',
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
      <Tab.Screen
        name="EventTab"
        component={EventStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
      <Tab.Screen
        name="ChatsTab"
        component={ChatStack}
        options={{
          title: 'Bookings',
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused, color, size }) => <></>,
        }}
      />
    </Tab.Navigator>
  );
}

const tabToLabel: Record<string, string> = {
  HomeTab: translate('tab.home'),
  ChatTab: translate('tab.chat'),
  CreateTab: translate('tab.create'),
  SearchTab: translate('tab.search'),
  ProfileTab: translate('tab.profile'),
};

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const styles = useStyles();
  const storeDispatch = useAppDispatch();
  const { width: windowWidth } = useWindowDimensions();
  const isTablet: boolean = windowWidth > 500;
  const REDUCE_BOX_WIDTH_BY: number = moderateScale(isTablet ? 30 : 20);

  const buttonWidth: number = isTablet
    ? TAB_WIDTH / state.routes.length
    : windowWidth / state.routes.length;

  const tabPositionX = useSharedValue(0);
  const boxAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const moveToPosition = (index: number) => {
    tabPositionX.value = withSpring(
      buttonWidth * index + REDUCE_BOX_WIDTH_BY / 2,
      {
        duration: 1000,
        stiffness: 20,
        dampingRatio: 0.7,
      },
    );
  };

  useEffect(() => {
    moveToPosition(state.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index, windowWidth]);

  const currentScreen = useNavigationState(s => {
    const route = s?.routes?.[s.index];
    if (!route) {
      return '';
    }
    if (route.state && route.state.index) {
      return route.state?.routes?.[route.state.index]?.name;
    } else {
      return route.name;
    }
  });

  return (
    <View>
      {isTabVisible(currentScreen) ? (
        <View style={[styles.container, isTablet && styles.tabStyle]}>
          <Animated.View
            style={[
              boxAnimatedStyle,
              styles.backgroundBox,
              { width: buttonWidth - REDUCE_BOX_WIDTH_BY },
            ]}
          />
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabButton
                index={index}
                isFocused={isFocused}
                label={tabToLabel[route.name]}
                onLongPress={onLongPress}
                onPress={onPress}
                options={options}
                state={state}
                key={route.key + index}
              />
            );
          })}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

interface TabBarButtonProps {
  state: TabNavigationState<ParamListBase>;
  index: number;
  options: BottomTabNavigationOptions;
  onPress: () => void;
  isFocused: boolean;
  label: string;
  onLongPress?: () => void;
}

function TabButton(props: TabBarButtonProps) {
  const { state, index, options, onPress, isFocused, label, onLongPress } =
    props;
  const styles = useStyles();
  const { colors } = useAppTheme();

  const translateY = useSharedValue(isFocused ? -spacing.baseLarge : 0);

  useEffect(() => {
    translateY.value = withSpring(isFocused ? -spacing.baseLarge : 0, {
      duration: 1000,
    });
  }, [isFocused, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Pressable
      key={state.routes[index].key + index}
      style={styles.buttonContainer}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Animated.View style={[animatedStyle, styles.iconContainer]}>
        {options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? colors.onPrimary : colors.primary,
            size: 35,
          })}
      </Animated.View>
      <AppText
        numberOfLines={1}
        adjustsFontSizeToFit
        fontFamily="Medium"
        size={fontSize[12]}
        color={isFocused ? 'primary' : 'iconColor'}
        style={styles.tabTitle}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const useStyles = () => {
  const { colors, shadow } = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();

  return StyleSheet.create({
    buttonContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.baseLarge,
    },
    tabTitle: {
      marginTop: spacing.small,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: TAB_HEIGHT,
      borderRadius: radius.future,
      borderTopLeftRadius: radius.xxl,
      borderTopRightRadius: radius.xxl,
      backgroundColor: colors.backgroundColor,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      ...shadow.regular,
    },
    tabStyle: {
      width: TAB_WIDTH,
      borderRadius: radius.xxl,
      bottom: spacing.mediumLarge,
      left: (windowWidth - TAB_WIDTH) / 2,
    },
    iconContainer: { zIndex: 10 },
    backgroundBox: {
      position: 'absolute',
      zIndex: -1,
      bottom: moderateScale(35),
      left: 0,
      height: moderateScale(55),
      backgroundColor: colors.primary,
      borderRadius: radius.future,
    },
    hideTab: {
      // display: 'none'
    },
  });
};
