import { StyleSheet } from 'react-native';
import { useAppTheme } from '@redux/hooks';
import { border, radius } from '@themes/border';
import { fontFamily, fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import size from '@themes/size';
import { gully, spacing } from '@themes/spacing';

export const useInputStyle = () => {
  const { colors } = useAppTheme();

  const inputStyle = StyleSheet.create({
    container: { marginHorizontal: gully, marginBottom: spacing.mediumLarge },
    input: {
      flex: 1,
      height: size.lg,
      color: colors.inputText,
      marginBottom: spacing.base,
    },
    error: {
      fontSize: 12,
      color: colors.error,
      marginTop: spacing.small,
    },
    _label: {
      marginVertical: spacing.small,
      marginBottom: spacing.small,
    },
    get label() {
      return this._label;
    },
    set label(value) {
      this._label = value;
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: spacing.small,
      marginBottom: spacing.small,
    },
    datePickerStyle: {
      height: '100%',
      width: '100%',
      fontFamily: fontFamily.Regular,
      paddingVertical: spacing.mediumLarge,
      paddingHorizontal: spacing.base,
      fontSize: fontSize[14],
    },
    texInputStyle: {
      height: '100%',
      width: '100%',
      fontFamily: fontFamily.Regular,
      paddingVertical: spacing.base,
      paddingHorizontal: spacing.base,
      fontSize: fontSize[14],
      borderRadius: radius.future,
    },
    phoneInput: {
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      width: '100%',
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 'auto',
      backgroundColor: colors.backgroundColor,
      borderWidth: border.normal,
      borderColor: colors.inputBorder,
      borderTopLeftRadius: radius.xs,
      borderBottomLeftRadius: radius.xs,
      borderTopRightRadius: radius.xs,
      borderBottomRightRadius: radius.xs,
      paddingHorizontal: spacing.base,
    },
    phoneInputMainContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: spacing.mediumLarge,
      marginBottom: spacing.small,
    },
    containerButtonStyle: {
      minWidth: moderateScale(80),
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fontFamily.Regular,
      fontSize: fontSize[14],
      color: colors.error,
    },
    pickerTheme: { fontFamily: fontFamily.Regular, fontSize: fontSize[14] },
    marginVertical4: {
      marginVertical: spacing.small,
    },
    phoneTextInput: {
      borderTopRightRadius: radius.xs,
      borderBottomRightRadius: radius.xs,
      borderTopLeftRadius: radius.none,
      borderBottomLeftRadius: radius.none,
      marginBottom: 0,
    },
    flex1: { flex: 1 },
    textCenter: { textAlignVertical: 'center' },
    textTop: { textAlignVertical: 'top' },
  });
  return { inputStyle };
};
