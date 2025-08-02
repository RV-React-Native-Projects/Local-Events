import AppToast from '@common/AppToast';
import { MessageProvider } from '@context/I18n';
import { useSystemTheme } from '@redux/hooks';
import { store } from '@redux/store';
import { ReactNode } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EventProvider } from 'react-native-outside-press';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

const SystemThemeWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useSystemTheme();
  return <>{children}</>;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AppToast>
        <Provider store={store}>
          <SystemThemeWrapper>
            <MessageProvider>
              <EventProvider>
                <GestureHandlerRootView>
                  <View style={styles.container}>
                    <StatusBar
                      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    />
                    <Text>Hello There</Text>
                  </View>
                </GestureHandlerRootView>
              </EventProvider>
            </MessageProvider>
          </SystemThemeWrapper>
        </Provider>
      </AppToast>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
