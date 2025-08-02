import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  Permission,
  PermissionStatus,
} from 'react-native-permissions';
import { device } from '@utils/device';

interface PermissionsInterFace {
  checkPermission: (per: Permission) => Promise<PermissionStatus>;
  getCameraPermissions: () => Promise<boolean>;
  getLocationPermissions: () => Promise<boolean>;
  requestMediaLibraryPermission: () => Promise<boolean>;
  requestReadMediaImagesPermission: () => Promise<boolean>;
  requestPhotoLibraryPermission: () => Promise<boolean>;
  requestPostNotificationPermission: () => Promise<boolean>;
  requestReadExternalStoragePermission: () => Promise<boolean>;
  requestWriteExternalStoragePermission: () => Promise<boolean>;
  requestPushNotificationPermission: () => Promise<boolean>;
}

const Permissions: PermissionsInterFace = {
  // Check permission for a given permission type
  checkPermission: async (
    permission: Permission,
  ): Promise<PermissionStatus> => {
    try {
      const result = await check(permission);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
      return result;
    } catch (error) {
      console.log('Error checking permission:', error);
      throw error;
    }
  },

  // Get Camera Permission (for both iOS and Android)
  getCameraPermissions: async (): Promise<boolean> => {
    const permission = device.isIOS
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;
    await Permissions.checkPermission(permission);
    const granted = await request(permission);
    return granted === RESULTS.GRANTED;
  },

  // Get Location Permission (for both iOS and Android)
  getLocationPermissions: async (): Promise<boolean> => {
    const permission = device.isIOS
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    await Permissions.checkPermission(permission);
    const granted = await request(permission);
    return granted === RESULTS.GRANTED;
  },

  // Request Media Library Permission (for both iOS and Android)
  requestMediaLibraryPermission: async (): Promise<boolean> => {
    const permission = device.isIOS
      ? PERMISSIONS.IOS.MEDIA_LIBRARY
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    await Permissions.checkPermission(permission);
    const granted = await request(permission);
    return granted === RESULTS.GRANTED;
  },

  // Request Read Media Images Permission
  requestReadMediaImagesPermission: async (): Promise<boolean> => {
    const permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    await Permissions.checkPermission(permission);
    const granted = await request(permission);
    return granted === RESULTS.GRANTED;
  },

  // Request Photo Library Permission (iOS only)
  requestPhotoLibraryPermission: async (): Promise<boolean> => {
    if (device.isIOS) {
      await Permissions.checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return granted === RESULTS.GRANTED;
    }
    return false;
  },

  requestPostNotificationPermission: async (): Promise<boolean> => {
    if (device.isAndroid) {
      const notificationPer =
        'android.permission.POST_NOTIFICATIONS' as Permission;
      await Permissions.checkPermission(notificationPer);
      const granted = await request(notificationPer);
      return granted === RESULTS.GRANTED;
    }
    return false;
  },

  // Request Read External Storage Permission (Android)
  requestReadExternalStoragePermission: async (): Promise<boolean> => {
    const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    await Permissions.checkPermission(permission);
    const granted = await request(permission);
    if (granted !== RESULTS.GRANTED) {
      return Permissions.requestReadMediaImagesPermission();
    }
    return granted === RESULTS.GRANTED;
  },

  // Request Write External Storage Permission (Android)
  requestWriteExternalStoragePermission: async (): Promise<boolean> => {
    const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
    await Permissions.checkPermission(permission);
    const granted = await request(permission);
    if (granted !== RESULTS.GRANTED) {
      return Permissions.requestReadMediaImagesPermission();
    }
    return granted === RESULTS.GRANTED;
  },

  // Request Push Notification Permission (for both iOS and Android)
  requestPushNotificationPermission: async (): Promise<boolean> => {
    if (device.isAndroid) {
      // Android specific push notification permission
      const notificationPer =
        'android.permission.POST_NOTIFICATIONS' as Permission;
      try {
        await Permissions.checkPermission(notificationPer);
        const granted = await request(notificationPer);
        return granted === RESULTS.GRANTED;
      } catch (error) {
        console.log(
          'Error requesting Android push notification permission:',
          error,
        );
        return false;
      }
    } else {
      return false;
    }
  },
};

export default Permissions;
