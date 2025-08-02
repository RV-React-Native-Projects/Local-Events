import { Text } from 'react-native';
import { ScreenWrapper } from '@components/Wrapper';
import {
  OnBoardingNavigationProps,
  OnBoardingRouteProp,
  ScreenPropsType,
} from '@navigation/types';

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
