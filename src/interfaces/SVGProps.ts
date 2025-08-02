import { ColorValue } from 'react-native';
import { SvgProps } from 'react-native-svg';

export interface SVGProps extends SvgProps {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
  width?: number;
  height?: number;
  fill?: string;
  color?: ColorValue | string;
  color2?: ColorValue | string;
  strokeWidth?: number;
}
