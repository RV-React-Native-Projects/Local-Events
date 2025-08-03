import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@redux/hooks';
import { border, radius } from '@themes/border';
import { fontFamily, fontSize } from '@themes/fontSize';
import { opacity } from '@themes/opacity';
import { spacing } from '@themes/spacing';
import {
  ButtonColors,
  ButtonRadius,
  ButtonSize,
  ButtonVariants,
  IconPosition,
} from './AppButtonTypes';
type ButtonStyleConfig = {
  color: ButtonColors;
  variant: ButtonVariants;
  buttonSize: ButtonSize;
  buttonRadius: ButtonRadius;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  customFontSize?: number;
};

export const useButtonStyle = (config: ButtonStyleConfig) => {
  const {
    color,
    buttonRadius,
    buttonSize,
    variant,
    iconPosition,
    isLoading,
    textTransform,
    customFontSize,
  } = config;
  const { colors, isDark } = useAppTheme();
  const isLeading =
    iconPosition === 'leading-no-divider' || iconPosition === 'leading';
  const isTrailing =
    iconPosition === 'trailing-no-divider' || iconPosition === 'trailing';
  const isGhost = variant === 'ghost';
  //FIXME: isIconButton is used for making border and background transparent for icon button in disable mode , we can revert this if there is a good color scheme for icon button disable mode
  const isIconButton = buttonSize === 'icon-button';
  const buttonBaseStyle: ViewStyle = {
    borderWidth: border.normal,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const V_PADDING_LARGE = spacing.medium;
  const H_PADDING_LARGE = spacing.mediumLarge;
  const getTextStyles = (textColor: string): TextStyle => ({
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize:
      customFontSize ||
      (buttonSize === 'mini-button' ? fontSize[12] : fontSize[16]),
    fontFamily:
      buttonSize === 'mini-button' ? fontFamily.Medium : fontFamily.Regular,
    color: textColor,
    textTransform,
  });
  const buttonColors = {
    primary: {
      filled: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        textColor: colors.onPrimary,
      },
      outline: {
        backgroundColor: colors.transparent,
        borderColor: colors.primary,
        textColor: colors.primary,
      },
      ghost: {
        backgroundColor: colors.transparent,
        borderColor: colors.transparent,
        textColor: colors.primary,
      },
      disable: {
        backgroundColor: isIconButton
          ? colors.transparent
          : colors.primaryDisable,
        borderColor: isIconButton ? colors.transparent : colors.primaryDisable,
        textColor: colors.btnTextDisabled,
      },
    },
    secondary: {
      filled: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
        textColor: isDark ? colors.onPrimary : colors.onSecondary,
      },
      outline: {
        backgroundColor: colors.transparent,
        borderColor: colors.secondary,
        textColor: colors.secondary,
      },
      ghost: {
        backgroundColor: colors.transparent,
        borderColor: colors.transparent,
        textColor: colors.secondary,
      },
      disable: {
        backgroundColor: isIconButton
          ? colors.transparent
          : colors.secondaryDisable,
        borderColor: isIconButton
          ? colors.transparent
          : colors.secondaryDisable,
        textColor: colors.onSecondary,
      },
    },
    danger: {
      filled: {
        backgroundColor: colors.error,
        borderColor: colors.error,
        textColor: colors.onError,
      },
      disable: {
        backgroundColor: isIconButton
          ? colors.transparent
          : colors.btnBgDisabled,
        borderColor: isIconButton ? colors.transparent : colors.btnBgDisabled,
        textColor: colors.btnTextDisabled,
      },
      outline: {
        backgroundColor: colors.transparent,
        borderColor: colors.error,
        textColor: colors.error,
      },
      ghost: {
        backgroundColor: colors.transparent,
        borderColor: colors.transparent,
        textColor: colors.error,
      },
    },
    success: {
      filled: {
        backgroundColor: colors.success,
        borderColor: colors.success,
        textColor: colors.onSuccess,
      },
      disable: {
        backgroundColor: isIconButton
          ? colors.transparent
          : colors.btnBgDisabled,
        borderColor: isIconButton ? colors.transparent : colors.btnBgDisabled,
        textColor: colors.btnTextDisabled,
      },
      outline: {
        backgroundColor: colors.transparent,
        borderColor: colors.success,
        textColor: colors.success,
      },
      ghost: {
        backgroundColor: colors.transparent,
        borderColor: colors.transparent,
        textColor: colors.success,
      },
    },
  };
  const styleValues = buttonColors[color ?? 'primary'][variant ?? 'filled'];

  const buttonStyle = StyleSheet.create({
    buttonStandard: isLeading
      ? {
          justifyContent: 'flex-start',
        }
      : isTrailing
      ? {
          justifyContent: 'space-between',
          paddingLeft: spacing.mediumLarge,
        }
      : isGhost
      ? { paddingVertical: spacing.small, paddingHorizontal: spacing.small }
      : {
          paddingVertical: V_PADDING_LARGE,
          paddingHorizontal: H_PADDING_LARGE,
        },
    buttonIcon: {
      borderWidth: border.normal,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonCompact: isLeading
      ? {
          paddingRight: spacing.mediumLarge,
          flexDirection: 'row',
          alignSelf: 'flex-start',
        }
      : isTrailing
      ? {
          paddingLeft: spacing.mediumLarge,
          flexDirection: 'row',
          alignSelf: 'flex-start',
        }
      : {
          paddingVertical: V_PADDING_LARGE,
          paddingHorizontal: H_PADDING_LARGE,
          flexDirection: 'row',
          alignSelf: 'flex-start',
        },
    buttonMini: isLeading
      ? {
          flexDirection: 'row',
          alignSelf: 'flex-start',
          paddingVertical: spacing.base,
          paddingHorizontal: spacing.mediumLarge,
          justifyContent: 'center',
          alignItems: 'center',
        }
      : isTrailing
      ? {
          flexDirection: 'row',
          alignSelf: 'flex-start',
          paddingVertical: spacing.base,
          paddingHorizontal: spacing.mediumLarge,
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {
          paddingVertical: spacing.base,
          paddingHorizontal: spacing.mediumLarge,
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'center',
        },
    leadingAreaLarge: {
      paddingVertical: V_PADDING_LARGE,
      paddingHorizontal: H_PADDING_LARGE,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: border.normal,
      borderRightColor:
        variant === 'ghost' ? colors.transparent : styleValues.textColor,
      marginRight: spacing.mediumLarge,
    },
    trailingAreaLarge: {
      paddingVertical: V_PADDING_LARGE,
      paddingHorizontal: H_PADDING_LARGE,
      justifyContent: 'center',
      alignItems: 'center',
      borderLeftWidth: border.normal,
      borderLeftColor:
        variant === 'ghost' ? colors.transparent : styleValues.textColor,
      marginLeft: spacing.mediumLarge,
    },
    leadingAreaLargeNoDivider: {
      paddingVertical: V_PADDING_LARGE,
      paddingLeft: H_PADDING_LARGE,
      justifyContent: 'center',
      paddingRight: spacing.baseLarge, // space bw icon and text
    },
    trailingAreaLargeNoDivider: {
      paddingVertical: V_PADDING_LARGE,
      paddingLeft: spacing.baseLarge, // space bw icon and text
      paddingRight: H_PADDING_LARGE,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leadingAreaMini: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.base,
    },
    trailingAreaMini: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: spacing.base,
    },
  });

  const radiusStyle = StyleSheet.create({
    zero: { borderRadius: 0 },
    normal: { borderRadius: radius.sm },
    full: { borderRadius: radius.round },
    future: { borderRadius: radius.future },
  });

  const variantStyle = () => {
    const style: ViewStyle = {
      backgroundColor: styleValues.backgroundColor,
      borderColor: styleValues.borderColor,
    };

    return {
      background: StyleSheet.flatten([buttonBaseStyle, style]),
      text: getTextStyles(styleValues.textColor),
    };
  };

  const buttonSizeStyle = () => {
    switch (buttonSize) {
      case 'standard':
        return buttonStyle.buttonStandard;
      case 'icon-button':
        return buttonStyle.buttonIcon;
      case 'compact':
        return buttonStyle.buttonCompact;
      case 'mini-button':
        return buttonStyle.buttonMini;
      default:
        return buttonStyle.buttonStandard;
    }
  };
  const buttonRadiusStyle = () => {
    switch (buttonRadius) {
      case 'full':
        return radiusStyle.full;
      case 'zero':
        return radiusStyle.zero;
      case 'future':
        return radiusStyle.future;
      case 'normal':
      default:
        return radiusStyle.normal;
    }
  };

  const getLeadingArea = () => {
    if (buttonSize === 'mini-button') {
      return buttonStyle.leadingAreaMini;
    } else {
      if (iconPosition === 'leading-no-divider') {
        return buttonStyle.leadingAreaLargeNoDivider;
      }
      return buttonStyle.leadingAreaLarge;
    }
  };
  const getTrailingArea = () => {
    if (buttonSize === 'mini-button') {
      return buttonStyle.trailingAreaMini;
    } else {
      if (iconPosition === 'trailing-no-divider') {
        return buttonStyle.trailingAreaLargeNoDivider;
      }
      return buttonStyle.trailingAreaLarge;
    }
  };
  const leadingArea = getLeadingArea();
  const trailingArea = getTrailingArea();
  const loaderStyling = StyleSheet.create({
    textLoaderContainer: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderContainer: {
      position: 'absolute',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    text: {
      opacity: isLoading ? opacity.transparent : opacity.opaque,
    },
  });
  const defaultIconSize = buttonSize === 'mini-button' ? 14 : 16;
  return {
    buttonSizeStyle,
    variantStyle,
    buttonRadiusStyle,
    trailingArea,
    leadingArea,
    loaderStyling,
    defaultIconSize,
  };
};
