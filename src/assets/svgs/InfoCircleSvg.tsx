import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { moderateScale } from '@themes/responsive';

export default function InfoCircleSvg(props: SVGProps) {
  const {
    width = 22,
    height = 22,
    color = '#0B0D12',
    fill = 'none',
    strokeWidth = 1.5,
    ...rest
  } = props;

  return (
    <Svg
      width={moderateScale(width)}
      height={moderateScale(height)}
      viewBox="0 0 22 21"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <Path
        d="M11 6.425h.009m-.01 3.564v4.584m9.167-4.074a9.167 9.167 0 11-18.333 0 9.167 9.167 0 0118.333 0z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
