// import { useEffect, useState } from 'react';
// import { TouchableOpacity, View } from 'react-native';
// import CountryPicker, {
//   Country,
//   DARK_THEME,
//   DEFAULT_THEME,
//   CountryCode,
//   Region,
//   Subregion,
// } from 'react-native-country-picker-modal';
// import * as RNLocalize from 'react-native-localize';
// import _, { toLower } from 'lodash';
// import DownArrowSvg from '@assets/svgs/DownArrowSvg';
// import AppText from '@components/AppText/AppText';
// import { CountryData } from '@constants/CountryData';
// import { useAppTheme } from '@redux/hooks';
// import { CountryPickerInterface } from './PickersTypes';
// import { useDropDownStyle } from './styles';

// export default function AppCountryPicker(props: CountryPickerInterface) {
//   const {
//     label = 'Select a Country',
//     value,
//     required,
//     error,
//     errorMessage = 'Please select a country',
//     ButtonStyle,
//     onSelect,
//     wrapperStyle,
//     disabled = false,
//     ...rest
//   } = props;

//   const { isDark, colors } = useAppTheme();
//   const { styles } = useDropDownStyle();
//   const [visible, setVisible] = useState(false);
//   const [selected, setSelected] = useState<CountryCode | undefined>();

//   function getCountryData(countryCode: CountryCode) {
//     return _.find(CountryData, (info: (typeof CountryData)[0]) => {
//       if (info?.cca2 === countryCode) {
//         const data: Country = {
//           callingCode: [info.callingCodes[0].replace('+', '')],
//           cca2: info.cca2 as CountryCode,
//           currency: [Object.keys(info.currencies)[0]],
//           flag: `flag-${toLower(info.cca2)}`,
//           name: info.name?.common,
//           region: info?.region as Region,
//           subregion: info?.subregion as Subregion,
//         };
//         return onSelect && onSelect(data);
//       }
//     });
//   }

//   useEffect(() => {
//     if (!selected) {
//       const countryCode = RNLocalize.getCountry();
//       setSelected(value ?? (countryCode as CountryCode));
//       getCountryData(value ?? (countryCode as CountryCode));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selected, value]);

//   const onSelectCountry = (country: Country) => {
//     setSelected(country?.cca2);
//     onSelect && onSelect(country);
//   };

//   return (
//     <>
//       {label && (
//         <AppText
//           variant="label"
//           color={error ? 'error' : 'title'}
//           style={styles.label}>
//           {label} {required && <AppText color="error"> *</AppText>}
//         </AppText>
//       )}
//       <TouchableOpacity
//         style={wrapperStyle}
//         activeOpacity={0.8}
//         disabled={disabled}
//         onPress={() => {
//           if (!disabled) {
//             setVisible(true);
//           }
//         }}>
//         <View
//           style={[
//             styles.container,
//             {
//               borderColor: error ? colors.error : colors.inputBorder,
//             },
//           ]}>
//           <CountryPicker
//             theme={
//               isDark
//                 ? { ...DARK_THEME, ...styles.pickerTheme }
//                 : { ...DEFAULT_THEME, ...styles.pickerTheme }
//             }
//             countryCode={selected}
//             withFilter={true}
//             withFlag={true}
//             withCurrencyButton={false}
//             withAlphaFilter={true}
//             withCallingCodeButton={false}
//             withCountryNameButton={true}
//             withFlagButton={false}
//             withCallingCode={false}
//             withEmoji={true}
//             withModal={true}
//             visible={visible}
//             disabled={disabled}
//             onSelect={onSelectCountry}
//             containerButtonStyle={[styles.containerButtonStyle, ButtonStyle]}
//             {...rest}
//           />
//           <DownArrowSvg />
//         </View>
//         {error && errorMessage && (
//           <AppText variant="label" color="error" style={styles.marginVertical4}>
//             {errorMessage}
//           </AppText>
//         )}
//       </TouchableOpacity>
//     </>
//   );
// }
