import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type Props = {
  children: ReactNode;
};

export default function AppToast({ children }: Props) {
  const { bottom } = useSafeAreaInsets();
  return (
    <>
      {children}
      <Toast position="bottom" bottomOffset={bottom} />
    </>
  );
}

export function showSuccessToast(title: string, message: string, time = 3000) {
  Toast.show({
    text1: title,
    text2: message,
    type: 'success',
    position: 'top',
    topOffset: 100,
    visibilityTime: time,
  });
}

export function showErrorToast(title: string, message: string, time = 4000) {
  Toast.show({
    text1: title,
    text2: message,
    type: 'error',
    position: 'top',
    topOffset: 100,
    visibilityTime: time,
  });
}

export function hideToast() {
  Toast.hide();
}
