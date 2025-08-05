/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  G,
  Line,
  Text,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPath = Animated.createAnimatedComponent(Path);

// interface IllustrationProps {
//   className?: string;
// }

export function ConnectPeopleIllustration() {
  // Background circle animation
  const backgroundScale = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);
  const backgroundPulse = useSharedValue(1);

  // Central hub animation
  const hubScale = useSharedValue(0);
  const hubOpacity = useSharedValue(0);

  // People animations
  const peopleAnimations = Array.from({ length: 6 }, () => ({
    scale: useSharedValue(0),
    y: useSharedValue(50),
    opacity: useSharedValue(0),
    emojiScale: useSharedValue(0),
    emojiRotate: useSharedValue(0),
    nameOpacity: useSharedValue(0),
    nameY: useSharedValue(50),
    presenceRing: useSharedValue(30),
    presenceOpacity: useSharedValue(0.2),
  }));

  // Connection lines animations
  const connectionAnimations = Array.from({ length: 6 }, () => ({
    pathLength: useSharedValue(0),
  }));

  // Inter-person connections
  const interConnectionAnimations = Array.from({ length: 3 }, () => ({
    pathLength: useSharedValue(0),
  }));

  // Floating elements animations
  const floatingAnimations = Array.from({ length: 8 }, () => ({
    angle: useSharedValue(0),
    radius: useSharedValue(0),
    rotate: useSharedValue(0),
    opacity: useSharedValue(0.7),
  }));

  // Bubble animations
  const bubbleAnimations = Array.from({ length: 12 }, () => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
    scale: useSharedValue(0),
    opacity: useSharedValue(0),
  }));

  useEffect(() => {
    // Background animation - start immediately
    backgroundOpacity.value = withTiming(1, { duration: 800 });
    backgroundScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Background pulse animation - starts after 3 seconds
    backgroundPulse.value = withDelay(
      3000,
      withRepeat(
        withTiming(1.03, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    );

    // Hub animation - start sooner
    hubScale.value = withDelay(
      400,
      withSpring(1, { damping: 15, stiffness: 150 }),
    );
    hubOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));

    // People animations - start sooner and faster
    peopleAnimations.forEach((person, index) => {
      const delay = 600 + index * 150;

      person.scale.value = withDelay(
        delay,
        withSpring(1, { damping: 15, stiffness: 150 }),
      );
      person.y.value = withDelay(
        delay,
        withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
      );
      person.opacity.value = withDelay(
        delay + 300,
        withTiming(1, { duration: 400 }),
      );
      person.emojiScale.value = withDelay(
        delay + 600,
        withTiming(1, { duration: 400 }),
      );
      person.nameOpacity.value = withDelay(
        delay + 500,
        withTiming(0.8, { duration: 400 }),
      );
      person.nameY.value = withDelay(
        delay + 500,
        withTiming(25, { duration: 400 }),
      );

      // Presence ring animation - start sooner
      person.presenceRing.value = withDelay(
        delay + 800,
        withRepeat(
          withTiming(40, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          -1,
          true,
        ),
      );
      person.presenceOpacity.value = withDelay(
        delay + 800,
        withRepeat(
          withTiming(0.5, {
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
    });

    // Connection lines animations - start sooner
    connectionAnimations.forEach((connection, index) => {
      const delay = 1800 + index * 150;
      connection.pathLength.value = withDelay(
        delay,
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      );
    });

    // Inter-person connections - start sooner
    interConnectionAnimations.forEach((connection, index) => {
      const delay = 2800 + index * 150;
      connection.pathLength.value = withDelay(
        delay,
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      );
    });

    // Floating elements - circular animations - start sooner
    floatingAnimations.forEach((floating, index) => {
      const delay = 2000 + index * 200;
      const radius = 150 + (index % 3) * 30; // Vary radius more for full coverage

      // Circular motion
      floating.angle.value = withDelay(
        delay,
        withRepeat(
          withTiming(2 * Math.PI, {
            duration: 8000,
            easing: Easing.linear,
          }),
          -1,
          true,
        ),
      );
      // Radius variation for more dynamic movement across full area
      floating.radius.value = withDelay(
        delay,
        withRepeat(
          withTiming(radius + 50, {
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
      // Slow rotation of the element itself
      floating.rotate.value = withDelay(
        delay,
        withRepeat(
          withTiming(360, {
            duration: 8000,
            easing: Easing.linear,
          }),
          -1,
          true,
        ),
      );
      // Subtle opacity pulse
      floating.opacity.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
    });

    // Bubble animations - balloon-like movement - start sooner
    bubbleAnimations.forEach((bubble, index) => {
      const delay = 2500 + index * 150;
      const startX = Math.random() * 400;
      const startY = 450; // Start from below the view
      const endX = Math.random() * 400;
      const endY = -50; // Float above the view

      // Initialize position
      bubble.x.value = startX;
      bubble.y.value = startY;

      // X movement - gentle swaying across full width
      bubble.x.value = withDelay(
        delay,
        withRepeat(
          withTiming(endX, {
            duration: 10000 + Math.random() * 5000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );

      // Y movement - floating up like balloon through full height
      bubble.y.value = withDelay(
        delay,
        withRepeat(
          withTiming(endY, {
            duration: 12000 + Math.random() * 6000,
            easing: Easing.out(Easing.ease),
          }),
          -1,
          true,
        ),
      );

      // Scale animation - grow and shrink slightly
      bubble.scale.value = withDelay(
        delay,
        withRepeat(
          withTiming(1.2, {
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );

      // Opacity animation
      bubble.opacity.value = withDelay(
        delay,
        withRepeat(
          withTiming(0.8, {
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
    });
  }, [
    backgroundOpacity,
    backgroundScale,
    backgroundPulse,
    hubOpacity,
    hubScale,
    peopleAnimations,
    connectionAnimations,
    interConnectionAnimations,
    floatingAnimations,
    bubbleAnimations,
  ]);

  const backgroundProps = useAnimatedProps(() => ({
    transform: [{ scale: backgroundScale.value * backgroundPulse.value }],
    opacity: backgroundOpacity.value,
  }));

  const hubProps = useAnimatedProps(() => ({
    transform: [{ scale: hubScale.value }],
  }));

  const hubTextProps = useAnimatedProps(() => ({
    opacity: hubOpacity.value,
  }));

  const peopleData = [
    { x: 130, y: 130, color: '#F59E0B', emoji: '😊', name: 'Alex' },
    { x: 270, y: 140, color: '#EF4444', emoji: '🎵', name: 'Sam' },
    { x: 320, y: 220, color: '#10B981', emoji: '📚', name: 'Maya' },
    { x: 280, y: 290, color: '#8B5CF6', emoji: '🎨', name: 'Rio' },
    { x: 120, y: 280, color: '#06B6D4', emoji: '🎮', name: 'Casey' },
    { x: 80, y: 200, color: '#F97316', emoji: '☕', name: 'Jordan' },
  ];

  const connectionData = [
    { from: [130, 130], to: [200, 200] },
    { from: [270, 140], to: [200, 200] },
    { from: [320, 220], to: [200, 200] },
    { from: [280, 290], to: [200, 200] },
    { from: [120, 280], to: [200, 200] },
    { from: [80, 200], to: [200, 200] },
  ];

  const interConnectionData = [
    { from: [130, 130], to: [270, 140] },
    { from: [270, 140], to: [320, 220] },
    { from: [120, 280], to: [80, 200] },
  ];

  const floatingData = [
    { x: 20, y: 200, color: '#F472B6', isHeart: true }, // Left
    { x: 380, y: 200, color: '#FDE047', isHeart: false }, // Right
    { x: 200, y: 20, color: '#A78BFA', isHeart: true }, // Top
    { x: 200, y: 380, color: '#F472B6', isHeart: false }, // Bottom
    { x: 80, y: 80, color: '#FDE047', isHeart: true }, // Top-left
    { x: 320, y: 80, color: '#A78BFA', isHeart: false }, // Top-right
    { x: 80, y: 320, color: '#F472B6', isHeart: true }, // Bottom-left
    { x: 320, y: 320, color: '#FDE047', isHeart: false }, // Bottom-right
  ];

  const bubbleData = Array.from({ length: 6 }, (_, i) => ({
    color: ['#A5F3FC', '#FEF3C7', '#FCE7F3', '#DBEAFE', '#F3E8FF', '#FEF2F2'][
      i % 6
    ],
    size: 8 + Math.random() * 12, // Random size between 8-20
  }));

  return (
    <View style={styles.container}>
      <Svg width={width} height={width} viewBox="0 0 400 400" fill="none">
        <Defs>
          <LinearGradient
            id="connectGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <Stop offset="0%" stopColor="#FEF3C7" />
            <Stop offset="50%" stopColor="#FDE68A" />
            <Stop offset="100%" stopColor="#F59E0B" />
          </LinearGradient>
          <RadialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#8B5CF6" />
            <Stop offset="100%" stopColor="#7C3AED" />
          </RadialGradient>
          <LinearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%">
            <Stop offset="0%" stopColor="#F59E0B" />
            <Stop offset="50%" stopColor="#EF4444" />
            <Stop offset="100%" stopColor="#10B981" />
          </LinearGradient>
        </Defs>

        {/* Background */}
        <AnimatedCircle
          cx="200"
          cy="200"
          r="180"
          fill="url(#connectGradient)"
          animatedProps={backgroundProps}
        />

        {/* Central Community Hub */}
        <AnimatedCircle
          cx="200"
          cy="200"
          r="25"
          fill="url(#hubGradient)"
          animatedProps={hubProps}
        />
        <AnimatedText
          x="200"
          y="205"
          textAnchor="middle"
          fontSize="16"
          fill="white"
          animatedProps={hubTextProps}>
          ✨
        </AnimatedText>

        {/* People Avatars with Personality */}
        {peopleData.map((person, index) => {
          const personAnim = peopleAnimations[index];

          const personCircleProps = useAnimatedProps(() => ({
            transform: [{ scale: personAnim.scale.value }],
            cy: person.y + personAnim.y.value,
          }));

          const presenceRingProps = useAnimatedProps(() => ({
            r: personAnim.presenceRing.value,
            opacity: personAnim.presenceOpacity.value,
          }));

          const emojiProps = useAnimatedProps(() => ({
            transform: [{ scale: personAnim.emojiScale.value }],
            opacity: personAnim.opacity.value,
          }));

          const nameProps = useAnimatedProps(() => ({
            opacity: personAnim.nameOpacity.value,
            transform: [{ translateY: personAnim.nameY.value }],
          }));

          return (
            <G key={index}>
              {/* Presence Ring */}
              <AnimatedCircle
                cx={person.x}
                cy={person.y}
                fill="none"
                stroke={person.color}
                strokeWidth="2"
                animatedProps={presenceRingProps}
              />

              {/* Avatar Circle */}
              <AnimatedCircle
                cx={person.x}
                cy={person.y}
                r="20"
                fill={person.color}
                animatedProps={personCircleProps}
              />

              {/* Face/Interest Emoji */}
              <AnimatedText
                x={person.x}
                y={person.y + 2}
                textAnchor="middle"
                fontSize="14"
                animatedProps={emojiProps}>
                {person.emoji}
              </AnimatedText>

              {/* Name Label */}
              <AnimatedText
                x={person.x}
                y={person.y + 35}
                textAnchor="middle"
                fontSize="10"
                fill="#374151"
                animatedProps={nameProps}>
                {person.name}
              </AnimatedText>
            </G>
          );
        })}

        {/* Dynamic Connection Lines */}
        {connectionData.map((connection, index) => {
          const connectionAnim = connectionAnimations[index];

          const lineProps = useAnimatedProps(() => ({
            strokeDasharray: interpolate(
              connectionAnim.pathLength.value,
              [0, 1],
              [0, 12],
            ),
            opacity: interpolate(
              connectionAnim.pathLength.value,
              [0, 1],
              [0, 0.7],
            ),
          }));

          return (
            <AnimatedLine
              key={index}
              x1={connection.from[0]}
              y1={connection.from[1]}
              x2={connection.to[0]}
              y2={connection.to[1]}
              stroke="url(#connectionGradient)"
              strokeWidth="3"
              animatedProps={lineProps}
            />
          );
        })}

        {/* Inter-person Connections */}
        {interConnectionData.map((connection, index) => {
          const interAnim = interConnectionAnimations[index];

          const lineProps = useAnimatedProps(() => ({
            strokeDasharray: interpolate(
              interAnim.pathLength.value,
              [0, 1],
              [0, 8],
            ),
            opacity: interpolate(interAnim.pathLength.value, [0, 1], [0, 0.4]),
          }));

          return (
            <AnimatedLine
              key={`inter-${index}`}
              x1={connection.from[0]}
              y1={connection.from[1]}
              x2={connection.to[0]}
              y2={connection.to[1]}
              stroke="#8B5CF6"
              strokeWidth="2"
              animatedProps={lineProps}
            />
          );
        })}

        {/* Floating Hearts and Sparks */}
        {floatingData.map((floating, index) => {
          const floatingAnim = floatingAnimations[index];

          const floatingProps = useAnimatedProps(() => {
            return {
              transform: [{ rotate: `${floatingAnim.rotate.value}deg` }],
              opacity: floatingAnim.opacity.value,
            };
          });

          const pathData = floating.isHeart
            ? 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
            : 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

          return (
            <AnimatedPath
              key={index}
              d={pathData}
              fill={floating.color}
              transform={`translate(${
                200 +
                floatingAnim.radius.value * Math.cos(floatingAnim.angle.value) -
                12
              }, ${
                200 +
                floatingAnim.radius.value * Math.sin(floatingAnim.angle.value) -
                12
              }) scale(0.5)`}
              animatedProps={floatingProps}
            />
          );
        })}

        {/* Floating Bubbles */}
        {bubbleData.map((bubble, index) => {
          const bubbleAnim = bubbleAnimations[index];

          const bubbleProps = useAnimatedProps(() => ({
            transform: [
              { translateX: bubbleAnim.x.value },
              { translateY: bubbleAnim.y.value },
              { scale: bubbleAnim.scale.value },
            ],
            opacity: bubbleAnim.opacity.value,
          }));

          return (
            <AnimatedCircle
              key={`bubble-${index}`}
              cx="0"
              cy="0"
              r={bubble.size}
              fill={bubble.color}
              animatedProps={bubbleProps}
            />
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
