import { StyleSheet } from 'react-native';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

export const useSearchInputStyle = () => {
  const { colors, shadow } = useAppTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: spacing.baseLarge,
      backgroundColor: colors.backgroundColor,
      height: moderateScale(60),
    },
    inputStyle: {
      flex: 1,
      padding: spacing.baseLarge,
      backgroundColor: colors.appBackgroundColor,
      fontSize: fontSize[16],
      borderRadius: radius.sm,
      height: moderateScale(40),
    },
    searchButton: {
      height: moderateScale(40),
      padding: spacing.base,
      borderRadius: radius.sm,
      marginLeft: moderateScale(1),
      backgroundColor: colors.appBackgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadow.small,
    },
  });
};
