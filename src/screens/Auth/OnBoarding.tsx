import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import VibeSyncLogo from '@components/AppLogo/VibeSyncLogo';
import { ConnectPeopleIllustration } from '@components/Illustration/ConnectPeopleIllustration';
import DiscoverEventsIllustration from '@components/Illustration/DiscoverEventsIllustration';
import HostEventsIllustration from '@components/Illustration/HostEventsIllustration';
import { ScreenWrapper } from '@components/Wrapper';
import {
  OnBoardingNavigationProps,
  OnBoardingRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { radius } from '@themes/border';
import { spacing } from '@themes/spacing';
import { device } from '@utils/device';

const isTablet = device.isTablet;

const onboardingData = [
  {
    id: 1,
    illustration: DiscoverEventsIllustration,
    icon: '✨',
    title: 'Discover Hidden Gems',
    subtitle:
      'Your neighborhood is full of amazing experiences waiting to be found',
    description:
      'From intimate poetry jams in cozy cafés to rooftop chess tournaments under the stars, VibeSync helps you uncover the extraordinary events happening right around the corner.',
    highlights: [
      'Personalized event recommendations just for you',
      'Real-time discovery of nearby happenings',
      'Hidden gems you never knew existed',
      'Events that match your schedule and mood',
    ],
    stats: { events: '500+', locations: '100+' },
    gradientColors: ['#3B82F6', '#8B5CF6'],
  },
  {
    id: 2,
    illustration: ConnectPeopleIllustration,
    icon: '👥',
    title: 'Find Your Community',
    subtitle:
      'Build meaningful connections through shared passions and experiences',
    description:
      'Meet like-minded souls who share your curiosities and dreams. VibeSync creates the perfect environment for authentic connections.',
    highlights: [
      'Connect with people who share your interests',
      'Join welcoming, inclusive communities',
      'Build lasting friendships through shared experiences',
      'Safe, verified community of real people',
    ],
    stats: { members: '10k+', connections: '25k+' },
    gradientColors: ['#F59E0B', '#EC4899'],
  },
  {
    id: 3,
    illustration: HostEventsIllustration,
    icon: '⚡',
    title: 'Create Magic',
    subtitle:
      'Turn your wildest ideas into unforgettable community experiences',
    description:
      "Got a spark of creativity or unique skill to share? VibeSync empowers you to bring people together and create the experiences you've always dreamed of.",
    highlights: [
      'Easy-to-use event creation tools',
      'Built-in promotion reaches the right audience',
      'Seamless RSVP and communication management',
      'Support from our community team',
    ],
    stats: { hosts: '2k+', events: '15k+' },
    gradientColors: ['#8B5CF6', '#3B82F6'],
  },
];

export default function OnBoarding({
  navigation,
}: ScreenPropsType<OnBoardingNavigationProps, OnBoardingRouteProp>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  // Animation values
  const containerOpacity = useSharedValue(0);
  const containerTranslateY = useSharedValue(20);

  const currentSlide = onboardingData[currentIndex];

  useEffect(() => {
    // Initial animation
    containerOpacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });
    containerTranslateY.value = withSpring(0, { damping: 15, stiffness: 100 });
  }, [currentIndex, containerOpacity, containerTranslateY]);

  const handlePageChange = (page: number) => {
    setCurrentIndex(page);
  };

  function goToLogin() {
    navigation.navigate('Auth');
  }

  const handleNext = () => {
    if (currentIndex === onboardingData.length - 1) {
      goToLogin();
    }
    pagerRef.current?.setPage(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    pagerRef.current?.setPage(currentIndex - 1);
  };

  const handleSkip = () => {
    goToLogin();
  };

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerTranslateY.value }],
  }));

  const _slideComponent = ({
    slide,
    index,
  }: {
    slide: (typeof onboardingData)[0];
    index: number;
  }) => {
    return (
      <View style={styles.slide} key={index}>
        <View style={isTablet ? styles.tabletLayout : styles.mobileLayout}>
          {/* Illustration Section */}
          <View style={styles.illustrationContainer}>
            <View
              style={
                isTablet
                  ? styles.illustrationContainerTab
                  : styles.illustrationContainerTab
              }>
              <slide.illustration />
            </View>
            <View
              style={[
                styles.statsBadge,
                { backgroundColor: slide.gradientColors[0] },
              ]}>
              <Text style={styles.statsText}>
                {Object.values(slide.stats).join(' • ')}
              </Text>
            </View>
          </View>

          {/* Content Section */}
          <View style={isTablet ? styles.tabletContent : styles.mobileContent}>
            <View style={styles.titleContainer}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: slide.gradientColors[0] },
                ]}>
                <Text style={styles.iconText}>{slide.icon}</Text>
              </View>
              {isTablet ? (
                <View style={styles.titleTextContainer}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.subtitle}>{slide.subtitle}</Text>
                </View>
              ) : (
                <Text style={styles.title}>{slide.title}</Text>
              )}
            </View>

            {!isTablet && <Text style={styles.subtitle}>{slide.subtitle}</Text>}
            <Text style={styles.description}>{slide.description}</Text>

            <View style={styles.highlightsContainer}>
              {slide.highlights.map((highlight, highlightIndex) => (
                <View key={highlightIndex} style={styles.highlightItem}>
                  <View
                    style={[
                      styles.checkCircle,
                      { backgroundColor: slide.gradientColors[0] },
                    ]}>
                    {isTablet && <Text style={styles.checkText}>✓</Text>}
                  </View>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper hideStatusbar>
      <Animated.View style={[styles.container, containerStyle]}>
        {/* Header */}
        <View style={[styles.header, isTablet && styles.headerTablet]}>
          <VibeSyncLogo size={isTablet ? 'lg' : 'md'} animated={true} />

          <View style={styles.headerRight}>
            {/* Progress Pills */}
            <View style={styles.progressContainer}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressPill,
                    index === currentIndex && styles.activePill,
                    index === currentIndex && {
                      backgroundColor: currentSlide.gradientColors[0],
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkip}
              activeOpacity={0.7}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content with PagerView */}
        <View style={styles.content}>
          <PagerView
            ref={pagerRef}
            style={styles.pagerView}
            initialPage={0}
            onPageSelected={e => handlePageChange(e.nativeEvent.position)}
            pageMargin={0}
            overdrag={true}
            overScrollMode="never"
            scrollEnabled={true}>
            {onboardingData.map((slide, index) =>
              _slideComponent({ slide, index }),
            )}
          </PagerView>
        </View>

        {/* Navigation */}
        <View style={[styles.navigation, isTablet && styles.navigationTablet]}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex === 0 && styles.navButtonDisabled,
            ]}
            onPress={handlePrev}
            disabled={currentIndex === 0}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.navButtonText,
                currentIndex === 0 && styles.navButtonTextDisabled,
              ]}>
              Back
            </Text>
          </TouchableOpacity>

          <LinearGradient
            colors={currentSlide.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButton}>
            <TouchableOpacity
              style={styles.nextButtonTouchable}
              onPress={handleNext}
              activeOpacity={0.9}>
              <Text style={styles.nextButtonText}>
                {currentIndex === onboardingData.length - 1
                  ? 'Get Started'
                  : 'Next'}
              </Text>
              {currentIndex === onboardingData.length - 1 && (
                <Text style={styles.sparkleText}>✨</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    zIndex: 10,
    position: 'absolute',
    top: spacing.extraLargePlus,
    left: 0,
    right: 0,
  },
  headerTablet: {
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.large,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.medium,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: spacing.small,
  },
  progressPill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
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
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
  },
  tabletLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.extraLarge * 2,
    maxWidth: 1200,
    width: '100%',
  },
  mobileLayout: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  illustrationContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainerTab: { maxHeight: 500 },
  illustrationContainerMobile: { maxHeight: 400 },
  statsBadge: {
    position: 'absolute',
    top: spacing.massive,
    right: spacing.extraLargePlus,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: radius.round,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  tabletContent: {
    flex: 1,
    maxWidth: 500,
  },
  mobileContent: {
    alignItems: 'center',
    marginTop: spacing.large,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.medium,
    marginBottom: spacing.large,
  },
  iconContainer: {
    width: isTablet ? 64 : 48,
    height: isTablet ? 64 : 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconText: {
    fontSize: isTablet ? 32 : 24,
    color: '#FFFFFF',
  },
  titleTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: isTablet ? 48 : 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: spacing.small,
  },
  subtitle: {
    fontSize: isTablet ? 20 : 16,
    color: '#6B7280',
    marginBottom: spacing.medium,
  },
  description: {
    fontSize: isTablet ? 18 : 14,
    color: '#6B7280',
    lineHeight: isTablet ? 28 : 20,
    marginBottom: spacing.large,
    textAlign: isTablet ? 'left' : 'center',
  },
  highlightsContainer: {
    gap: spacing.medium,
    width: '100%',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.medium,
    width: '100%',
  },
  checkCircle: {
    width: isTablet ? 24 : 16,
    height: isTablet ? 24 : 16,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: isTablet ? 12 : 10,
    fontWeight: '600',
  },
  highlightText: {
    fontSize: isTablet ? 18 : 14,
    color: '#374151',
    flex: 1,
    lineHeight: isTablet ? 24 : 18,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.large,
  },
  navigationTablet: {
    paddingHorizontal: spacing.extraLarge,
    paddingBottom: spacing.extraLarge,
  },
  navButton: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
  },
  navButtonDisabled: {
    opacity: 0,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  navButtonTextDisabled: {
    color: '#D1D5DB',
  },
  nextButton: {
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small,
    paddingVertical: spacing.baseLarge,
    paddingHorizontal: spacing.large,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sparkleText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
