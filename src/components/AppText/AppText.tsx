import { Text } from 'react-native';
import { fontFamily } from '@themes/fontSize';
import { AppTextProps } from './AppTextTypes';
import { useAppTextStyle } from './style';

export default function AppText(props: AppTextProps) {
  const { color, variant, uppercase = false, textAlign } = props;
  const { typographyStyle } = useAppTextStyle(uppercase);
  return (
    <Text
      {...props}
      style={[
        typographyStyle(variant ?? 'body', color ?? 'text').style,
        props.size ? { fontSize: props.size } : {},
        props.fontFamily ? { fontFamily: fontFamily[props.fontFamily] } : {},
        { textAlign },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
}
