import { ColorValue, TouchableOpacityProps } from 'react-native';
import { DefaultIcons } from './getDefaultIcon';

/**
 * Variants of a button.
 */
export type ButtonVariants = 'filled' | 'outline' | 'ghost' | 'disable';

/**
 * Colors of a button.
 */
export type ButtonColors = 'primary' | 'secondary' | 'danger' | 'success';

/**
 * Radius of a button.
 */
export type ButtonRadius = 'zero' | 'normal' | 'full' | 'future';

/**
 * Sizes of a button.
 */
export type ButtonSize =
  | 'standard' // button that takes constant height but width is according to required space can be used in a row with same button as pair
  | 'compact' // a button that takes width according to text and content height is same as standard
  | 'mini-button' // same as compact but height is lesser
  | 'icon-button'; // squired icons button

/**
 * Positions of an icon within a button.
 */
export type IconPosition = 'leading' | 'trailing';
// | 'center-left' | 'center-right';

export type AppButtonProps = TouchableOpacityProps & {
  onPress?: () => void;
  title?: string;
  variant?: ButtonVariants;
  size?: ButtonSize;
  iconPosition?: IconPosition;
  renderIcon?:
    | ((
        color: ColorValue | string | undefined,
        size?: number,
      ) => React.ReactNode)
    | DefaultIcons;
  color?: ButtonColors;
  isLoading?: boolean;
  radius?: ButtonRadius;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  fontSize?: number;
};
