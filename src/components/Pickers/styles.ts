import { StyleSheet } from 'react-native';
import { useAppTheme } from '@redux/hooks';
import { border, radius } from '@themes/border';
import { fontFamily, fontSize } from '@themes/fontSize';
import size from '@themes/size';
import { spacing } from '@themes/spacing';
import { INPUT_HEIGHT } from '@utils/constants';

export const useDropDownStyle = () => {
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      height: INPUT_HEIGHT,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: spacing.mediumLarge,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      borderRadius: radius.future,
    },
    containerButtonStyle: {
      flex: 1,
      height: size.lg,
      width: '100%',
      minWidth: '100%',
      maxWidth: '95%',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    marginVertical4: {
      marginVertical: spacing.small,
    },
    label: {
      marginVertical: spacing.small,
      marginBottom: spacing.base,
    },
    pickerTheme: { fontFamily: fontFamily.Regular, fontSize: fontSize[14] },
  });
  return { styles };
};
