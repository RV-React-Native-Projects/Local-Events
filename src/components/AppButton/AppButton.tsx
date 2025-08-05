import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import AppText from '@components/AppText/AppText';
import { useAppTheme } from '@redux/hooks';
import { opacity } from '@themes/opacity';
import { AppButtonProps } from './AppButtonTypes';
import { getDefaultIcon } from './getDefaultIcon';
import { useButtonStyle } from './style';

export default function AppButton(props: AppButtonProps) {
  const {
    variant = 'filled',
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
    variant:
      disabled || (isLoading && variant !== 'ghost') ? 'disable' : variant,
    iconPosition: iconPosition,
    isLoading,
    textTransform,
    customFontSize: fontSize,
  });

  const { colors } = useAppTheme();
  const variantStyles = variantStyle();

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || variant === 'disable' || isLoading}
      style={[
        variantStyles.background,
        buttonSizeStyle(),
        buttonRadiusStyle(),
        style,
      ]}
      onPress={onPress}
      activeOpacity={opacity.dark}>
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
                      size={'small'}
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
              size={'small'}
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
    </TouchableOpacity>
  );
}
