export interface ColorTheme {
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;

  overlay: string;
  text: string;
  darkText: string;
  secondaryText: string;
  primary: string;
  primaryVariant: string;
  onPrimary: string;
  primaryDisable: string;

  secondary: string;
  onSecondary: string;
  secondaryVariant: string;
  secondaryDisable: string;
  secondaryLabel: string;

  inputBG: string;
  inputText: string;
  inputBorder: string;
  inputBorderAlt: string;
  inputLabel: string;
  placeholder: string;

  border: string;
  borderAlt: string;

  btnTextDisabled: string;
  btnBgDisabled: string;

  transparent: string;

  shadow: string;
  errorBackground: string;
  error: string;
  onError: string;
  successBackground: string;
  success: string;
  onSuccess: string;
  warningBackground: string;
  warning: string;
  onWarning: string;

  backgroundColor: string;
  appBackgroundColor: string;
  cardBackgroundColor: string;
  title: string;
  header: string;
  subHeader: string;
  paragraph: string;
  iconColor: string;
  stepperDeselected: string;

  white: string;
  black: string;
  primaryIconBG: string;
  info: string;
}

export interface IGradientColors {
  primaryGradient: string[];
  secondaryGradient: string[];
  territoryGradient: string[];
}
