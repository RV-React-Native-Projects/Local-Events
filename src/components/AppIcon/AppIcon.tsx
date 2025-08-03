import React from 'react';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import MIcon from '@react-native-vector-icons/material-icons';
import { useAppTheme } from '@redux/hooks';
import { ColorThemeTypes } from '@themes/colors';
import size from '@themes/size';
import { AppIconProps, ImageIconProps, SVGIconProps } from './AppIconTypes';

const IconFC: React.FC<AppIconProps> & {
  Image: React.FC<ImageIconProps>;
  Svg: React.FC<SVGIconProps>;
} = props => {
  const { colors } = useAppTheme();
  const { icon, iconSize = 'md', color = '#000' } = props;
  const selectedSize = size[iconSize];
  return (
    // FIXME: @ts-ignore
    <MIcon
      name={icon}
      color={colors[color as ColorThemeTypes] ?? color}
      size={selectedSize}
    />
  );
};

IconFC.Image = ({ iconSize, style, ...rest }: ImageIconProps) => {
  const selectedSize = size[iconSize || 'md'];

  return (
    <FastImage
      {...rest}
      style={[
        {
          width: selectedSize,
          height: selectedSize,
        },
        style as ImageStyle,
      ]}
    />
  );
};

// Subcomponent for SVG icons
IconFC.Svg = ({ svg: SvgIcon }: SVGIconProps) => {
  return <SvgIcon />;
};

const AppIcon = IconFC;
export default AppIcon;
