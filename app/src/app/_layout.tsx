import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useThemeStore } from '@/store/theme';
import { useAppLock } from '@/hooks/useAppLock';
import LockScreen from '@/components/LockScreen';
import AppOverlay from '@/components/AppOverlay';
import { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import * as SystemUI from 'expo-system-ui';

SystemUI.setBackgroundColorAsync('transparent');

export default function RootLayout() {
	const { theme } = useThemeStore();
	const { isLocked, showOverlay, unlock, showAppOverlay, hideAppOverlay } =
		useAppLock();
	const [appState, setAppState] = useState(AppState.currentState);

	const [fontsLoaded] = useFonts({
		'Inter-Regular': Inter_400Regular,
		'Inter-Medium': Inter_500Medium,
		'Inter-SemiBold': Inter_600SemiBold,
		'Inter-Bold': Inter_700Bold,
	});

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			if (appState.match(/inactive|background/) && nextAppState === 'active') {
				// App has come to the foreground
				hideAppOverlay();
			} else if (nextAppState.match(/inactive|background/)) {
				// App has gone to the background
				showAppOverlay();
			}
			setAppState(nextAppState);
		});

		return () => {
			subscription.remove();
		};
	}, [appState, hideAppOverlay, showAppOverlay]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: '#111827' }}>
			<Stack
				screenOptions={{
					headerShown: false,
					statusBarStyle:
						theme.name.toLocaleLowerCase() === 'light' ? 'dark' : 'light',
					statusBarBackgroundColor: theme.colors.primary,
				}}
				initialRouteName='onboarding'
			>
				<Stack.Screen name='onboarding' options={{ headerShown: false }} />
				<Stack.Screen name='(auth)' options={{ headerShown: false }} />
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='budgets' options={{ headerShown: false }} />
				<Stack.Screen name='transactions' options={{ headerShown: false }} />
				<Stack.Screen name='categories' options={{ headerShown: false }} />
				<Stack.Screen
					name='shopping'
					options={{ headerShown: false, animation: 'slide_from_right' }}
				/>
				<Stack.Screen
					name='settings'
					options={{ headerShown: true, animation: 'slide_from_right' }}
				/>
				<Stack.Screen
					name='profile'
					options={{ headerShown: true, animation: 'slide_from_right' }}
				/>
				<Stack.Screen
					name='settings/authentication'
					options={{
						title: 'Authentication',
						headerShown: true,
					}}
				/>

				<Stack.Screen name='+not-found' />
			</Stack>
			<LockScreen visible={isLocked} onUnlock={unlock} />
			<AppOverlay visible={showOverlay} />
		</GestureHandlerRootView>
	);
}
