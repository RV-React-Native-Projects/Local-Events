import { StyleSheet } from 'react-native';
import { gully } from '@themes/spacing';
export const useHeaderStyle = () => {
  return StyleSheet.create({
    container: {},
    leftIconPressable: {
      marginLeft: gully,
    },
    uppercase: { textTransform: 'uppercase' },
  });
};
