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
  Light: 'Rubik-Light',
  /** @value Light Italic 300 */
  LightItalic: 'Rubik-LightItalic',
  /** @value Regular 400 */
  Regular: 'Rubik-Regular',
  /** @value Regular Italic 400 */
  RegularItalic: 'Rubik-Italic',
  /** @value Medium 500 */
  Medium: 'Rubik-Medium',
  /** @value Medium Italic 500 */
  MediumItalic: 'Rubik-MediumItalic',
  /** @value Bold 600 */
  SemiBold: 'Rubik-SemiBold',
  /** @value Bold Italic 600 */
  SemiBoldItalic: 'Rubik-SemiBoldItalic',
  /** @value Bold 700 */
  Bold: 'Rubik-Bold',
  /** @value Bold Italic 700 */
  BoldItalic: 'Rubik-BoldItalic',
  /** @value Bold 900 */
  ExtraBold: 'Rubik-ExtraBold',
  /** @value Bold Italic 900 */
  ExtraBoldItalic: 'Rubik-ExtraBoldItalic',
};

export type FontFamily = keyof typeof fontFamily;
