import { useMemo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { debounce } from 'lodash';
import { useAppTheme } from '@redux/hooks';
import { opacity } from '@themes/opacity';
import size from '@themes/size';
import { ISearchInputProps } from './SearchInputTypes';
import { useSearchInputStyle } from './style';

export default function SearchInput(props: ISearchInputProps) {
  const {
    onPressSearch,
    getSearchText,
    debounced = false,
    delay = 800,
    viewStyle,
    textStyle,
    ...rest
  } = props;
  const [search, setSearch] = useState('');
  const styles = useSearchInputStyle();
  const { colors } = useAppTheme();

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        getSearchText(text);
      }, delay),
    [getSearchText, delay],
  );

  function onChangeSearch(text: string) {
    setSearch(text);
    if (debounced) debouncedSearch(text);
    else getSearchText(text);
  }

  return (
    <View style={[styles.container, viewStyle]}>
      <TextInput
        value={search}
        onChangeText={onChangeSearch}
        keyboardType="web-search"
        clearButtonMode="while-editing"
        {...rest}
        style={[styles.inputStyle, textStyle]}
      />
      <TouchableOpacity
        activeOpacity={opacity.dark}
        onPress={onPressSearch}
        style={styles.searchButton}>
        <MaterialIcons name="search" size={size.sm} color={colors.info} />
      </TouchableOpacity>
    </View>
  );
}
