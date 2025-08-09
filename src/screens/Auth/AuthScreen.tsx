import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppButton, SegmentButton } from '@components/AppButton';
import AppInput from '@components/AppInput/AppInput';
import PasswordInput from '@components/AppInput/PasswordInput';
import VibeSyncLogo from '@components/AppLogo/VibeSyncLogo';
import AppText from '@components/AppText/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  AuthNavigationProps,
  AuthRouteProp,
  AuthStackParamList,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { radius, border } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { opacity } from '@themes/opacity';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';
import { device } from '@utils/device';

// Login Component
const LoginComponent = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const styles = useStyles();

  const handleLogin = async () => {
    setIsLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // storeDispatch(toggleAuth());
    navigation.navigate('Interests');
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <AppButton
        onPress={handleGoogleLogin}
        disabled={isLoading}
        variant="outline"
        title="Sign up with Google"
        iconPosition="leading"
        renderIcon={() => <MaterialDesignIcons size={20} name="google" />}
      />
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <AppText style={styles.dividerText}>Or continue with email</AppText>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.inputContainer}>
        <AppInput
          label="Email"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.forgotPasswordContainer}>
          <AppButton
            variant="ghost"
            style={styles.forgotPasswordButton}
            title="Forgot password?"
          />
        </View>
        <AppButton
          onPress={handleLogin}
          disabled={!email || !password || isLoading}
          title={isLoading ? 'Signing In...' : 'Sign In'}
        />
      </View>
    </View>
  );
};

// Signup Component
const SignupComponent = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const styles = useStyles();

  const handleSignup = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    // Simulate Google signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const passwordsMatch = password === confirmPassword;
  const isFormValid =
    fullName && email && password && confirmPassword && passwordsMatch;

  return (
    <View style={styles.formContainer}>
      <AppButton
        onPress={handleGoogleSignup}
        disabled={isLoading}
        variant="outline"
        title="Sign up with Google"
        iconPosition="leading"
        renderIcon={() => <MaterialDesignIcons size={20} name="google" />}
      />

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <AppText style={styles.dividerText}>Or create an account</AppText>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.inputContainer}>
        <AppInput
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
          label="Full Name"
        />

        <AppInput
          label="Email"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {password && confirmPassword && !passwordsMatch && (
          <AppText style={styles.errorText}>Passwords don&apos;t match</AppText>
        )}

        <AppButton
          onPress={handleSignup}
          disabled={!isFormValid || isLoading}
          title={isLoading ? 'Creating Account...' : 'Create Account'}
        />
      </View>
    </View>
  );
};

type IActiveTab = 'login' | 'signup';

