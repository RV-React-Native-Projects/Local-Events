import { useEffect, useState } from 'react';
import { View, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { AppText } from '@components/AppText';
import { useAppTheme } from '@redux/hooks';
import { radius } from '@themes/border';
import { spacing } from '@themes/spacing';

interface Item {
  key: string;
  value: string;
}

interface SegmentButtonProps {
  items: Item[];
  onPress: (selected: string) => void;
  defaultValue?: string;
}

export default function SegmentButton({
  items,
  onPress,
  defaultValue = items[0].key,
}: SegmentButtonProps) {
  const { width } = useWindowDimensions();
  const { colors, shadow } = useAppTheme();
  const SWITCH_CONTAINER_WIDTH = width * 0.8;
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / items.length;
  const SLIDER_WIDTH = (width * 0.7) / items.length;

  const [selected, setSelected] = useState(defaultValue || items[0]?.key || '');

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    const index = items.findIndex(item => item.key === selected);
    translateX.value = withSpring(SWITCH_WIDTH * index, {
      mass: 1,
      damping: 15,
      stiffness: 100,
    });
  }, [selected, SWITCH_WIDTH, items, translateX]);

  const handlePress = (item: Item) => {
    setSelected(item.key);
    onPress(item.key);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.appBackgroundColor,
          borderColor: colors.appBackgroundColor,
          width: SWITCH_CONTAINER_WIDTH,
        },
      ]}>
      <Animated.View
        style={[
          styles.animatedWrapper,
          { width: SWITCH_WIDTH },
          animatedStyle,
        ]}>
        <Animated.View
          style={{
            width: SLIDER_WIDTH,
            backgroundColor: colors.backgroundColor,
            ...styles.slider,
            ...shadow.regular,
          }}
        />
      </Animated.View>

      {items.map(item => (
        <Pressable
          key={item.key}
          onPress={() => handlePress(item)}
          style={styles.pressable}>
          <AppText variant="label">{item.value}</AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  animatedWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    padding: spacing.smallLarge,
    borderRadius: radius.sm,
  },
  pressable: {
    flex: 1,
    padding: spacing.mediumLarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
