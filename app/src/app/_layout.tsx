import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@/context/ThemeProvider';
import GlobalProvider, { useGlobalContext } from '@/context/GlobalProvider';
import DataProvider from '@/context/DataProvider';
import LockScreen from '../components/PinLockScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastProviderContext from '@/context/ToastProvider';
import './global.css';

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
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

  const { isUnlocked,  session } = useGlobalContext();

  useEffect(() => {
    if (error) throw error;
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) return null;

  if (!isUnlocked && session) {
    return <LockScreen />;
  }

  return (
    <GestureHandlerRootView>
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
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalProvider>
        <DataProvider>
          <RootLayoutContent />
        </DataProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}
