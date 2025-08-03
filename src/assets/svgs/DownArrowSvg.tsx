import Svg, { Defs, Path, Rect } from 'react-native-svg';
import { SVGProps } from '@interfaces/SVGProps';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';

export default function DownArrowSvg(props: SVGProps) {
  const { colors } = useAppTheme();
  const {
    width = 25,
    height = 25,
    color = colors.darkText,
    color2 = colors.backgroundColor,
    fill = 'none',
    ...rest
  } = props;

  return (
    <Svg
      width={moderateScale(width)}
      height={moderateScale(height)}
      viewBox="0 0 19 20"
      fill={fill}
      {...rest}>
      <Path
        d="M5.5415 8.10498L9.49984 12.0633L13.4582 8.10498H5.5415Z"
        fill={color}
      />
      <Defs>
        <Rect
          width={moderateScale(width)}
          height={moderateScale(height)}
          fill={color2}
          transform="translate(0 0.188354)"
        />
      </Defs>
    </Svg>
  );
}
