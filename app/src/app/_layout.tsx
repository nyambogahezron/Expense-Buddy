import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	useFonts,
	Inter_400Regular,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useThemeStore } from '@/store/theme';

export default function RootLayout() {
	const { theme } = useThemeStore();

	const status_bar_style = theme.name === 'light' ? 'dark' : 'light';
	const status_bar_background =
		theme.name === 'dark' ? theme.colors.background : theme.colors.primary;
	useFrameworkReady();

	const [fontsLoaded] = useFonts({
		'Inter-Regular': Inter_400Regular,
		'Inter-SemiBold': Inter_600SemiBold,
		'Inter-Bold': Inter_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack
				screenOptions={{ headerShown: false }}
				initialRouteName='onboarding'
			>
				<Stack.Screen name='onboarding' options={{ headerShown: false }} />
				<Stack.Screen name='(auth)' options={{ headerShown: false }} />
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='budgets' options={{ headerShown: false }} />
				<Stack.Screen name='transactions' options={{ headerShown: false }} />
				<Stack.Screen name='categories' options={{ headerShown: false }} />
				<Stack.Screen name='shopping' options={{ headerShown: false }} />
				<Stack.Screen name='settings' options={{ headerShown: true }} />
				<Stack.Screen name='profile' options={{ headerShown: false }} />

				<Stack.Screen name='+not-found' />
			</Stack>
			<StatusBar
				style={status_bar_style}
				backgroundColor={status_bar_background}
			/>
		</GestureHandlerRootView>
	);
}
