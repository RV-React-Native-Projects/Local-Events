import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function CheckCircledSvg(props: SVGProps) {
  const { colors } = useAppTheme();
  const {
    width = 25,
    height = 25,
    color = colors.success,
    fill = 'none',
    ...rest
  } = props;

  return (
    <Svg
      width={moderateScale(width)}
      height={moderateScale(height)}
      viewBox="0 0 29 30"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <Path
        d="M26.583 13.889V15a12.083 12.083 0 11-7.165-11.044m7.165 1.378L14.5 17.429l-3.625-3.625"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
