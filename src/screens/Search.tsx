import { View, Text } from 'react-native';
import {
  ScreenPropsType,
  SearchNavigationProps,
  SearchRouteProp,
} from '@navigation/types';

export default function Search({}: ScreenPropsType<
  SearchNavigationProps,
  SearchRouteProp
>) {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}
