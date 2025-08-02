import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const device = {
  platform: Platform.OS,
  device_type: DeviceInfo.getDeviceType(),
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isTablet: DeviceInfo.isTablet(),
  hasNotch: DeviceInfo.hasNotch(),
};
