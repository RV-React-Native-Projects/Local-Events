import { View, ViewProps, useWindowDimensions } from 'react-native';
import { moderateScale } from '@themes/responsive';
import * as s from '@themes/size';

interface HorizontalSpacingTypes extends ViewProps {
  height?: number;
  size?: number;
}
interface VerticalSpacingTypes {
  width?: number;
  size?: number;
}

export function HorizontalSpacing(props: HorizontalSpacingTypes) {
  const { height: windowHeight } = useWindowDimensions();
  const { height = windowHeight, size = s.default.xxs } = props || {};
  return (
    <View
      style={{
        height: moderateScale(height), // Ensure height is a valid dimension value
        width: size,
      }}
    />
  );
}

export function VerticalSpacing(props: VerticalSpacingTypes) {
  const { width: windowWidth } = useWindowDimensions();
  const { size = s.default.xxs, width = windowWidth } = props || {};
  return (
    <View
      style={{
        height: size,
        width: moderateScale(width),
      }}
    />
  );
}
