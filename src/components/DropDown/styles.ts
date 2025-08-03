import { StyleSheet } from 'react-native';
import { useAppTheme } from '@redux/hooks';
import { border, radius } from '@themes/border';
import { fontFamily, fontSize } from '@themes/fontSize';
import { spacing } from '@themes/spacing';
import { INPUT_HEIGHT } from '@utils/constants';

export const useDropDownStyle = () => {
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      height: INPUT_HEIGHT,
      borderRadius: radius.future,
      borderWidth: border.normal,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: spacing.small,
      marginBottom: spacing.small,
    },
    dropdown: {
      height: '100%',
      paddingHorizontal: spacing.base,
      backgroundColor: colors.backgroundColor,
      width: '100%',
      borderRadius: radius.future,
    },
    placeholderStyle: {
      fontSize: fontSize[16],
      color: colors.paragraph,
      fontFamily: fontFamily.Regular,
    },
    selectedTextStyle: {
      fontSize: fontSize[16],
      color: colors.title,
      fontFamily: fontFamily.Regular,
    },
    itemTextStyle: {
      color: colors.title,
      fontSize: fontSize[14],
      fontFamily: fontFamily.Regular,
    },
    label: {
      marginVertical: spacing.small,
      marginBottom: spacing.base,
    },
  });
  return { styles };
};
