import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { getTimeZone } from 'react-native-localize';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CalenderSvg from '@assets/svgs/CalenderSvg';
import AppText from '@components/AppText/AppText';
import AppDateTimePicker from '@components/Pickers/DateTimePicker';
import { useAppTheme } from '@redux/hooks';
import { border, radius } from '@themes/border';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';
import { INPUT_HEIGHT } from '@utils/constants';
import { device } from '@utils/device';
import { AppDateInputProps } from './AppInputTypes';
import { useInputStyle } from './styles';

const DateTimeInput = React.memo((props: AppDateInputProps) => {
  const { colors } = useAppTheme();
  const { inputStyle } = useInputStyle();
  const {
    label = 'label',
    placeholder = 'Enter a valid date',
    error = false,
    errorMessage = '',
    height = INPUT_HEIGHT,
    backgroundColor = colors.backgroundColor,
    styles,
    borderRadius = radius.future,
    borderWidth = border.normal,
    containerStyle,
    required = false,
    value,
    mode = 'date',
    onChange,
    wrapperStyle,
    minimumDate,
    maximumDate,
    disabled = false,
    ...rest
  } = props;
  const [showPicker, setShowPicker] = useState(false);

  const pickerValue =
    value instanceof Date && !isNaN(value.getTime()) ? value : new Date();

  const onPressHandler = () => {
    if (device.isAndroid) {
      DateTimePickerAndroid.open({
        value: pickerValue,
        onChange: (event, selectedDate) => {
          if (event.type === 'set' && selectedDate) {
            onChange?.(event, selectedDate);
          }
        },
        mode,
        minimumDate,
        maximumDate,
        timeZoneName: getTimeZone(),
        ...rest,
      });
    } else {
      setShowPicker(!showPicker);
    }
  };

  return (
    <View style={wrapperStyle}>
      {label && (
        <AppText
          variant="label"
          color={error ? 'error' : 'title'}
          style={[inputStyle.label, styles]}>
          {label} {required && <AppText color="error">*</AppText>}
        </AppText>
      )}
      <Pressable
        disabled={disabled}
        onPress={onPressHandler}
        style={[
          inputStyle.inputContainer,
          {
            height: props.height ? moderateScale(height) : height,
            backgroundColor: backgroundColor,
            borderRadius: moderateScale(borderRadius),
            borderWidth: moderateScale(borderWidth),
            borderColor: disabled
              ? colors.btnBgDisabled
              : error
              ? colors.error
              : colors.inputBorder,
          },
          containerStyle,
        ]}>
        <View style={[style.view]} {...props}>
          {value instanceof Date && !isNaN(value.getTime()) ? (
            <AppText color="text" variant="label">
              {value.toLocaleString(
                'en-US',
                mode === 'time'
                  ? {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    }
                  : {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    },
              )}
            </AppText>
          ) : (
            <AppText color="placeholder" variant="label">
              {placeholder}
            </AppText>
          )}
          <View style={style.iconWrapper}>
            {!device.isAndroid && showPicker && (
              <AppDateTimePicker
                {...rest}
                mode={mode}
                display="default"
                value={pickerValue}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={(event, date) => {
                  if (date) {
                    onChange?.(event, date);
                  }
                  setShowPicker(false);
                }}
              />
            )}
            <View style={style.icon}>
              <CalenderSvg color={colors.primary} />
            </View>
          </View>
        </View>
      </Pressable>
      {error && errorMessage && (
        <AppText variant="footnote" fontFamily="Regular" color="error">
          {errorMessage}
        </AppText>
      )}
    </View>
  );
});

export default DateTimeInput;

const style = StyleSheet.create({
  view: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: spacing.base,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginLeft: spacing.base,
  },
});
