import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function BackArrow(props: SVGProps) {
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
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.707 4.293a1 1 0 010 1.414L6.414 11H20a1 1 0 110 2H6.414l5.293 5.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
        fill={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
