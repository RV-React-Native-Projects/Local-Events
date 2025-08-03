import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { DatePickerOptions } from '@react-native-community/datetimepicker';

export type BaseProps = {
  wrapperStyle?: StyleProp<ViewStyle>;
};

export type AppTextInputProps = BaseProps &
  TextInputProps & {
    label?: string;
    labelSize?: number;
    error?: boolean;
    errorMessage?: string;
    height?: number;
    backgroundColor?: string;
    styles?: TextStyle;
    borderRadius?: number;
    borderWidth?: number;
    containerStyle?: StyleProp<ViewStyle>;
    required?: boolean;
  };

export type AppDateInputProps = BaseProps &
  DatePickerOptions & {
    label?: string;
    placeholder?: string;
    labelSize?: number;
    error?: boolean;
    errorMessage?: string;
    height?: number;
    backgroundColor?: string;
    styles?: TextStyle;
    borderRadius?: number;
    borderWidth?: number;
    containerStyle?: StyleProp<ViewStyle>;
    required?: boolean;
    mode?: 'date' | 'time';
    disabled?: boolean;
  };


/**
 * Positions of an icon within a button.
 */
export type IconPosition = 'leading' | 'trailing';
