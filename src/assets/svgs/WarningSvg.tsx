import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function WarningSvg(props: SVGProps) {
  const { colors } = useAppTheme();
  const {
    width = 35,
    height = 35,
    color = colors.warning,
    fill = 'none',
    strokeWidth = 2,
    ...rest
  } = props;

  return (
    <Svg
      width={moderateScale(width)}
      height={moderateScale(height)}
      viewBox="0 0 31 31"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <Path
        d="M10.409 27.226L2 29.328l2.102-6.306V4.102A2.102 2.102 0 016.204 2h21.022a2.102 2.102 0 012.102 2.102v21.022a2.103 2.103 0 01-2.102 2.102H10.409zM16.715 7.256v6.307"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.715 20.919a1.051 1.051 0 100-2.103 1.051 1.051 0 000 2.103z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
