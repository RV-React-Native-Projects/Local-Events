import { StyleProp, ViewStyle, TextInputProps, TextStyle } from 'react-native';

export interface ISearchInputProps extends TextInputProps {
  debounced?: boolean;
  delay?: number;
  getSearchText: (text: string) => void;
  onPressSearch?: () => void;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
}
