import { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AppText from '@components/AppText/AppText';
import { useAppTheme } from '@redux/hooks';
import { DownArrowSvg } from '@svgs';
import { DropdownComponentProps, DropDownDataInterface } from './DropDownTypes';
import { useDropDownStyle } from './styles';

export default function AppDropDown<T extends DropDownDataInterface>(
  props: DropdownComponentProps<T>,
) {
  const { colors } = useAppTheme();
  const { styles } = useDropDownStyle();

  const {
    label = 'Label',
    placeholder = 'Select an option',
    required,
    data,
    error,
    errorMessage = '',
    containerStyle,
    disable,
    ...rest
  } = props;

  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View>
      {label && (
        <AppText
          variant="label"
          color={error ? 'error' : 'title'}
          style={styles.label}>
          {label} {required && <AppText color="error">*</AppText>}
        </AppText>
      )}
      <View
        style={[
          styles.container,
          {
            borderColor: error ? colors.error : colors.inputBorder,
          },
          containerStyle,
        ]}>
        <Dropdown
          containerStyle={{
            backgroundColor: colors.backgroundColor,
          }}
          itemContainerStyle={{ backgroundColor: colors.backgroundColor }}
          style={[
            styles.dropdown,
            isFocus && { borderColor: colors.primary },
            error && { borderColor: colors.warning },
          ]}
          activeColor={colors.appBackgroundColor}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          selectedTextProps={{ numberOfLines: 1 }}
          itemTextStyle={styles.itemTextStyle}
          renderRightIcon={() => <DownArrowSvg />}
          data={data}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          {...rest}
        />
      </View>
      {error && errorMessage && (
        <AppText variant="footnote" fontFamily="Regular" color="error">
          {errorMessage}
        </AppText>
      )}
    </View>
  );
}
