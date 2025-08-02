import {
  HomeNavigationProps,
  HomeRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { View, Text } from 'react-native';

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
