import { StyleSheet } from 'react-native';
import { moderateScale } from './responsive';

export const border = {
  /** Very thin border: 0 */
  none: 0,
  /** Very thin border: 0.5 */
  veryThin: StyleSheet.hairlineWidth,
  /** Thin border: 0.8 */
  thin: 0.8,
  /** Normal border: 1 */
  normal: 1,
  /** Thick border: 1.5 */
  thick: 1.5,
  /** Very thick border: 2 */
  veryThick: 2,
};

export const radius = {
  /** @value here for suture reference in case we need something else as radius */
  future: moderateScale(2),
  /** @value borderRadius: none */
  none: moderateScale(0),
  /** @value borderRadius: 2 */
  xs: moderateScale(2),
  /** @value borderRadius: 4 */
  sm: moderateScale(4),
  /** @value borderRadius: 7 */
  md: moderateScale(7),
  /** @value borderRadius: 8 */
  lg: moderateScale(8),
  /** @value borderRadius: 10 */
  xl: moderateScale(10),
  /** @value borderRadius: 15 */
  xxl: moderateScale(15),
  /** @value borderRadius: 20 */
  xxxl: moderateScale(20),
  /** @value borderRadius: round */
  round: moderateScale(100),
};
