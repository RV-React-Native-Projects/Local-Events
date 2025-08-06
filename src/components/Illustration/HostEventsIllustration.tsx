/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Line,
  Text,
  Rect,
  Ellipse,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedG = Animated.createAnimatedComponent(G);

export default function HostEventsIllustration() {
  const backgroundScale = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);

  const stageScaleX = useSharedValue(0);
  const stageBaseY = useSharedValue(350);
  const stageBaseOpacity = useSharedValue(0);

  const spotlightAnimations = Array.from({ length: 3 }, () => ({
    opacity: useSharedValue(0),
    scaleY: useSharedValue(0),
    sourceScale: useSharedValue(0),
  }));

  const hostHeadScale = useSharedValue(0);
  const hostFaceOpacity = useSharedValue(0);
  const hostArmsRotate = useSharedValue(0);
  const hostArmsScale = useSharedValue(0);

  const microphoneScale = useSharedValue(0);
  const microphoneX = useSharedValue(20);
  const microphoneLightOpacity = useSharedValue(0.5);

  const musicalNoteColors = ['#F59E0B', '#EF4444', '#8B5CF6', '#10B981'];
  const musicalNoteSymbols = ['♪', '♫', '♬', '✨', '⭐'];
  // Reduce musical notes/stars to 6
  const musicalNoteAnimations = Array.from({ length: 6 }).map((_, i) => ({
    baseX: 50 + Math.random() * 300,
    baseY: 50 + Math.random() * 300,
    x: useSharedValue(0),
    y: useSharedValue(0),
    opacity: useSharedValue(0.7),
    scale: useSharedValue(0),
    color: musicalNoteColors[i % musicalNoteColors.length],
    symbol: musicalNoteSymbols[i % musicalNoteSymbols.length],
  }));

  const energyWaveAnimations = Array.from({ length: 6 }, () => ({
    radius: useSharedValue(0),
    opacity: useSharedValue(0.6),
  }));

  const balloonAnimations = Array.from({ length: 6 }, () => ({
    scale: useSharedValue(0),
    y: useSharedValue(0),
    rotate: useSharedValue(0),
  }));

  const hostBodyScale = useSharedValue(0);
  const hostBodyY = useSharedValue(280);

  // Add scale shared values for pop-in for all main elements
  const backgroundPop = useSharedValue(0);
  const stagePop = useSharedValue(0);
  const spotlightsPop = useSharedValue(0);
  const balloonsPop = useSharedValue(0);
  const audiencePop = useSharedValue(0);

  useEffect(() => {
    backgroundOpacity.value = withTiming(1, { duration: 1000 });
    backgroundScale.value = withDelay(
      200,
      withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }),
    );
    backgroundPop.value = withDelay(
      200,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
    );

    stageScaleX.value = withDelay(
      600,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
    );
    stagePop.value = withDelay(
      600,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
    );

    spotlightsPop.value = withDelay(
      1200,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
    );

    hostBodyScale.value = withDelay(
      1200,
      withSpring(1, { damping: 15, stiffness: 150 }),
    );
    hostBodyY.value = withDelay(
      1200,
      withTiming(200, { duration: 600, easing: Easing.out(Easing.ease) }),
    );

    hostHeadScale.value = withDelay(
      1400,
      withSpring(1, { damping: 15, stiffness: 150 }),
    );

    hostFaceOpacity.value = withDelay(1600, withTiming(1, { duration: 500 }));

    hostArmsScale.value = withDelay(1500, withTiming(1, { duration: 400 }));
    hostArmsRotate.value = withDelay(
      1700,
      withRepeat(
        withTiming(10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );

    microphoneScale.value = withDelay(
      1800,
      withSpring(1, { damping: 15, stiffness: 150 }),
    );
    microphoneX.value = withDelay(
      1800,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }),
    );

    microphoneLightOpacity.value = withDelay(
      2000,
      withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );

    balloonsPop.value = withDelay(
      2200,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
    );
    balloonAnimations.forEach((balloon, index) => {
      const delay = 2200 + index * 300;
      balloon.scale.value = withDelay(
        delay,
        withSpring(1, { damping: 15, stiffness: 150 }),
      );
      balloon.y.value = withRepeat(
        withTiming(-20, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
      balloon.rotate.value = withRepeat(
        withTiming(5, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    });

    // Sequential wave generation - each wave starts after the previous one
    energyWaveAnimations.forEach((wave, index) => {
      const delay = 2500 + index * 2000; // 2 second gap between waves
      wave.radius.value = withDelay(
        delay,
        withTiming(250, { duration: 5000, easing: Easing.out(Easing.ease) }), // Slower, no repeat
      );
      wave.opacity.value = withDelay(
        delay,
        withTiming(0, { duration: 5000, easing: Easing.out(Easing.ease) }), // Slower, no repeat
      );
    });

    musicalNoteAnimations.forEach(note => {
      const phase = Math.random() * Math.PI * 2;
      note.x.value = withRepeat(
        withTiming(40 * Math.sin(phase), {
          duration: 12000 + Math.random() * 4000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
      note.y.value = withRepeat(
        withTiming(40 * Math.cos(phase), {
          duration: 10000 + Math.random() * 5000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );
      note.opacity.value = withRepeat(
        withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
      note.scale.value = withDelay(
        2500,
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }),
      );
    });
  }, [
    backgroundOpacity,
    backgroundScale,
    backgroundPop,
    stageScaleX,
    stagePop,
    stageBaseY,
    stageBaseOpacity,
    spotlightAnimations,
    spotlightsPop,
    hostBodyScale,
    hostBodyY,
    hostHeadScale,
    hostFaceOpacity,
    hostArmsRotate,
    hostArmsScale,
    microphoneScale,
    microphoneX,
    microphoneLightOpacity,
    balloonsPop,
    balloonAnimations,
    // audiencePop,
    // audienceAnimations,
    musicalNoteAnimations,
    energyWaveAnimations,
  ]);

  const backgroundProps = useAnimatedProps(() => ({
    transform: [{ scale: backgroundScale.value * backgroundPop.value }],
    opacity: backgroundOpacity.value,
  }));

  const stageProps = useAnimatedProps(() => ({
    transform: [{ scaleX: stageScaleX.value * stagePop.value }],
  }));

  const spotlightData = [
    { x: 140, angle: 15 },
    { x: 200, angle: 0 },
    { x: 260, angle: -15 },
  ];

  const balloonData = [
    { x: 80, y: 120, color: '#EF4444' },
    { x: 320, y: 100, color: '#10B981' },
    { x: 90, y: 80, color: '#F59E0B' },
    { x: 310, y: 140, color: '#8B5CF6' },
    { x: 70, y: 160, color: '#06B6D4' },
    { x: 330, y: 180, color: '#EC4899' },
  ];

  const stageBaseProps = useAnimatedProps(() => ({
    transform: [{ translateY: stageBaseY.value - 250 }],
    opacity: stageBaseOpacity.value,
  }));

  const spotlightsGroupProps = useAnimatedProps(() => ({
    transform: [{ scale: spotlightsPop.value }],
  }));
  const balloonsGroupProps = useAnimatedProps(() => ({
    transform: [{ scale: balloonsPop.value }],
  }));
  const audienceGroupProps = useAnimatedProps(() => ({
    transform: [{ scale: audiencePop.value }],
  }));

  return (
    <View style={styles.container}>
      <Svg width={width} height={width} viewBox="0 0 400 400" fill="none">
        <Defs>
          <LinearGradient id="hostGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#F3E8FF" />
            <Stop offset="50%" stopColor="#E9D5FF" />
            <Stop offset="100%" stopColor="#DDD6FE" />
          </LinearGradient>
          <LinearGradient id="stageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#E5E7EB" />
            <Stop offset="100%" stopColor="#9CA3AF" />
          </LinearGradient>
          <LinearGradient
            id="spotlightGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.1" />
          </LinearGradient>
          <LinearGradient
            id="platformGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor="#4F46E5" />
            <Stop offset="100%" stopColor="#3730A3" />
          </LinearGradient>
        </Defs>

        <AnimatedCircle
          cx="200"
          cy="200"
          r="180"
          fill="url(#hostGradient)"
          animatedProps={backgroundProps}
        />

        <AnimatedEllipse
          cx="200"
          cy="280"
          rx="120"
          ry="40"
          fill="url(#stageGradient)"
          animatedProps={stageProps}
        />

        <AnimatedRect
          x="100"
          y="250"
          width="200"
          height="60"
          rx="8"
          fill="url(#platformGradient)"
          animatedProps={stageBaseProps}
        />

        <AnimatedRect
          x="190"
          y="200"
          width="20"
          height="35"
          rx="10"
          fill="#4F46E5"
          animatedProps={useAnimatedProps(() => ({
            transform: [
              { scale: hostBodyScale.value },
              { translateY: hostBodyY.value - 200 },
            ],
          }))}
        />

        <AnimatedG animatedProps={spotlightsGroupProps}>
          {spotlightData.map((light, index) => {
            const lightAnim = spotlightAnimations[index];

            const lightProps = useAnimatedProps(() => ({
              opacity: lightAnim.opacity.value,
              transform: [{ scaleY: lightAnim.scaleY.value }],
            }));

            const sourceProps = useAnimatedProps(() => ({
              transform: [{ scale: lightAnim.sourceScale.value }],
            }));

            return (
              <G key={index}>
                <AnimatedPath
                  d={`M${light.x} 80 L${light.x - 30} 250 L${
                    light.x + 30
                  } 250 Z`}
                  fill="url(#spotlightGradient)"
                  animatedProps={lightProps}
                />
                <AnimatedCircle
                  cx={light.x}
                  cy="80"
                  r="8"
                  fill="#FEF3C7"
                  animatedProps={sourceProps}
                />
              </G>
            );
          })}
        </AnimatedG>

        <G>
          <AnimatedCircle
            cx="200"
            cy="190"
            r="15"
            fill="#F59E0B"
            animatedProps={useAnimatedProps(() => ({
              transform: [{ scale: hostHeadScale.value }],
            }))}
          />

          <G
            animatedProps={useAnimatedProps(() => ({
              opacity: hostFaceOpacity.value,
            }))}>
            <Circle cx="195" cy="187" r="2" fill="white" />
            <Circle cx="205" cy="187" r="2" fill="white" />
            <Path
              d="M194 195 Q200 200 206 195"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </G>

          <G
            animatedProps={useAnimatedProps(() => ({
              transform: [
                { scale: hostArmsScale.value },
                { rotate: `${hostArmsRotate.value}deg` },
              ],
            }))}>
            <Rect x="175" y="205" width="15" height="8" rx="4" fill="#4F46E5" />
            <Rect x="210" y="205" width="15" height="8" rx="4" fill="#4F46E5" />
          </G>
        </G>

        <G
          animatedProps={useAnimatedProps(() => ({
            transform: [
              { scale: microphoneScale.value },
              { translateX: microphoneX.value },
            ],
          }))}>
          <Rect x="218" y="170" width="4" height="50" fill="#6B7280" />
          <Ellipse cx="220" cy="165" rx="8" ry="12" fill="#374151" />
          <AnimatedCircle
            cx="220"
            cy="160"
            r="3"
            fill="#EF4444"
            animatedProps={useAnimatedProps(() => ({
              opacity: microphoneLightOpacity.value,
            }))}
          />
        </G>

        {energyWaveAnimations.map((wave, index) => {
          const waveProps = useAnimatedProps(() => ({
            r: wave.radius.value,
            opacity: wave.opacity.value,
          }));

          return (
            <AnimatedCircle
              key={index}
              cx="200"
              cy="200"
              fill="none"
              stroke="#E0E7FF"
              strokeWidth="2"
              animatedProps={waveProps}
            />
          );
        })}

        <AnimatedG animatedProps={balloonsGroupProps}>
          {balloonData.map((balloon, index) => {
            const balloonAnim = balloonAnimations[index];
            const balloonProps = useAnimatedProps(() => ({
              transform: [
                { scale: balloonAnim.scale.value },
                { translateY: balloonAnim.y.value },
                { rotate: `${balloonAnim.rotate.value}deg` },
              ],
            }));

            return (
              <G key={index} animatedProps={balloonProps}>
                <Ellipse
                  cx={balloon.x}
                  cy={balloon.y}
                  rx="12"
                  ry="16"
                  fill={balloon.color}
                />
                <Line
                  x1={balloon.x}
                  y1={balloon.y + 16}
                  x2={balloon.x}
                  y2={balloon.y + 30}
                  stroke="#6B7280"
                  strokeWidth="1"
                />
              </G>
            );
          })}
        </AnimatedG>

        <AnimatedG animatedProps={audienceGroupProps}>
          {/* Body */}
          <Rect x="190" y="200" width="20" height="25" rx="10" fill="#4F46E5" />
          {/* Head */}
          <Circle cx="200" cy="190" r="12" fill="#F59E0B" />
          {/* Eyes */}
          <Circle cx="196" cy="188" r="2" fill="white" />
          <Circle cx="204" cy="188" r="2" fill="white" />
          {/* Smile */}
          <Path
            d="M194 195 Q200 200 206 195"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </AnimatedG>

        {musicalNoteAnimations.map((note, index) => {
          const noteProps = useAnimatedProps(() => ({
            x: note.baseX + note.x.value,
            y: note.baseY + note.y.value,
            opacity: note.opacity.value,
            transform: [{ scale: note.scale.value }],
          }));
          return (
            <AnimatedText
              key={index}
              fontSize="16"
              fill={note.color}
              animatedProps={noteProps}>
              {note.symbol}
            </AnimatedText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
