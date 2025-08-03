import { StyleSheet, useWindowDimensions } from 'react-native';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { opacity } from '@themes/opacity';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';
import { BUTTON_HEIGHT } from '@utils/constants';
import { AlertModalTypes } from './AlertModalTypes';

export const useAlertModalStyle = (type: AlertModalTypes) => {
  const { colors } = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();

  let backdropColor;
  switch (type) {
    case 'success':
      backdropColor = colors.success;
      break;
    case 'error':
      backdropColor = colors.error;
      break;
    case 'warning':
      backdropColor = colors.warning;
      break;
    default:
      backdropColor = colors.border;
  }

  return StyleSheet.create({
    container: {
      alignSelf: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      rowGap: spacing.large,
      paddingHorizontal: spacing.large,
    },
    modalStyle: {
      margin: spacing.none,
      padding: spacing.none,
      justifyContent: 'center',
    },
    modalContainer: {
      alignSelf: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.xl,
      backgroundColor: colors.backgroundColor,
      minHeight: moderateScale(300),
      paddingTop: spacing.colossal,
      paddingBottom: spacing.extraLarge,
      width: windowWidth - moderateScale(40),
      maxWidth: moderateScale(400),
    },
    circleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: moderateScale(75),
      width: moderateScale(75),
      borderRadius: radius.round,
      // marginTop: spacing.smallLarge,
    },
    bigCircle: {
      height: moderateScale(85),
      width: moderateScale(85),
      borderRadius: radius.round,
      backgroundColor: backdropColor,
      opacity: opacity.semiLight,
      position: 'absolute',
    },
    buttonContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    halfButton: {
      width: '49%',
      height: BUTTON_HEIGHT,
    },
    fullButton: {
      width: '100%',
      height: BUTTON_HEIGHT,
    },
    subHeaderColor: { color: backdropColor },
  });
};
