import { DatePickerOptions } from '@react-native-community/datetimepicker';

export interface IDateTimePickerProps extends DatePickerOptions {
  mode?: 'date' | 'time';
}
