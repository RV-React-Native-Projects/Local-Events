import { ColorValue } from 'react-native';
import { FastImageProps, ImageStyle } from 'react-native-fast-image';
import { SvgProps } from 'react-native-svg';
import { MaterialIconsIconName } from '@react-native-vector-icons/material-icons';
import { ColorThemeTypes } from '@themes/colors';
import { IconSizeKey } from '@themes/size';
import { Icons } from './AppIconsDir';

// Base type for icon types
type BaseIconProps = {
  iconSize?: IconSizeKey;
};

export type AppIconProps = BaseIconProps &
  Omit<MaterialIconsIconName, 'name'> & {
    icon: Icons;
    color?: ColorThemeTypes | ColorValue;
    spacing?: number;
  };

export type ImageIconProps = BaseIconProps &
  Omit<FastImageProps, 'style'> & {
    style?: ImageStyle;
  };

export type SVGIconProps = BaseIconProps & {
  svg: React.FC<SvgProps>;
};
