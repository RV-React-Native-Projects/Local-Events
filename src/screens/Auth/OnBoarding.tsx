import { Text } from 'react-native';
import VibeSyncLogo from '@components/AppLogo/VibeSyncLogo';
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
    <ScreenWrapper>
      <VibeSyncLogo />
      <Text>OnBoarding</Text>
    </ScreenWrapper>
  );
}
