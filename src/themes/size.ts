import { moderateScale } from './responsive';

const size = {
  /** @value xs 10 */
  xxs: moderateScale(10),
  /** @value xs 16 */
  xs: moderateScale(16),
  /** @value sm 24 */
  sm: moderateScale(24),
  /** @value md 36 */
  md: moderateScale(36),
  /** @value lg 48 */
  lg: moderateScale(48),
  /** @value xl 72 */
  xl: moderateScale(72),
  /** @value xxl 96 */
  xxl: moderateScale(96),
  /** @value xxl 20 */
  20: moderateScale(20),
};
export type IconSizeKey =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | '20';
export default size;
