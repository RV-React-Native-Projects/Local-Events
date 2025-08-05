import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '@components/AppText/AppText';
import { useAppTheme } from '@redux/hooks';
import { opacity } from '@themes/opacity';
import { AppButtonProps } from './AppButtonTypes';
import { getDefaultIcon } from './getDefaultIcon';
import { useButtonStyle } from './style';

export interface LinearButtonProps extends Omit<AppButtonProps, 'variant'> {
  // Gradient specific props
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  gradientOpacity?: number;
  // Enhanced gradient features
  gradientType?: 'linear' | 'radial';
  gradientStops?: number[];
  // Animation props
  animated?: boolean;
  animationDuration?: number;
}

export default function LinearButton(props: LinearButtonProps) {
  const {
    disabled,
    size = 'standard',
    onPress,
    title,
    color = 'primary',
    isLoading,
    iconPosition,
    radius = 'future',
    style,
    renderIcon,
    textTransform,
    fontSize,
    gradientColors = ['#8B5CF6', '#4F46E5', '#3B82F6'],
    gradientStart = { x: 0, y: 0 },
    gradientEnd = { x: 1, y: 1 },
    gradientOpacity = 1,
    gradientStops,
    animated = false,
    animationDuration = 2000,
    ...restProps
  } = props;

  const {
    buttonSizeStyle,
    variantStyle,
    buttonRadiusStyle,
    leadingArea,
    trailingArea,
    loaderStyling,
    defaultIconSize,
  } = useButtonStyle({
    buttonRadius: radius,
    buttonSize: size,
    color: color,
    variant: 'filled', // LinearButton always uses filled variant for gradient
    iconPosition: iconPosition,
    isLoading,
    textTransform,
    customFontSize: fontSize,
  });

  const { colors } = useAppTheme();
  const variantStyles = variantStyle();

  const _buttonContent = () => {
    return (
      <>
        {size !== 'icon-button' && (
          <>
            {!!title && (
              <>
                {!!renderIcon && iconPosition === 'leading' && (
                  <View style={leadingArea}>
                    {getDefaultIcon(
                      renderIcon,
                      variantStyles.text.color,
                      defaultIconSize,
                    )}
                  </View>
                )}
                <View style={loaderStyling.textLoaderContainer}>
                  {isLoading && (
                    <View style={loaderStyling.loaderContainer}>
                      <ActivityIndicator
                        size="small"
                        color={variantStyles.text.color}
                      />
                    </View>
                  )}
                  <AppText
                    numberOfLines={1}
                    lineBreakMode="clip"
                    style={[variantStyles.text, loaderStyling.text]}>
                    {title}
                  </AppText>
                </View>
                {!!renderIcon && !isLoading && iconPosition === 'trailing' && (
                  <View style={trailingArea}>
                    {getDefaultIcon(
                      renderIcon,
                      variantStyles.text.color,
                      defaultIconSize,
                    )}
                  </View>
                )}
              </>
            )}
          </>
        )}
        {!!renderIcon && size === 'icon-button' && (
          <>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={variantStyles.text.color ?? colors.text}
              />
            ) : (
              getDefaultIcon(
                renderIcon,
                variantStyles.text.color,
                defaultIconSize,
              )
            )}
          </>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      {...restProps}
      disabled={disabled || isLoading}
      onPress={onPress}
      activeOpacity={opacity.dark}
      style={[
        variantStyles.background,
        buttonSizeStyle(),
        buttonRadiusStyle(),
        style,
        styles.linerButton,
      ]}>
      <LinearGradient
        colors={gradientColors}
        start={gradientStart}
        end={gradientEnd}
        locations={gradientStops}
        style={[StyleSheet.absoluteFillObject, { opacity: gradientOpacity }]}
      />
      <View style={styles.contentContainer}>{_buttonContent()}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linerButton: { overflow: 'hidden', borderWidth: 0 },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
