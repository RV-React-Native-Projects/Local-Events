import { Pressable } from 'react-native';
import Animated, { Easing, FadeInLeft } from 'react-native-reanimated';
import { useAppNavigation } from '@navigation/AppNavigation';
import { useAppTheme } from '@redux/hooks';
import { HeaderBackIconProps } from './HeaderTypes';
import { useHeaderStyle } from './style';
import BackArrow from '@assets/svgs/BackArrow';

export default function HeaderBackIcon(props: HeaderBackIconProps) {
  const { colors } = useAppTheme();
  const {
    iconColor = colors.iconColor,
    iconHeight = 25,
    iconWidth = 25,
    onPressBack,
  } = props;
  const styles = useHeaderStyle();
  const navigation = useAppNavigation();

  const goBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  // Return null if there's no previous screen to go back to
  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <Pressable onPress={onPressBack || goBack} style={styles.leftIconPressable}>
      <Animated.View
        entering={FadeInLeft.duration(400)
          .damping(30)
          .mass(5)
          .stiffness(10)
          .easing(Easing.ease)}
      >
        <BackArrow color={iconColor} height={iconHeight} width={iconWidth} />
      </Animated.View>
    </Pressable>
  );
}
