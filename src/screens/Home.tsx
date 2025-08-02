import { View, Text } from 'react-native';
import {
  HomeNavigationProps,
  HomeRouteProp,
  ScreenPropsType,
} from '@navigation/types';

export default function Home({}: ScreenPropsType<
  HomeNavigationProps,
  HomeRouteProp
>) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
