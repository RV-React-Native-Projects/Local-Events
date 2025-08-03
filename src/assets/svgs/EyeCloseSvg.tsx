import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function EyeCloseSvg(props: SVGProps) {
  const { colors } = useAppTheme();
  const {
    width = 25,
    height = 25,
    color = colors.iconColor,
    fill = 'none',
    strokeWidth = 1.5,
    ...rest
  } = props;

  return (
    <Svg
      width={moderateScale(width)}
      height={moderateScale(height)}
      viewBox="0 0 23 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <Path
        d="M20.125 1.375L16.8 4.7M2.875 18.625L6.2 15.3m0 0c-1.777-1.404-3.173-3.174-3.95-4.271a1.755 1.755 0 010-2.058c1.449-2.044 5.044-6.425 9.25-6.425 1.949 0 3.767.94 5.3 2.154M6.2 15.3L9.24 12.26m0 0A3.194 3.194 0 0113.76 7.74M9.24 12.26L13.76 7.74m0 0L16.8 4.7M9.37 17.092a6.7 6.7 0 002.13.362c4.206 0 7.801-4.38 9.25-6.425a1.755 1.755 0 000-2.058 24.381 24.381 0 00-1.264-1.632"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
