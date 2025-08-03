import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { trimStart } from 'lodash';
import AppText from '@components/AppText/AppText';
import { useAppTheme } from '@redux/hooks';
import { border, radius } from '@themes/border';
import { moderateScale } from '@themes/responsive';
import { INPUT_HEIGHT } from '@utils/constants';
import { AppTextInputProps } from './AppInputTypes';
import { useInputStyle } from './styles';

const AppInput = React.memo((props: AppTextInputProps) => {
  const { colors } = useAppTheme();
  const { inputStyle } = useInputStyle();
  const {
    label = "label",
    error = false,
    errorMessage = '',
    height = INPUT_HEIGHT,
    backgroundColor = colors.backgroundColor,
    styles,
    borderRadius = radius.future,
    borderWidth = border.normal,
    containerStyle,
    required = false,
    onBlur,
    wrapperStyle,
    onChangeText,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

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
            height: props.height ? moderateScale(height) : height,
            backgroundColor: props.readOnly
              ? colors.inputBorderAlt
              : backgroundColor,
            borderRadius: moderateScale(borderRadius),
            borderWidth: moderateScale(borderWidth),
            borderColor: props.readOnly
              ? colors.inputBorderAlt
              : error && !isFocused
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.inputBorder,
          },
          containerStyle,
        ]}>
        <TextInput
          importantForAutofill="no"
          autoComplete="off"
          style={[
            inputStyle.texInputStyle,
            props.multiline ? inputStyle.textTop : inputStyle.textCenter,
            {
              color: error && !isFocused ? colors.error : colors.text,
            },
          ]}
          keyboardType="default"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          placeholderTextColor={colors.paragraph}
          clearButtonMode="while-editing"
          onChangeText={text => onChangeText && onChangeText(trimStart(text))}
          {...restProps}
        />
      </View>
      {error && errorMessage && (
        <AppText variant="footnote" fontFamily="Regular" color="error">
          {errorMessage}
        </AppText>
      )}
    </View>
  );
});

export default React.memo(AppInput);
