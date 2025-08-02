import {
  ScreenPropsType,
  SearchNavigationProps,
  SearchRouteProp,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
