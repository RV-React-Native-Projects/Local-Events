import React, { memo } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  ViewStyle,
  StatusBarProps,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControlProps,
} from 'react-native';
import { useAppTheme } from '@redux/hooks';
import { ColorTheme } from '@themes/colors';
import { device } from '@utils/device';
import AppStatusBar, { AppStatusBarProps } from './AppStatusBar';

type ScreenWrapperProps = Omit<StatusBarProps, 'backgroundColor'> &
  AppStatusBarProps & {
    children: React.ReactNode;
    scrollEnabled?: boolean; // Optional scroll functionality
    keyboardOffset?: number; // Optional keyboard offset
    keyboardBehavior?: KeyboardAvoidingViewProps['behavior']; // KeyboardAvoidingView behavior
    contentContainerStyle?:
      | ScrollViewProps['contentContainerStyle']
      | ViewStyle; // Optional style for content container
    style?: ViewStyle; // Additional styling
    hideStatusbar?: boolean;
    scrollViewContainerStyle?: ViewStyle;
    scrollViewStyle?: ViewStyle;
    notForm?: boolean;
    refreshControl?:
      | React.ReactElement<
          RefreshControlProps,
          string | React.JSXElementConstructor<any>
        >
      | undefined; // Optional refresh control for ScrollView
  };

const ScreenWrapper: React.FC<ScreenWrapperProps> = memo(
  ({
    children,
    scrollEnabled = false,
    keyboardOffset = 0,
    keyboardBehavior = device.isIOS ? 'padding' : undefined,
    contentContainerStyle,
    scrollViewContainerStyle,
    scrollViewStyle,
    style,
    statusBarColor,
    hideStatusbar = false,
    refreshControl,
    // use notForm when there is no keyboard required on page
    // or you are using scrollEnable=false
    // and using FlatList the it is require to use notForm
    notForm = false,
    ...statusBarProps
  }) => {
    const { colors } = useAppTheme();

    // Prevent rendering if children are not provided
    if (!children) {
      return null;
    }

    return (
      <KeyboardAvoidingView
        style={[styles(colors).flex, style]}
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardOffset}
      >
        {!hideStatusbar && (
          <AppStatusBar statusBarColor={statusBarColor} {...statusBarProps} />
        )}
        {!hideStatusbar && (
          <SafeAreaView style={[styles(colors).flex]}>
            {scrollEnabled ? (
              <ScrollView
                style={[styles(colors).flex, scrollViewStyle]}
                contentContainerStyle={scrollViewContainerStyle}
                keyboardShouldPersistTaps="handled"
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>
            ) : !notForm ? (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles(colors).flex, contentContainerStyle]}>
                  {children}
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <View style={[styles(colors).flex, contentContainerStyle]}>
                {children}
              </View>
            )}
          </SafeAreaView>
        )}
        {hideStatusbar &&
          (scrollEnabled ? (
            <ScrollView
              style={[styles(colors).flex, scrollViewStyle]}
              contentContainerStyle={scrollViewContainerStyle}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : !notForm ? (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={[styles(colors).flex, contentContainerStyle]}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View style={[styles(colors).flex, contentContainerStyle]}>
              {children}
            </View>
          ))}
      </KeyboardAvoidingView>
    );
  },
);

const styles = (colors: ColorTheme) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    flexGrow: {
      flexGrow: 1,
    },
  });

export default ScreenWrapper;
