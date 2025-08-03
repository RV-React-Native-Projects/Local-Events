import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EventProvider } from 'react-native-outside-press';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppToast from '@common/AppToast';
import { MessageProvider } from '@context/I18n';
import MainNavigation from '@navigation/MainNavigation';
import { useSystemTheme } from '@redux/hooks';
import { store } from '@redux/store';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppToast>
        <Provider store={store}>
          <SystemThemeWrapper>
            <MessageProvider>
              <EventProvider>
                <GestureHandlerRootView>
                  <MainNavigation />
                </GestureHandlerRootView>
              </EventProvider>
            </MessageProvider>
          </SystemThemeWrapper>
        </Provider>
      </AppToast>
    </SafeAreaProvider>
  );
}

const SystemThemeWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useSystemTheme();
  return <>{children}</>;
};
