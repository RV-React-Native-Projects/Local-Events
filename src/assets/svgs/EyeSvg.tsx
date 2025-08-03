import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function EyeSvg(props: SVGProps) {
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
      viewBox="0 0 23 19"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <Path
        d="M14.694 9.5c0 1.814-1.43 3.285-3.194 3.285S8.306 11.315 8.306 9.5c0-1.815 1.43-3.286 3.194-3.286s3.194 1.471 3.194 3.286z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.75 8.442a1.847 1.847 0 010 2.116c-1.449 2.103-5.044 6.608-9.25 6.608s-7.801-4.505-9.25-6.608a1.847 1.847 0 010-2.116c1.449-2.104 5.044-6.609 9.25-6.609s7.801 4.505 9.25 6.609z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
