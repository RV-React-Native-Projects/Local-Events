import { ColorValue } from 'react-native';
import { EyeSvg } from '@svgs';

export type DefaultIcons = 'eye';

export const getDefaultIcon = (
  icon:
    | DefaultIcons
    | ((color?: ColorValue | string, size?: number) => React.ReactNode),
  color?: ColorValue | string,
  size?: number,
): React.ReactNode => {
  const iconSize = size || 16;

  if (typeof icon !== 'string') {
    return icon && icon?.(color, iconSize);
  }

  switch (icon) {
    case 'eye':
      return <EyeSvg color={color} height={iconSize} width={iconSize} />;
    default:
      return;
  }
};
