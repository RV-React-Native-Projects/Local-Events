import { moderateScale } from '@themes/responsive';

export const fontSize = {
  /** @value 8 with scale */
  8: moderateScale(8),
  /** @value 10 with scale */
  10: moderateScale(10),
  /** @value 12 with scale */
  12: moderateScale(12),
  /** @value 14 with scale */
  14: moderateScale(14),
  /** @value 16 with scale */
  16: moderateScale(16),
  /** @value 18 with scale */
  18: moderateScale(18),
  /** @value 20 with scale */
  20: moderateScale(20),
  /** @value 24 with scale */
  24: moderateScale(24),
  /** @value 26 with scale */
  26: moderateScale(26),
  /** @value 28 with scale */
  28: moderateScale(28),
  /** @value 32 with scale */
  32: moderateScale(32),
  /** @value 36 with scale */
  36: moderateScale(36),
  /** @value 48 with scale */
  48: moderateScale(48),
};

export const fontFamily = {
  /** @value Light 300 */
  Light: 'HelveticaNeueRoman',
  /** @value Light Italic 300 */
  LightItalic: 'HelveticaNeueItalic',
  /** @value Regular 400 */
  Regular: 'HelveticaNeueRoman',
  /** @value Regular Italic 400 */
  RegularItalic: 'HelveticaNeueItalic',
  /** @value Medium 500 */
  Medium: 'HelveticaNeueMedium',
  /** @value Medium Italic 500 */
  MediumItalic: 'HelveticaNeueMediumItalic',
  /** @value Bold 700 */
  Bold: 'HelveticaNeueBold',
  /** @value Bold Italic 700 */
  BoldItalic: 'HelveticaNeueBoldItalic',
};

export type FontFamily = keyof typeof fontFamily;
