import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '@/context/ThemeProvider';
import GlobalProvider from '@/context/GlobalProvider';
import DataProvider from '@/context/DataProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastProviderContext from '@/context/ToastProvider';
import { ActivityIndicator, View } from 'react-native';
import * as Font from 'expo-font';

import {
  useColorScheme,
  getUserPreferredTheme,
} from '@/utils/getPreferredTheme';
import './global.css';

SplashScreen.preventAutoHideAsync();

// SplashScreen.setOptions({
//   fade: true,
//   duration: 1000,
// });

const RootLayoutContent = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Poppins-Black': require('@assets/fonts/Poppins-Black.ttf'),
          'Poppins-Bold': require('@assets/fonts/Poppins-Bold.ttf'),
          'Poppins-ExtraBold': require('@assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-ExtraLight': require('@assets/fonts/Poppins-ExtraLight.ttf'),
          'Poppins-Light': require('@assets/fonts/Poppins-Light.ttf'),
          'Poppins-Medium': require('@assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Regular': require('@assets/fonts/Poppins-Regular.ttf'),
          'Poppins-SemiBold': require('@assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Thin': require('@assets/fonts/Poppins-Thin.ttf'),
        });

        // await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ToastProviderContext>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          <Stack.Screen name='(profile)' options={{ headerShown: false }} />
          <Stack.Screen name='(categories)' options={{ headerShown: false }} />
          <Stack.Screen
            name='(transactions)'
            options={{ headerShown: false }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
      </ToastProviderContext>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(DefaultTheme);

  React.useEffect(() => {
    async function fetchTheme() {
      const userTheme = await getUserPreferredTheme();
      if (userTheme) {
        setTheme(userTheme === 'dark' ? DarkTheme : DefaultTheme);
      } else {
        setTheme(colorScheme === 'dark' ? DarkTheme : DefaultTheme);
      }
    }
    fetchTheme();
  }, [colorScheme]);

  return (
    <ThemeProvider value={theme}>
      <GlobalProvider>
        <DataProvider>
          <RootLayoutContent />
        </DataProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}
