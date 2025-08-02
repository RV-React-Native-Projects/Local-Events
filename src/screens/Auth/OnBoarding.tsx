import { ScreenWrapper } from '@components/Wrapper';
import {
  OnBoardingNavigationProps,
  OnBoardingRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { Text } from 'react-native';

export default function OnBoarding({}: ScreenPropsType<
  OnBoardingNavigationProps,
  OnBoardingRouteProp
>) {
  return (
    <ScreenWrapper hideStatusbar>
      <Text>OnBoarding</Text>
    </ScreenWrapper>
  );
}
