import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import Svg, { Circle, Path, Defs, Pattern, Rect } from 'react-native-svg';
import { radius } from '@themes/border';
import { spacing } from '@themes/spacing';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type VibeSyncLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
  animated?: boolean;
};

export default function VibeSyncLogo({
  size = 'md',
  variant = 'default',
  showText = true,
  animated = true,
}: VibeSyncLogoProps) {
  const sizes = {
    sm: { container: 32, text: 18 },
    md: { container: 48, text: 20 },
    lg: { container: 64, text: 24 },
    xl: { container: 80, text: 30 },
  };

  const colors = {
    default: {
      gradient: ['#2563eb', '#7c3aed', '#ec4899'],
      text: '#1f2937',
      accent: '#ffffff',
      secondary: '#8b5cf6',
    },
    white: {
      gradient: ['#ffffff', '#f3f4f6', '#e5e7eb'],
      text: '#ffffff',
      accent: '#2563eb',
      secondary: '#7c3aed',
    },
    dark: {
      gradient: ['#374151', '#111827', '#000000'],
      text: '#1f2937',
      accent: '#ffffff',
      secondary: '#8b5cf6',
    },
  };

  const { container: containerSize, text: textSize } = sizes[size];
  const { gradient, text: textColor, accent } = colors[variant];

  // Animation values
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const particle1Y = useSharedValue(0);
  const particle1Opacity = useSharedValue(0.5);
  const particle2Y = useSharedValue(0);
  const particle2Opacity = useSharedValue(0.3);

  React.useEffect(() => {
    if (animated) {
      // Main container animations
      rotate.value = withRepeat(
        withSequence(
          withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );

      scale.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );

      // Particle animations
      particle1Y.value = withRepeat(
        withTiming(-4, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
      particle1Opacity.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );

      particle2Y.value = withDelay(
        500,
        withRepeat(
          withTiming(-3, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          -1,
          true,
        ),
      );
      particle2Opacity.value = withDelay(
        500,
        withRepeat(
          withTiming(0.8, {
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
    }
  }, [
    animated,
    rotate,
    scale,
    particle1Y,
    particle1Opacity,
    particle2Y,
    particle2Opacity,
  ]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }, { scale: scale.value }],
  }));

  const particle1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particle1Y.value }],
    opacity: particle1Opacity.value,
  }));

  const particle2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: particle2Y.value }],
    opacity: particle2Opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconWrapper, containerStyle]}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={[
            styles.gradientContainer,
            {
              width: containerSize,
              height: containerSize,
              borderRadius: radius.lg,
            },
          ]}>
          {/* Animated background pattern */}
          <View style={styles.patternContainer}>
            <Svg
              width={containerSize}
              height={containerSize}
              viewBox="0 0 60 60">
              <Defs>
                <Pattern
                  id="vibes"
                  x="0"
                  y="0"
                  width="12"
                  height="12"
                  patternUnits="userSpaceOnUse">
                  <Circle cx="2" cy="2" r="1" fill={accent} opacity="0.3" />
                  <Circle cx="10" cy="6" r="0.5" fill={accent} opacity="0.4" />
                  <Circle cx="6" cy="10" r="0.8" fill={accent} opacity="0.3" />
                </Pattern>
              </Defs>
              <AnimatedRect width="60" height="60" fill="url(#vibes)" />
            </Svg>
          </View>

          <Svg
            width={containerSize * 0.67}
            height={containerSize * 0.67}
            viewBox="0 0 32 32"
            style={styles.mainIcon}>
            <Circle cx="16" cy="16" r="3" fill={accent} />
            <Circle cx="8" cy="8" r="2" fill={accent} opacity="0.9" />
            <Circle cx="24" cy="8" r="2" fill={accent} opacity="0.9" />
            <Circle cx="8" cy="24" r="2" fill={accent} opacity="0.9" />
            <Circle cx="24" cy="24" r="2" fill={accent} opacity="0.9" />
            <Path
              d="M8 8 L16 16 M24 8 L16 16 M8 24 L16 16 M24 24 L16 16"
              stroke={accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <Circle
              cx="16"
              cy="16"
              r="8"
              fill="none"
              stroke={accent}
              strokeWidth="1"
              opacity="0.3"
            />
            <Path
              d="M4 16 Q8 12 12 16 Q16 20 20 16 Q24 12 28 16"
              stroke={accent}
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
          </Svg>
          {animated && (
            <>
              <Animated.View style={[styles.particle, particle1Style]} />
              <Animated.View style={[styles.particle, particle2Style]} />
            </>
          )}
        </LinearGradient>
      </Animated.View>

      {/* Logo Text */}
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontSize: textSize, color: textColor }]}>
            <Text style={styles.gradientText}>Vibe</Text>
            <Text style={[styles.syncText]}>Sync</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  patternContainer: {
    position: 'absolute',
    opacity: 0.2,
  },
  mainIcon: {
    position: 'relative',
    zIndex: 10,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    top: 8,
    right: 8,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  gradientText: {
    backgroundColor: 'transparent',
    color: '#2563eb',
  },
  syncText: {
    fontWeight: '700',
    color: '#6b7280',
  },
});
