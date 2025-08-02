import { moderateScale } from '@themes/responsive';

export const spacing = {
  /** @value 0 with scale */
  none: moderateScale(0),
  /** @value 2 with scale */
  extraSmall: moderateScale(2),
  /** @value 4 with scale */
  small: moderateScale(4),
  /** @value 8 with scale */
  base: moderateScale(8),
  /** @value 10 with scale */
  baseLarge: moderateScale(10),
  /** @value 12 with scale */
  smallMedium: moderateScale(12),
  /** @value 14 with scale */
  medium: moderateScale(14),
  /** @value 16 with scale */
  mediumLarge: moderateScale(16),
  /** @value 20 with scale */
  smallLarge: moderateScale(20),
  /** @value 24 with scale */
  large: moderateScale(24),
  /** @value 30 with scale */
  extraLarge: moderateScale(30),
  /** @value 32 with scale */
  extraLargePlus: moderateScale(32),
  /** @value 40 with scale */
  massive: moderateScale(40),
  /** @value 64 with scale */
  colossal: moderateScale(64),

  // Deprecated Keys (Mapped to New Keys)
  /** @deprecated Use 'extraSmall' instead */
  xxs: moderateScale(2),
  /** @deprecated Use 'small' instead */
  xs: moderateScale(4),
  /** @deprecated Use 'base' instead */
  sm: moderateScale(8),
  /** @deprecated Use 'baseLarge' instead */
  sml: moderateScale(10),
  /** @deprecated Use 'medium' instead */
  smd: moderateScale(14),
  /** @deprecated Use 'mediumLarge' instead */
  md: moderateScale(16),
  /**  @deprecated Use 'smallLarge' instead */
  lmd: moderateScale(20),
  /** @deprecated Use 'large' instead */
  lg: moderateScale(24),
  /** @deprecated Use 'extraLarge' instead */
  sxl: moderateScale(30),
  /** @deprecated Use 'extraLargePlus' instead */
  xl: moderateScale(32),
  /** @deprecated Use 'massive' instead */
  xxl: moderateScale(40),
  /** @deprecated Use 'colossal' instead */
  xxxl: moderateScale(64),
};

export type Spacing = keyof typeof spacing;

export type VSpacingType = {
  marginVertical?: [Spacing, Spacing];
  paddingVertical?: [Spacing, Spacing];
};

/** An space element constant for design which will allow us to use constant spacing on both ends of UI.*/
export const gully = spacing.mediumLarge;
