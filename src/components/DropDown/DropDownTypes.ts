import { ViewStyle } from 'react-native';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

export interface DropdownComponentProps<T> extends DropdownProps<T> {
  label?: string | null;
  placeholder?: string;
  value?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  data: T[];
  containerStyle?: ViewStyle;
}

export interface DropDownDataInterface<T = string> {
  label: string;
  value: T;
}
