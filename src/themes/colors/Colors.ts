import { ColorTheme } from './ColorThemeTypes';

const colorPalette = {
  // Shades of Black and White
  black: '#000000',
  charcoal: '#171717',
  matteBlack: '#252F40',
  mediumBlack: '#282828',
  lightBlack: '#3D3D3D',
  white: '#FFFFFF',
  lightWhite: '#FAFAFA',
  offWhite: '#EAEAEA',
  lightGold: '#F9EEDF',
  oxfordBlue: '#13294B',
  lightBrown: '#B29A77',
  lightBrownShade: '#ded0ba',
  // Shades of Gray
  darkestGray: '#212529',
  darkGray: '#404040',
  mediumDarkGray: '#454545',
  gray: '#666666',
  lightGray: '#888E91',
  midGray: '#9E9E9E',
  paleGray: '#A7A8AE',
  lighterGray: '#CACACA',
  lightestGray: '#E8E8E8',
  softGray: '#ECEBEB',
  warmGray: '#EAEAEA',
  lightSteelBlue: '#CED1DB',
  philippineGray: '#8c8c8c',

  // Shades of Red and Pink
  lightRed: '#FCE4E5',
  red: '#EF3F49',
  darkRed: '#EA0606',
  mediumRed: '#FF3D00',
  paleRed: '#F4BBBB',
  softRed: '#FFD8D8',
  darkPink: '#CB0C9F',
  lightPink: '#E293D3',
  softPink: '#EA4C89',

  // Shades of Yellow and Orange
  peach: '#FDF2EC',
  orange: '#EB8600',
  darkOrange: '#AB7B00',
  goldenYellow: '#CC9C4A',
  softYellow: '#E8AE4C',
  lightYellow: '#F4DEBB',
  paleYellow: '#FFF065',
  whiteYellow: '#fffbf7',

  // Shades of Green
  mintGreen: '#ECFDF3',
  forestGreen: '#55AF5E',
  darkGreen: '#007639',
  deepGreen: '#07C060',
  mediumGreen: '#00AF62',
  lightGreen: '#82d616',
  lime: '#BFF205',
  vividGreen: '#0F9A00',
  paleGreen: '#D2E0CB',
  // Shades of Blue
  darkBlue: '#2094E9',
  mediumBlue: '#3B5998',
  midnightBlue: '#13294B',
  lightGrayBlue: '#8893A4',
  navyBlue: '#2B4978',
  darkBlueGray: '#344054',
  royalBlue: '#2745F2',
  // Miscellaneous
  darkPurple: '#303AB6',
};

export const lightTheme: ColorTheme = {
  primary: colorPalette.oxfordBlue,
  primaryDisable: colorPalette.lightBrownShade,
  primaryVariant: colorPalette.whiteYellow,
  onPrimary: colorPalette.white,

  background: colorPalette.warmGray,
  onBackground: colorPalette.black,
  text: colorPalette.black,
  darkText: colorPalette.darkestGray,
  secondaryText: colorPalette.darkBlueGray,

  border: colorPalette.lightGray,
  borderAlt: colorPalette.lighterGray,

  btnBgDisabled: colorPalette.paleGray,
  btnTextDisabled: colorPalette.mediumDarkGray,

  inputBG: colorPalette.white,
  inputBorder: colorPalette.lightGray,
  inputBorderAlt: colorPalette.lightestGray,
  inputLabel: colorPalette.black,
  inputText: colorPalette.black,

  surface: colorPalette.lightWhite,
  onSurface: colorPalette.matteBlack,

  secondary: colorPalette.royalBlue,
  secondaryDisable: colorPalette.lightGrayBlue,
  onSecondary: colorPalette.offWhite,
  secondaryVariant: colorPalette.navyBlue,
  secondaryLabel: colorPalette.philippineGray,

  successBackground: colorPalette.mintGreen,
  success: colorPalette.vividGreen,
  onSuccess: colorPalette.lime,

  errorBackground: colorPalette.lightRed,
  error: colorPalette.red,
  onError: colorPalette.white,

  warningBackground: colorPalette.peach,
  warning: colorPalette.orange,
  onWarning: colorPalette.mediumBlack,

  overlay: colorPalette.mediumBlack,
  placeholder: colorPalette.mediumDarkGray,
  shadow: colorPalette.black,
  transparent: 'transparent',

  backgroundColor: colorPalette.white,
  appBackgroundColor: colorPalette.offWhite,
  cardBackgroundColor: colorPalette.white,
  title: colorPalette.mediumBlack,
  header: colorPalette.black,
  subHeader: colorPalette.darkGray,
  paragraph: colorPalette.gray,
  iconColor: colorPalette.midGray,
  stepperDeselected: colorPalette.lightSteelBlue,

  white: colorPalette.white,
  black: colorPalette.black,
  primaryIconBG: colorPalette.lightGold,

  info: colorPalette.darkBlue,
};

export const darkTheme: ColorTheme = {
  primary: colorPalette.oxfordBlue,
  primaryDisable: colorPalette.lightBrownShade,
  onPrimary: colorPalette.white,
  primaryVariant: colorPalette.whiteYellow, // dark variant to be added

  text: colorPalette.white,
  darkText: colorPalette.darkestGray,
  secondaryText: colorPalette.darkBlueGray,
  background: colorPalette.mediumBlack,
  onBackground: colorPalette.white,

  border: colorPalette.lightGray,
  borderAlt: colorPalette.lighterGray,

  btnBgDisabled: colorPalette.paleGray,
  btnTextDisabled: colorPalette.mediumDarkGray,

  inputBG: colorPalette.white,
  inputBorder: colorPalette.lightGray,
  inputBorderAlt: colorPalette.lightestGray,
  inputLabel: colorPalette.black,
  inputText: colorPalette.black,

  secondary: colorPalette.royalBlue,
  secondaryDisable: colorPalette.lightGrayBlue,
  onSecondary: colorPalette.mediumDarkGray,
  secondaryVariant: colorPalette.navyBlue,
  secondaryLabel: colorPalette.philippineGray,

  surface: colorPalette.matteBlack,
  onSurface: colorPalette.lightWhite,

  successBackground: colorPalette.mintGreen,
  success: colorPalette.vividGreen,
  onSuccess: colorPalette.lime,

  errorBackground: colorPalette.lightRed,
  error: colorPalette.red,
  onError: colorPalette.white,

  warningBackground: colorPalette.peach,
  warning: colorPalette.orange,
  onWarning: colorPalette.mediumBlack,

  overlay: colorPalette.mediumBlack,
  placeholder: colorPalette.mediumDarkGray,
  shadow: colorPalette.midGray,
  transparent: 'transparent',

  backgroundColor: colorPalette.charcoal,
  appBackgroundColor: colorPalette.mediumBlack,
  cardBackgroundColor: colorPalette.black,
  title: colorPalette.softGray,
  header: colorPalette.softGray,
  subHeader: colorPalette.warmGray,
  paragraph: colorPalette.softGray,
  iconColor: colorPalette.gray,
  stepperDeselected: colorPalette.lightSteelBlue,

  white: colorPalette.white,
  black: colorPalette.black,
  primaryIconBG: colorPalette.lightGold,

  info: colorPalette.darkBlue,
};

export type ColorThemeTypes = keyof typeof lightTheme;
