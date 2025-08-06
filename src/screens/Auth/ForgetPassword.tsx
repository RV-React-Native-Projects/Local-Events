import { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AppButton } from '@components/AppButton';
import AppInput from '@components/AppInput/AppInput';
import VibeSyncLogo from '@components/AppLogo/VibeSyncLogo';
import { AppText } from '@components/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  ForgetPasswordNavigationProps,
  ForgetPasswordRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

export default function ForgetPassword({}: ScreenPropsType<
  ForgetPasswordNavigationProps,
  ForgetPasswordRouteProp
>) {
  const styles = useStyles();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsEmailSent(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to login
    // This would typically use navigation.goBack() or navigation.navigate('Auth')
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setEmail('');
  };

  if (isEmailSent) {
    return (
      <ScreenWrapper
        contentContainerStyle={styles.container}
        keyboardOffset={Platform.OS === 'ios' ? 0 : 20}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          {/* Header */}
          <View style={styles.header}>
            <AppButton
              variant="ghost"
              title="← Back to Login"
              onPress={handleBackToLogin}
              style={styles.backButton}
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Success Icon */}
            <View style={styles.successIconContainer}>
              <View style={styles.successIcon}>
                <AppText style={styles.checkmark}>✓</AppText>
              </View>
            </View>

            {/* Success Message */}
            <View style={styles.messageContainer}>
              <AppText variant="title" color="title" style={styles.title}>
                Check Your Email
              </AppText>
              <AppText
                variant="body"
                color="paragraph"
                style={styles.description}>
                We&apos;ve sent a password reset link to:
              </AppText>
              <AppText variant="body" color="primary" style={styles.emailText}>
                {email}
              </AppText>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <AppText
                variant="body"
                color="paragraph"
                style={styles.instructions}>
                Click the link in the email to reset your password. The link
                will expire in 1 hour.
              </AppText>

              <View style={styles.helpText}>
                <AppText variant="footnote" color="paragraph">
                  Didn&apos;t receive the email? Check your spam folder or
                </AppText>
                <AppButton
                  variant="ghost"
                  title="try a different email address"
                  onPress={handleResendEmail}
                  style={styles.resendButton}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <AppButton
                title="Resend Email"
                variant="outline"
                onPress={handleResendEmail}
                style={styles.resendEmailButton}
              />
              <AppButton
                title="Back to Login"
                onPress={handleBackToLogin}
                style={styles.loginButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      keyboardOffset={Platform.OS === 'ios' ? 0 : 20}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        {/* Header */}
        <View style={styles.header}>
          <AppButton
            variant="ghost"
            title="← Back to Login"
            onPress={handleBackToLogin}
            style={styles.backButton}
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <VibeSyncLogo />
          </View>

          {/* Title and Description */}
          <View style={styles.textContainer}>
            <AppText variant="title" color="title" style={styles.title}>
              Forgot Password?
            </AppText>
            <AppText
              variant="body"
              color="paragraph"
              style={styles.description}>
              No worries! Enter your email address and we&apos;ll send you a
              link to reset your password.
            </AppText>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <AppInput
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={!!emailError}
              errorMessage={emailError}
              required
            />

            <AppButton
              title={isLoading ? 'Sending...' : 'Send Reset Link'}
              onPress={handleSubmit}
              disabled={!email.trim() || isLoading}
              isLoading={isLoading}
              style={styles.submitButton}
            />
          </View>

          {/* Help Text */}
          <View style={styles.helpContainer}>
            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.helpText}>
              Remember your password?
            </AppText>
            <AppButton
              variant="ghost"
              title="Sign in"
              onPress={handleBackToLogin}
              style={styles.signInButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      paddingHorizontal: spacing.mediumLarge,
      paddingTop: spacing.small,
      paddingBottom: spacing.mediumLarge,
    },
    backButton: {
      alignSelf: 'flex-start',
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.large,
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: spacing.extraLarge * 2,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: spacing.extraLarge * 2,
    },
    title: {
      textAlign: 'center',
      marginBottom: spacing.mediumLarge,
    },
    description: {
      textAlign: 'center',
      lineHeight: moderateScale(24),
    },
    formContainer: {
      marginBottom: spacing.extraLarge * 2,
    },
    submitButton: {
      marginTop: spacing.large,
    },
    helpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    helpText: {
      marginRight: spacing.xs,
    },
    signInButton: {
      paddingHorizontal: 0,
    },
    // Success state styles
    successIconContainer: {
      alignItems: 'center',
      marginBottom: spacing.extraLarge,
    },
    successIcon: {
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(40),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmark: {
      color: colors.onPrimary,
      fontSize: fontSize[48],
      fontWeight: 'bold',
    },
    messageContainer: {
      alignItems: 'center',
      marginBottom: spacing.extraLarge,
    },
    emailText: {
      fontWeight: 'bold',
      marginTop: spacing.small,
    },
    instructionsContainer: {
      marginBottom: spacing.extraLarge,
    },
    instructions: {
      textAlign: 'center',
      lineHeight: moderateScale(24),
      marginBottom: spacing.large,
    },
    buttonContainer: {
      gap: spacing.mediumLarge,
    },
    resendEmailButton: {
      marginBottom: spacing.small,
    },
    loginButton: {
      marginTop: spacing.small,
    },
    resendButton: {
      paddingHorizontal: 0,
      alignSelf: 'flex-start',
    },
  });
};
