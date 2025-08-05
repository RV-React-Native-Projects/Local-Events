import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSpring,
  Layout,
} from 'react-native-reanimated';
import VibeSyncLogo from './VibeSyncLogo';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth > 768;

type OnboardingData = {
  color: string;
  // Add other properties as needed
};

type LogoPulseProps = {
  onboardingData: OnboardingData[];
  currentIndex: number;
  onComplete: () => void;
};

export default function LogoPulse({
  onboardingData,
  currentIndex,
  onComplete,
}: LogoPulseProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  React.useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });
    translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
  }, [opacity, translateY]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <VibeSyncLogo size={isTablet ? 'lg' : 'md'} animated={true} />

        <View style={styles.rightSection}>
          {/* Progress Pills */}
          <View style={styles.progressContainer}>
            {onboardingData.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.progressPill,
                  index === currentIndex && styles.activePill,
                  index === currentIndex && {
                    backgroundColor:
                      onboardingData[currentIndex]?.color || '#3B82F6',
                  },
                ]}
                layout={Layout.springify()}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={onComplete}
            activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    paddingHorizontal: isTablet ? 32 : 24,
    paddingVertical: isTablet ? 32 : 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressPill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB', // gray-300
    width: 8,
  },
  activePill: {
    width: 32,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    color: '#6B7280', // gray-500
    fontSize: 14,
    fontWeight: '500',
  },
});
