import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import EyeCloseSvg from '@assets/svgs/EyeCloseSvg';
import EyeSvg from '@assets/svgs/EyeSvg';
import AppText from '@components/AppText/AppText';
import { useAppTheme } from '@redux/hooks';
import { border, radius } from '@themes/border';
import { moderateScale } from '@themes/responsive';
import { AppTextInputProps } from './AppInputTypes';
import { useInputStyle } from './styles';

const PasswordInput = React.memo((props: AppTextInputProps) => {
  const { colors } = useAppTheme();
  const { inputStyle } = useInputStyle();
  const {
    label = 'Password',
    error = false,
    errorMessage = '',
    height = 50,
    backgroundColor = colors.backgroundColor,
    styles,
    borderRadius = radius.xs,
    borderWidth = border.normal,
    containerStyle,
    required = true,
    wrapperStyle,
    onBlur,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  return (
    <View style={wrapperStyle}>
      {label && (
        <AppText
          variant="label"
          color={error && !isFocused ? 'error' : 'title'}
          style={[inputStyle.label, styles]}>
          {label} {required && <AppText color="error">*</AppText>}
        </AppText>
      )}
      <View
        style={[
          inputStyle.inputContainer,
          {
            height: moderateScale(height),
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
            borderColor:
              error && !isFocused
                ? colors.error
                : isFocused
                ? colors.primary
                : colors.subHeader,
            paddingRight: moderateScale(10),
          },
          containerStyle,
        ]}>
        <TextInput
          style={{
            ...inputStyle.texInputStyle,
            ...inputStyle.flex1,
            color: error && !isFocused ? colors.error : colors.title,
          }}
          placeholder="Password"
          keyboardType="default"
          onFocus={() => setIsFocused(true)}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor={colors.paragraph}
          clearButtonMode="while-editing"
          secureTextEntry={isPasswordHidden}
          textContentType="password"
          autoComplete="password"
          {...restProps}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsPasswordHidden(prev => !prev)}>
          {!isPasswordHidden ? (
            <EyeSvg color={isFocused ? colors.primary : colors.iconColor} />
          ) : (
            <EyeCloseSvg
              color={isFocused ? colors.primary : colors.iconColor}
            />
          )}
        </TouchableOpacity>
      </View>
      {error && errorMessage && (
        <AppText variant="footnote" fontFamily="Regular" color="error">
          {errorMessage}
        </AppText>
      )}
    </View>
  );
});

export default PasswordInput;
