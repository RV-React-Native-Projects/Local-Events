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
  interpolate,
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
} from 'react-native-svg';

const { width } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function DiscoverEventsIllustration() {
  // Background animation
  const backgroundScale = useSharedValue(0);
  const backgroundRotate = useSharedValue(-180);
  const backgroundOpacity = useSharedValue(0);

  // Building animations
  const buildingAnimations = Array.from({ length: 7 }, () => ({
    y: useSharedValue(400),
    opacity: useSharedValue(0),
  }));

  // Window animations - reduced count for better performance
  const windowAnimations = Array.from({ length: 10 }, () => ({
    opacity: useSharedValue(0),
  }));

  // Event marker animations
  const markerAnimations = Array.from({ length: 4 }, () => ({
    scale: useSharedValue(0),
    y: useSharedValue(50),
    ringRadius: useSharedValue(15),
    ringOpacity: useSharedValue(0.3),
    iconOpacity: useSharedValue(0),
    lineOpacity: useSharedValue(0),
    linePathLength: useSharedValue(0),
  }));

  // Connection line animations
  const connectionAnimations = Array.from({ length: 2 }, () => ({
    pathLength: useSharedValue(0),
    opacity: useSharedValue(0),
  }));

  // Particle animations - reduced count for better performance
  const particleAnimations = Array.from({ length: 5 }, () => ({
    y: useSharedValue(0),
    x: useSharedValue(0),
    opacity: useSharedValue(0.6),
  }));

  useEffect(() => {
    backgroundOpacity.value = withTiming(1, { duration: 1000 });
    backgroundScale.value = withDelay(
      200,
      withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) }),
    );
    backgroundRotate.value = withDelay(
      200,
      withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),
    );

    markerAnimations.forEach((marker, index) => {
      const delay = 1200 + index * 200;

      marker.scale.value = withDelay(
        delay,
        withSpring(1, { damping: 15, stiffness: 150 }),
      );
      marker.y.value = withDelay(
        delay,
        withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }),
      );

      marker.iconOpacity.value = withDelay(
        delay + 300,
        withTiming(1, { duration: 400 }),
      );

      marker.ringRadius.value = withDelay(
        delay + 500,
        withRepeat(
          withTiming(25, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          -1,
          true,
        ),
      );
      marker.ringOpacity.value = withDelay(
        delay + 500,
        withRepeat(
          withTiming(0.7, {
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );

      marker.lineOpacity.value = withDelay(
        delay + 1000,
        withTiming(0.6, { duration: 1000 }),
      );
      marker.linePathLength.value = withDelay(
        delay + 1000,
        withTiming(1, { duration: 1000 }),
      );
    });

    connectionAnimations.forEach((connection, index) => {
      const delay = 3000 + index * 500;
      connection.opacity.value = withDelay(
        delay,
        withTiming(0.8, { duration: 1000 }),
      );
    });

    particleAnimations.forEach((particle, index) => {
      const delay = 4000 + index * 200;
      const duration = 6000 + index * 500;

      particle.y.value = withDelay(
        delay,
        withRepeat(
          withTiming(-15, {
            duration,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
      particle.x.value = withDelay(
        delay,
        withRepeat(
          withTiming((index % 2 === 0 ? 1 : -1) * 4, {
            duration,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
      particle.opacity.value = withDelay(
        delay,
        withRepeat(
          withTiming(0.8, {
            duration,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );
    });

    buildingAnimations.forEach((building, index) => {
      const delay = 6000 + index * 200;
      building.y.value = withDelay(
        delay,
        withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
      );
      building.opacity.value = withDelay(
        delay,
        withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }),
      );
    });

    windowAnimations.forEach((window, index) => {
      const delay = 7000 + index * 300;
      window.opacity.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
          -1,
          true,
        ),
      );
    });
  }, [
    backgroundOpacity,
    backgroundScale,
    backgroundRotate,
    buildingAnimations,
    windowAnimations,
    markerAnimations,
    connectionAnimations,
    particleAnimations,
  ]);

  const backgroundProps = useAnimatedProps(() => ({
    transform: [
      { scale: backgroundScale.value },
      { rotate: `${backgroundRotate.value}deg` },
    ],
    opacity: backgroundOpacity.value,
  }));

  const buildingData = [
    { x: 60, y: 280, width: 30, height: 80 },
    { x: 100, y: 240, width: 35, height: 120 },
    { x: 145, y: 260, width: 40, height: 100 },
    { x: 195, y: 220, width: 35, height: 140 },
    { x: 240, y: 250, width: 30, height: 110 },
    { x: 280, y: 230, width: 38, height: 130 },
    { x: 325, y: 270, width: 32, height: 90 },
  ];

  const markerData = [
    { x: 120, y: 180, type: 'music', color: '#F59E0B', icon: '♪' },
    { x: 180, y: 200, type: 'art', color: '#EF4444', icon: '🎨' },
    { x: 240, y: 160, type: 'coffee', color: '#10B981', icon: '☕' },
    { x: 290, y: 190, type: 'photo', color: '#6366F1', icon: '📸' },
  ];

  const particleData = Array.from({ length: 5 }).map((_, i) => ({
    x: Math.random() * 400,
    y: Math.random() * 400,
    r: Math.random() * 2 + 1,
    color: ['#F59E0B', '#EF4444', '#10B981', '#6366F1'][
      Math.floor(Math.random() * 4 + i)
    ],
  }));

  return (
    <View style={styles.container}>
      <Svg width={width} height={width} viewBox="0 0 400 400" fill="none">
        <Defs>
          <LinearGradient
            id="discoverGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">
            <Stop offset="0%" stopColor="#EEF2FF" />
            <Stop offset="50%" stopColor="#E0E7FF" />
            <Stop offset="100%" stopColor="#C7D2FE" />
          </LinearGradient>
          <LinearGradient
            id="buildingGradient0"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor="#E0E7FF" />
            <Stop offset="100%" stopColor="#C7D2FE" />
          </LinearGradient>
          <LinearGradient
            id="buildingGradient1"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor="#F3E8FF" />
            <Stop offset="100%" stopColor="#E9D5FF" />
          </LinearGradient>
          <LinearGradient
            id="buildingGradient2"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor="#DBEAFE" />
            <Stop offset="100%" stopColor="#BFDBFE" />
          </LinearGradient>
          <LinearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%">
            <Stop offset="0%" stopColor="#F59E0B" />
            <Stop offset="33%" stopColor="#EF4444" />
            <Stop offset="66%" stopColor="#10B981" />
            <Stop offset="100%" stopColor="#6366F1" />
          </LinearGradient>
        </Defs>

        {/* Animated Background Gradient */}
        <AnimatedCircle
          cx="200"
          cy="200"
          r="180"
          fill="url(#discoverGradient)"
          animatedProps={backgroundProps}
        />

        {buildingData.map((building, index) => {
          const buildingAnim = buildingAnimations[index];

          const buildingProps = useAnimatedProps(() => ({
            transform: [{ translateY: buildingAnim.y.value }],
            opacity: buildingAnim.opacity.value,
          }));

          return (
            <G key={index}>
              <AnimatedRect
                x={building.x}
                y={building.y}
                width={building.width}
                height={building.height}
                rx="4"
                fill="transparent"
                stroke="#E5E7EB"
                strokeWidth="1"
                animatedProps={buildingProps}
              />
              {Array.from({
                length: Math.min(3, Math.floor(building.height / 20)),
              }).map((_, windowRow) =>
                Array.from({
                  length: Math.min(2, Math.floor(building.width / 12)),
                }).map((__, windowCol) => {
                  const windowIndex = windowRow * 2 + windowCol;
                  const windowAnim =
                    windowAnimations[windowIndex] || windowAnimations[0];

                  const windowProps = useAnimatedProps(() => ({
                    opacity: windowAnim.opacity.value,
                  }));

                  return (
                    <AnimatedRect
                      key={`${windowRow}-${windowCol}`}
                      x={building.x + 4 + windowCol * 12}
                      y={building.y + 8 + windowRow * 20}
                      width="6"
                      height="8"
                      fill={windowRow % 2 === 0 ? '#FEF3C7' : '#374151'}
                      animatedProps={windowProps}
                    />
                  );
                }),
              )}
            </G>
          );
        })}

        {markerData.map((marker, index) => {
          const markerAnim = markerAnimations[index];

          const markerProps = useAnimatedProps(() => ({
            transform: [
              { scale: markerAnim.scale.value },
              { translateY: markerAnim.y.value },
            ],
          }));

          const ringProps = useAnimatedProps(() => ({
            r: markerAnim.ringRadius.value,
            opacity: markerAnim.ringOpacity.value,
          }));

          const iconProps = useAnimatedProps(() => ({
            opacity: markerAnim.iconOpacity.value,
          }));

          const lineProps = useAnimatedProps(() => ({
            opacity: markerAnim.lineOpacity.value,
            strokeDasharray: interpolate(
              markerAnim.linePathLength.value,
              [0, 1],
              [0, 8],
            ),
          }));

          return (
            <G key={index}>
              <AnimatedCircle
                cx={marker.x}
                cy={marker.y}
                fill="none"
                stroke={marker.color}
                strokeWidth="2"
                animatedProps={ringProps}
              />
              <AnimatedCircle
                cx={marker.x}
                cy={marker.y}
                r="12"
                fill={marker.color}
                animatedProps={markerProps}
              />
              <AnimatedText
                x={marker.x}
                y={marker.y + 1}
                textAnchor="middle"
                fontSize="8"
                fill="white"
                animatedProps={iconProps}>
                {marker.icon}
              </AnimatedText>
              <AnimatedLine
                x1={marker.x}
                y1={marker.y + 12}
                x2={marker.x}
                y2={marker.y + 40}
                stroke={marker.color}
                strokeWidth="2"
                strokeDasharray="4,4"
                animatedProps={lineProps}
              />
            </G>
          );
        })}

        {connectionAnimations.map((connection, index) => {
          const connectionProps = useAnimatedProps(() => ({
            opacity: connection.opacity.value,
          }));

          const pathData =
            index === 0
              ? 'M120 180 Q150 160 180 200 Q210 180 240 160'
              : 'M180 200 Q220 185 240 160 Q265 175 290 190';

          return (
            <AnimatedPath
              key={index}
              d={pathData}
              stroke="url(#connectionGradient)"
              strokeWidth="3"
              fill="none"
              animatedProps={connectionProps}
            />
          );
        })}

        {particleData.map((particle, index) => {
          const particleAnim = particleAnimations[index];

          const particleProps = useAnimatedProps(() => ({
            transform: [
              { translateY: particleAnim.y.value },
              { translateX: particleAnim.x.value },
            ],
            opacity: particleAnim.opacity.value,
          }));

          return (
            <AnimatedCircle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r={particle.r}
              fill={particle.color}
              animatedProps={particleProps}
            />
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
