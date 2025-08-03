import Svg, { Path } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function CalenderSvg(props: SVGProps) {
  const { colors } = useAppTheme();
  const {
    width = 25,
    height = 25,
    color = colors.iconColor,
    fill = 'none',
    ...rest
  } = props;

  return (
    <Svg
      width={moderateScale(width)}
      height={moderateScale(height)}
      viewBox="0 0 23 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <Path
        d="M18.208 2.417h-.958v-.959a.958.958 0 00-1.917 0v.959H7.667v-.959a.958.958 0 00-1.917 0v.959h-.958A4.797 4.797 0 000 7.208v11.5A4.798 4.798 0 004.792 23.5h13.416A4.797 4.797 0 0023 18.708v-11.5a4.797 4.797 0 00-4.792-4.791zM1.917 7.208a2.875 2.875 0 012.875-2.875h13.416a2.875 2.875 0 012.875 2.875v.959H1.917v-.959zm16.291 14.375H4.792a2.875 2.875 0 01-2.875-2.875v-8.625h19.166v8.625a2.875 2.875 0 01-2.875 2.875z"
        fill={color}
      />
      <Path
        d="M11.5 16.313a1.438 1.438 0 100-2.876 1.438 1.438 0 000 2.876zM6.708 16.313a1.438 1.438 0 100-2.876 1.438 1.438 0 000 2.876zM16.292 16.313a1.438 1.438 0 100-2.876 1.438 1.438 0 000 2.876z"
        fill={color}
      />
    </Svg>
  );
}
