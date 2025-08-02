declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME: string;
    APP_NAME_IOS: string;
    APP_ID: string;
    BUNDLE_ID_IOS: string;
    MAJOR_VERSION: number;
    PATCH_VERSION: number;
    MINOR_VERSION: number;
    MARKETING_VERSION_IOS: string;
    SCHEME: string;
    _SCHEME: string;
    HOST_URL: string;
    NOTIFICATION_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
