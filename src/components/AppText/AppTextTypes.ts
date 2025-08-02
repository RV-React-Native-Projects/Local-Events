import { TextProps } from 'react-native';
import { ColorThemeTypes } from '@colors';
import { FontFamily } from '@themes/fontSize';

export type AppTextVariants =
  | 'largeTitle'
  | 'title'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'header'
  | 'body'
  | 'subhead'
  | 'footnote'
  | 'footnote8'
  | 'footnote10'
  | 'button-mini'
  | 'button'
  | 'label'
  | 'label-mini'
  | 'label-light';

export type AppTextProps = TextProps & {
  color?: ColorThemeTypes;
  variant?: AppTextVariants;
  /**
   * The size of the text (optional), use in absence of a meaningful variant.
   * @type {number}
   */
  size?: number;

  /**
   * The fontFamily of the text(optional), use in absence of a meaningful variant.
   * @type {string}
   */
  fontFamily?: FontFamily;
  /**
   * To convert the Text to UPPERCASE! with less effort.
   * @type {boolean}
   */
  uppercase?: boolean;
  /**
   * Align the Text to 'auto' | 'left' | 'right' | 'center' | 'justify'
   * @type {string}
   */
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
};