export default function AuthScreen({}: ScreenPropsType<
  AuthNavigationProps,
  AuthRouteProp
>) {
  const [activeTab, setActiveTab] = useState<IActiveTab>('login');
  const isTablet = device.isTablet;

  const styles = useStyles();

  return (
    <ScreenWrapper
      scrollEnabled
      hideStatusbar
      scrollViewContainerStyle={styles.screenWrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <VibeSyncLogo size={isTablet ? 'xl' : 'lg'} animated={true} />
        </View>
        <AppText style={[styles.title, isTablet && styles.titleTablet]}>
          Welcome Back
        </AppText>
        <AppText style={[styles.subtitle, isTablet && styles.subtitleTablet]}>
          Join your local community
        </AppText>
      </View>
      <View style={[styles.card, isTablet && styles.cardTablet]}>
        <SegmentButton
          items={[
            { key: 'login', value: 'Login' },
            { key: 'signup', value: 'SignUp' },
          ]}
          onPress={key => setActiveTab(key as IActiveTab)}
        />
        <View
          style={[styles.formContent, isTablet && styles.formContentTablet]}>
          {activeTab === 'login' ? <LoginComponent /> : <SignupComponent />}
        </View>
      </View>
      <View style={styles.termsContainer}>
        <AppText style={[styles.termsText, isTablet && styles.termsTextTablet]}>
          By continuing, you agree to our{' '}
          <AppText style={styles.linkText}>Terms of Service</AppText> and{' '}
          <AppText style={styles.linkText}>Privacy Policy</AppText>
        </AppText>
      </View>
    </ScreenWrapper>
  );
}

const useStyles = () => {
  const { colors, shadow } = useAppTheme();
  return StyleSheet.create({
    screenWrapper: {
      backgroundColor: colors.backgroundColor,
      paddingBottom: moderateScale(100),
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.large,
      paddingVertical: spacing.extraLarge,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: spacing.extraLarge,
      marginTop: spacing.colossal,
    },
    logoContainer: {
      marginBottom: spacing.large,
    },
    title: {
      fontSize: fontSize[24],
      fontWeight: 'bold',
      marginBottom: spacing.small,
      color: colors.text,
    },
    titleTablet: {
      fontSize: fontSize[32],
    },
    subtitle: {
      fontSize: fontSize[16],
      color: colors.secondaryText,
    },
    subtitleTablet: {
      fontSize: fontSize[18],
    },
    card: {
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.xl,
      marginBottom: spacing.large,
      paddingTop: spacing.baseLarge,
      marginHorizontal: spacing.base,
      ...shadow.regular,
    },
    cardTablet: {
      maxWidth: 500,
      alignSelf: 'center',
      width: '100%',
    },
    segmentContainer: {
      padding: spacing.medium,
      backgroundColor: colors.secondaryText,
      margin: spacing.medium,
      borderRadius: radius.xl,
    },
    segmentContainerTablet: {
      padding: spacing.large,
      margin: spacing.large,
    },
    segmentBackground: {
      flexDirection: 'row',
      backgroundColor: colors.backgroundColor,
      borderRadius: radius.lg,
      padding: spacing.xs,
    },
    segmentButton: {
      flex: 1,
      height: moderateScale(40),
      borderRadius: radius.md,
      backgroundColor: 'transparent',
    },
    segmentButtonTablet: {
      height: moderateScale(48),
    },
    activeSegmentButton: {
      backgroundColor: colors.backgroundColor,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: moderateScale(2) },
      shadowOpacity: opacity.veryLight,
      shadowRadius: moderateScale(4),
      elevation: 2,
    },
    segmentButtonText: {
      fontSize: fontSize[14],
      fontWeight: '500',
      color: colors.secondaryText,
    },
    segmentButtonTextTablet: {
      fontSize: fontSize[16],
    },
    activeSegmentButtonText: {
      color: colors.secondaryText,
      fontWeight: '600',
    },
    formContent: {
      padding: spacing.large,
    },
    formContentTablet: {
      padding: spacing.extraLarge,
    },
    formContainer: {
      gap: spacing.large,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundColor,
      borderWidth: border.thick,
      borderColor: colors.secondaryText,
      height: moderateScale(48),
    },
    googleButtonTablet: {
      height: moderateScale(56),
    },
    googleIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(2),
      backgroundColor: colors.secondaryText,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.small,
    },
    googleIconText: {
      color: colors.backgroundColor,
      fontSize: fontSize[12],
      fontWeight: 'bold',
    },
    googleButtonText: {
      color: colors.secondaryText,
      fontSize: fontSize[16],
      fontWeight: '500',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.medium,
    },
    dividerLine: {
      flex: 1,
      height: border.normal,
      backgroundColor: colors.secondaryText,
    },
    dividerText: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
      marginHorizontal: spacing.medium,
      textTransform: 'uppercase',
    },
    inputContainer: {
      gap: spacing.medium,
    },
    input: {
      height: moderateScale(48),
      backgroundColor: colors.backgroundColor,
      borderColor: colors.inputBorder,
    },
    inputTablet: {
      height: moderateScale(56),
      fontSize: fontSize[16],
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.small,
    },
    passwordToggle: {
      marginRight: spacing.small,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
    },
    forgotPasswordButton: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    forgotPasswordText: {
      color: colors.secondaryText,
      fontSize: fontSize[14],
    },
    submitButton: {
      height: moderateScale(48),
      backgroundColor: colors.primary,
    },
    submitButtonTablet: {
      height: moderateScale(56),
    },
    submitButtonText: {
      color: colors.onPrimary,
      fontSize: fontSize[16],
      fontWeight: '600',
    },
    errorText: {
      color: colors.error,
      fontSize: fontSize[14],
      textAlign: 'center',
    },
    termsContainer: {
      alignItems: 'center',
      paddingHorizontal: spacing.large,
    },
    termsText: {
      fontSize: fontSize[12],
      color: colors.secondaryText,
      textAlign: 'center',
      lineHeight: moderateScale(18),
    },
    termsTextTablet: {
      fontSize: fontSize[14],
    },
    linkText: {
      color: colors.primary,
      textDecorationLine: 'underline',
    },
  });
};
