/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { AppButton, SegmentButton } from '@components/AppButton';
import AppInput from '@components/AppInput/AppInput';
import PasswordInput from '@components/AppInput/PasswordInput';
import VibeSyncLogo from '@components/AppLogo/VibeSyncLogo';
import AppText from '@components/AppText/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  AuthNavigationProps,
  AuthRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppDispatch, useAppTheme } from '@redux/hooks';
import { toggleAuth } from '@slice/userSlice';
import { spacing } from '@themes/spacing';
import { device } from '@utils/device';

// Login Component
const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const storeDispatch = useAppDispatch();

  const styles = style();

  const handleLogin = async () => {
    setIsLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 1000));
    storeDispatch(toggleAuth());
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

  const styles = style();

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

  const styles = style();

  return (
    <ScreenWrapper scrollEnabled hideStatusbar>
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

      {/* Auth Card */}
      <View style={[styles.card, isTablet && styles.cardTablet]}>
        {/* Segment Buttons */}
        <SegmentButton
          items={[
            { key: 'login', value: 'Login' },
            { key: 'signup', value: 'SignUp' },
          ]}
          onPress={key => setActiveTab(key as IActiveTab)}
        />

        {/* Form Content */}
        <View
          style={[styles.formContent, isTablet && styles.formContentTablet]}>
          {activeTab === 'login' ? <LoginComponent /> : <SignupComponent />}
        </View>
      </View>

      {/* Terms */}
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

const style = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
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
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: spacing.small,
    },
    titleTablet: {
      fontSize: 32,
    },
    subtitle: {
      fontSize: 16,
      color: '#8893A4',
    },
    subtitleTablet: {
      fontSize: 18,
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: 16,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
      marginBottom: spacing.large,
    },
    cardTablet: {
      maxWidth: 500,
      alignSelf: 'center',
      width: '100%',
    },
    segmentContainer: {
      padding: spacing.medium,
      backgroundColor: '#8893A4',
      margin: spacing.medium,
      borderRadius: 12,
    },
    segmentContainerTablet: {
      padding: spacing.large,
      margin: spacing.large,
    },
    segmentBackground: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderRadius: 8,
      padding: 4,
    },
    segmentButton: {
      flex: 1,
      height: 40,
      borderRadius: 6,
      backgroundColor: 'transparent',
    },
    segmentButtonTablet: {
      height: 48,
    },
    activeSegmentButton: {
      backgroundColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    segmentButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#8893A4',
    },
    segmentButtonTextTablet: {
      fontSize: 16,
    },
    activeSegmentButtonText: {
      color: '#8893A4',
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
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: '#8893A4',
      height: 48,
    },
    googleButtonTablet: {
      height: 56,
    },
    googleIcon: {
      width: 20,
      height: 20,
      borderRadius: 2,
      backgroundColor: '#8893A4',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.small,
    },
    googleIconText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    googleButtonText: {
      color: '#8893A4',
      fontSize: 16,
      fontWeight: '500',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.medium,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#8893A4',
    },
    dividerText: {
      fontSize: 12,
      color: '#8893A4',
      marginHorizontal: spacing.medium,
      textTransform: 'uppercase',
    },
    inputContainer: {
      gap: spacing.medium,
    },
    input: {
      height: 48,
      backgroundColor: '#8893A4',
      borderColor: '#8893A4',
    },
    inputTablet: {
      height: 56,
      fontSize: 16,
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
      color: '#8893A4',
      fontSize: 14,
    },
    submitButton: {
      height: 48,
      backgroundColor: '#8893A4',
    },
    submitButtonTablet: {
      height: 56,
    },
    submitButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
    errorText: {
      color: '#8893A4',
      fontSize: 14,
      textAlign: 'center',
    },
    termsContainer: {
      alignItems: 'center',
      paddingHorizontal: spacing.large,
    },
    termsText: {
      fontSize: 12,
      color: '#8893A4',
      textAlign: 'center',
      lineHeight: 18,
    },
    termsTextTablet: {
      fontSize: 14,
    },
    linkText: {
      color: '#8893A4',
      textDecorationLine: 'underline',
    },
  });
};
