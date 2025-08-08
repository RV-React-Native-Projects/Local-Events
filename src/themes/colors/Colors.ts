import { ColorTheme, IGradientColors } from './ColorThemeTypes';

export const colorPalette = {
  // === BASE COLORS ===
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

  // === GRAYS ===
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
  borderGray: '#E5E7EB',
  backgroundGray: '#F2F2F2',
  cardGray: '#F3F4F6',

  // === PRIMARY BRAND COLORS (Eazeebox) ===
  primaryColor: '#ed344c', // Red
  secondaryColor: '#224895', // Blue
  primaryDark: '#16377a', // Dark Blue
  primaryLight: '#1a77bd', // Light Blue

  // === SECONDARY BRAND SHADES ===
  brandLight: '#ffd738', // Bright Yellow (used sparingly)
  brandMedium: '#f68d39', // Orange
  brandDark: '#a62f60', // Dark Pink/Red
  brandDeepPurple: '#442f91', // Deep Purple
  secondaryLight1: '#dde3f3', // Pale Blue
  secondaryLight2: '#fcdede', // Pale Pink

  // === SUCCESS COLORS ===
  successLight: '#ECFDF3',
  success: '#10B981',
  successMedium: '#00AF62',
  successDark: '#007639',
  successDeep: '#07C060',
  limeSuccess: '#BFF205',
  vividSuccess: '#0F9A00',
  paleSuccess: '#D2E0CB',

  // === ERROR COLORS ===
  errorLight: '#FCE4E5',
  error: '#EF3F49',
  errorMedium: '#FF3D00',
  errorDark: '#EA0606',
  errorSoft: '#FFD8D8',
  errorPale: '#F4BBBB',

  // === WARNING COLORS ===
  warning: '#EB8600',
  warningDark: '#AB7B00',
  warningSoft: '#E8AE4C',
  warningLight: '#F4DEBB',
  warningPale: '#FFF065',
  warningWhite: '#fffbf7',

  // === INFO COLORS ===
  info: '#3B5998',
  infoDark: '#13294B',
  infoLight: '#8893A4',
  infoSoft: '#DBEAFE',

  // === BLUE SHADES ===
  primaryBlue: '#3B82F6',
  royalBlue: '#2745F2',
  navyBlue: '#2B4978',
  darkBlueAccent: '#1D4ED8',
  darkBlue: '#2094E9',
  darkBlueGray: '#344054',

  // === PINK & PURPLE SHADES ===
  darkPink: '#CB0C9F',
  lightPink: '#E293D3',
  softPink: '#EA4C89',
  darkPurple: '#303AB6',
};

export const gradient: IGradientColors = {
  primaryGradient: ['#3B82F6', '#8B5CF6'],
  secondaryGradient: ['#F97316', '#DB2777'],
  territoryGradient: ['#A855F7', '#4F46E5'],
};

export const lightTheme: ColorTheme = {
  primary: colorPalette.primaryColor, // #ed344c (brand red)
  primaryDisable: colorPalette.brandLight, // #ffd738 (yellow)
  primaryVariant: colorPalette.primaryLight, // #1a77bd (light blue)
  onPrimary: colorPalette.white, // White text on red

  background: colorPalette.white, // #ffffff
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

  secondary: colorPalette.secondaryColor, // #224895 (brand blue)
  secondaryDisable: colorPalette.secondaryLight1, // #dde3f3
  onSecondary: colorPalette.white, // white on blue
  secondaryVariant: colorPalette.primaryDark, // #16377a
  secondaryLabel: colorPalette.secondaryLight2, // #fcdede (pale pink)

  successBackground: colorPalette.successLight, // #ECFDF3
  success: colorPalette.success, // #10B981
  onSuccess: colorPalette.white,

  errorBackground: colorPalette.errorSoft, // #FFD8D8
  error: colorPalette.error, // #EF3F49
  onError: colorPalette.white,

  warningBackground: colorPalette.warningLight, // #F4DEBB
  warning: colorPalette.warning, // #EB8600
  onWarning: colorPalette.mediumBlack,

  overlay: colorPalette.mediumBlack,
  placeholder: colorPalette.mediumDarkGray,
  shadow: colorPalette.black,

  transparent: 'transparent',

  backgroundColor: colorPalette.white,
  appBackgroundColor: colorPalette.backgroundGray,
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

  info: colorPalette.primaryLight, // #1a77bd (light blue for info)
};

export const darkTheme: ColorTheme = {
  primary: colorPalette.primaryColor, // #ed344c (brand red)
  primaryDisable: colorPalette.brandDark, // #a62f60 (duller red)
  primaryVariant: colorPalette.primaryDark, // #16377a
  onPrimary: colorPalette.white, // white text on red

  text: colorPalette.white,
  darkText: colorPalette.midGray,
  secondaryText: colorPalette.gray,
  background: colorPalette.mediumBlack,
  onBackground: colorPalette.white,

  border: colorPalette.lightGray,
  borderAlt: colorPalette.lighterGray,

  btnBgDisabled: colorPalette.paleGray,
  btnTextDisabled: colorPalette.mediumDarkGray,

  inputBG: colorPalette.darkGray,
  inputBorder: colorPalette.gray,
  inputBorderAlt: colorPalette.lightGray,
  inputLabel: colorPalette.lightestGray,
  inputText: colorPalette.white,

  secondary: colorPalette.secondaryColor, // #224895
  secondaryDisable: colorPalette.secondaryLight2, // #fcdede
  onSecondary: colorPalette.white,
  secondaryVariant: colorPalette.primaryDark,
  secondaryLabel: colorPalette.secondaryLight1, // #dde3f3

  surface: colorPalette.matteBlack,
  onSurface: colorPalette.lightWhite,

  successBackground: colorPalette.successMedium,
  success: colorPalette.success,
  onSuccess: colorPalette.white,

  errorBackground: colorPalette.errorPale,
  error: colorPalette.error,
  onError: colorPalette.white,

  warningBackground: colorPalette.warning,
  warning: colorPalette.warningDark,
  onWarning: colorPalette.white,

  overlay: colorPalette.black,
  placeholder: colorPalette.midGray,
  shadow: colorPalette.gray,

  transparent: 'transparent',

  backgroundColor: colorPalette.charcoal,
  appBackgroundColor: colorPalette.mediumBlack,
  cardBackgroundColor: colorPalette.black,
  title: colorPalette.white,
  header: colorPalette.white,
  subHeader: colorPalette.softGray,
  paragraph: colorPalette.lightGray,
  iconColor: colorPalette.gray,
  stepperDeselected: colorPalette.lightSteelBlue,

  white: colorPalette.white,
  black: colorPalette.black,
  primaryIconBG: colorPalette.lightGold,

  info: colorPalette.primaryLight,
};

export type ColorThemeTypes = keyof typeof lightTheme;
