import { StyleSheet } from 'react-native';
import { getTimeZone } from 'react-native-localize';
import Reanimated, { FadeIn } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppTheme } from '@redux/hooks';
import { IDateTimePickerProps } from './types';

const AppDateTimePicker = (props: IDateTimePickerProps) => {
  const { mode, value, ...rest } = props;
  const { colors, theme } = useAppTheme();

  return (
    <Reanimated.View entering={FadeIn}>
      <DateTimePicker
        role="button"
        mode={mode}
        display="inline"
        style={style.picker}
        is24Hour={true}
        accentColor={colors.primary}
        themeVariant={theme}
        timeZoneName={getTimeZone()}
        value={
          value instanceof Date && !isNaN(value.getTime()) ? value : new Date()
        }
        {...rest}
      />
    </Reanimated.View>
  );
};

export default AppDateTimePicker;

const style = StyleSheet.create({
  picker: { marginVertical: 'auto', padding: 0 },
});
