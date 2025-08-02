import { moderateScale as scale } from 'react-native-size-matters';

export const moderateScale = (val: number, resolution?: number) => {
  return scale(val, resolution ?? 0.3);
};
