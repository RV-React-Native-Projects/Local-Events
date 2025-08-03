import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function ErrorSvg(props: SVGProps) {
  const { colors } = useAppTheme();
  const {
    width = 35,
    height = 35,
    color = colors.error,
    fill = 'none',
    ...rest
  } = props;

  return (
    <Svg
      width={moderateScale(width)}
      height={moderateScale(height)}
      viewBox="0 0 34 34"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <Path
        d="M16.985 2.833C9.165 2.833 2.833 9.18 2.833 17c0 7.82 6.333 14.166 14.152 14.166 7.835 0 14.181-6.346 14.181-14.166S24.82 2.833 16.986 2.833zm.015 25.5c-6.262 0-11.334-5.072-11.334-11.333 0-6.262 5.072-11.334 11.334-11.334 6.261 0 11.333 5.072 11.333 11.334 0 6.261-5.072 11.333-11.333 11.333zm-1.417-7.083h2.833v2.833h-2.833V21.25zm0-11.334h2.833v8.5h-2.833v-8.5z"
        fill={color}
      />
    </Svg>
  );
}
