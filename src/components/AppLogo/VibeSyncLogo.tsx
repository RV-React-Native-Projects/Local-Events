import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { radius } from '@themes/border';
import { spacing } from '@themes/spacing';

const AnimatedG = Animated.createAnimatedComponent(G);

type VibeSyncLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
};

export default function VibeSyncLogo({
  size = 'md',
  showText = true,
  animated = true,
}: VibeSyncLogoProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  const iconSize = sizes[size];
  const accent = '#ffffff';
  const secondary = '#7c3aed'; // violet
  const gradientColors = ['#2563eb', '#7c3aed', '#4f46e5']; // blue → violet → indigo

  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      );

      rotate.value = withRepeat(
        withTiming(360, {
          duration: 6000,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={[
          styles.iconWrapper,
          {
            width: iconSize,
            height: iconSize,
            borderRadius: radius.lg,
          },
        ]}>
        <Animated.View style={animatedStyle}>
          <Svg
            width={iconSize * 0.7}
            height={iconSize * 0.7}
            viewBox="0 0 32 32">
            <AnimatedG>
              <Circle cx="16" cy="16" r="3" fill={accent} />
              <Circle cx="8" cy="8" r="2" fill={accent} opacity={0.9} />
              <Circle cx="24" cy="8" r="2" fill={accent} opacity={0.9} />
              <Circle cx="8" cy="24" r="2" fill={accent} opacity={0.9} />
              <Circle cx="24" cy="24" r="2" fill={accent} opacity={0.9} />
              <Path
                d="M8 8 L16 16 M24 8 L16 16 M8 24 L16 16 M24 24 L16 16"
                stroke={accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </AnimatedG>
          </Svg>
        </Animated.View>
      </LinearGradient>

      {showText && (
        <Text style={[styles.text]}>
          Vibe<Text style={{ color: secondary }}>Sync</Text>
        </Text>
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
  text: {
    fontSize: 20,
    fontWeight: '700',
  },
});
