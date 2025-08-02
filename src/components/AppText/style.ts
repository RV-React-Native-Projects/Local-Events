import { StyleSheet, TextStyle } from 'react-native';
import { ColorThemeTypes } from '@colors';
import { useAppTheme } from '@redux/hooks';
import { fontSize, fontFamily } from '@themes/fontSize';
import { AppTextVariants } from './AppTextTypes';

export const useAppTextStyle = (uppercase: boolean) => {
  const { colors } = useAppTheme();
  const typographyStyle = (
    variant: AppTextVariants,
    color: ColorThemeTypes,
  ) => {
    const textStyle: TextStyle = {
      textAlignVertical: 'center',
    };
    switch (variant) {
      case 'largeTitle':
        textStyle.fontSize = fontSize[48];
        break;
      case 'title1':
        textStyle.fontSize = fontSize[24];
        break;
      case 'header':
        textStyle.fontSize = fontSize[20];
        break;
      case 'title2':
        textStyle.fontSize = fontSize[18];
        break;
      case 'body':
      case 'subhead':
      case 'title3':
      case 'button':
      case 'title':
        textStyle.fontSize = fontSize[16];
        break;
      case 'button-mini':
      case 'label':
        textStyle.fontSize = fontSize[14];
        break;
      case 'footnote':
        textStyle.fontSize = fontSize[12];
        break;
      case 'footnote10':
        textStyle.fontSize = fontSize[10];
        break;
      case 'footnote8':
        textStyle.fontSize = fontSize[8];
        break;
      case 'label-mini':
      case 'label-light':
        textStyle.fontSize = fontSize[12];
        break;
      default:
        textStyle.fontSize = fontSize[14];
        break;
    }
    switch (variant) {
      case 'largeTitle':
      case 'title1':
      case 'title2':
      case 'footnote8':
      case 'footnote10':
        textStyle.fontFamily = fontFamily.Bold;
        break;
      case 'header':
      case 'title':
        textStyle.fontFamily = fontFamily.Medium;
        break;
      case 'label':
      case 'label-mini':
      case 'title3':
      case 'button':
      case 'button-mini':
      case 'body':
        textStyle.fontFamily = fontFamily.Regular;
        break;
      case 'footnote':
      case 'label-light':
      case 'subhead':
        textStyle.fontFamily = fontFamily.Light;
        break;
      default:
        textStyle.fontFamily = fontFamily.Regular;
        break;
    }

    if (uppercase) {
      textStyle.textTransform = 'uppercase';
    }

    textStyle.color = colors[color];
    return StyleSheet.create({ style: textStyle });
  };
  return { typographyStyle };
};
