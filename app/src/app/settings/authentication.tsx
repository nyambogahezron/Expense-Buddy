import {
	View,
	Text,
	StyleSheet,
	Switch,
	Pressable,
	TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useThemeStore } from '@/store/theme';
import { useState } from 'react';
import { Lock, Fingerprint, KeyRound, ShieldCheck } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function AuthenticationScreen() {
	const { theme } = useThemeStore();
	const [authSettings, setAuthSettings] = useState({
		passwordAuth: true,
		biometricAuth: false,
		twoFactorAuth: false,
		appLock: false,
	});

	interface AuthSettings {
		passwordAuth: boolean;
		biometricAuth: boolean;
		twoFactorAuth: boolean;
		appLock: boolean;
	}

	const toggleSetting = (key: keyof AuthSettings): void => {
		setAuthSettings((prev: AuthSettings) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<Stack.Screen
				options={{
					title: 'Authentication',
					headerStyle: { backgroundColor: theme.colors.primary },
					headerTitleStyle: {
						color: theme.colors.text,
						fontFamily: 'Poppins-SemiBold',
						fontSize: 20,
					},
					headerTintColor: theme.colors.text,
					headerTitleAlign: 'center',
				}}
			/>

			<View style={styles.content}>
				<Animated.View
					entering={FadeInUp.delay(100).duration(400)}
					style={[styles.card, { backgroundColor: theme.colors.surface }]}
				>
					<View style={styles.cardHeader}>
						<View
							style={[
								styles.iconContainer,
								{ backgroundColor: theme.colors.primary + '20' },
							]}
						>
							<ShieldCheck size={24} color={theme.colors.primary} />
						</View>
						<Text style={[styles.cardTitle, { color: theme.colors.text }]}>
							Security Settings
						</Text>
					</View>

					<View style={styles.settingsList}>
						<View style={styles.settingItem}>
							<View style={styles.settingLabel}>
								<Lock size={20} color={theme.colors.text} />
								<Text
									style={[styles.settingText, { color: theme.colors.text }]}
								>
									Password Authentication
								</Text>
							</View>
							<Switch
								trackColor={{
									false: theme.colors.border,
									true: theme.colors.primary,
								}}
								thumbColor='#FFFFFF'
								ios_backgroundColor={theme.colors.border}
								onValueChange={() => toggleSetting('passwordAuth')}
								value={authSettings.passwordAuth}
							/>
						</View>

						<View
							style={[styles.divider, { backgroundColor: theme.colors.border }]}
						/>

						<View style={styles.settingItem}>
							<View style={styles.settingLabel}>
								<Fingerprint size={20} color={theme.colors.text} />
								<Text
									style={[styles.settingText, { color: theme.colors.text }]}
								>
									Biometric Authentication
								</Text>
							</View>
							<Switch
								trackColor={{
									false: theme.colors.border,
									true: theme.colors.primary,
								}}
								thumbColor='#FFFFFF'
								ios_backgroundColor={theme.colors.border}
								onValueChange={() => toggleSetting('biometricAuth')}
								value={authSettings.biometricAuth}
							/>
						</View>

						<View
							style={[styles.divider, { backgroundColor: theme.colors.border }]}
						/>

						<View style={styles.settingItem}>
							<View style={styles.settingLabel}>
								<KeyRound size={20} color={theme.colors.text} />
								<Text
									style={[styles.settingText, { color: theme.colors.text }]}
								>
									Two-Factor Authentication
								</Text>
							</View>
							<Switch
								trackColor={{
									false: theme.colors.border,
									true: theme.colors.primary,
								}}
								thumbColor='#FFFFFF'
								ios_backgroundColor={theme.colors.border}
								onValueChange={() => toggleSetting('twoFactorAuth')}
								value={authSettings.twoFactorAuth}
							/>
						</View>

						<View
							style={[styles.divider, { backgroundColor: theme.colors.border }]}
						/>

						<View style={styles.settingItem}>
							<View style={styles.settingLabel}>
								<Lock size={20} color={theme.colors.text} />
								<Text
									style={[styles.settingText, { color: theme.colors.text }]}
								>
									App Lock
								</Text>
							</View>
							<Switch
								trackColor={{
									false: theme.colors.border,
									true: theme.colors.primary,
								}}
								thumbColor='#FFFFFF'
								ios_backgroundColor={theme.colors.border}
								onValueChange={() => toggleSetting('appLock')}
								value={authSettings.appLock}
							/>
						</View>
					</View>
				</Animated.View>

				<Animated.View
					entering={FadeInUp.delay(200).duration(400)}
					style={[
						styles.card,
						{ backgroundColor: theme.colors.surface, marginTop: 16 },
					]}
				>
					<View style={styles.cardContent}>
						<Text
							style={[styles.infoText, { color: theme.colors.textSecondary }]}
						>
							Enable authentication methods to secure your account and protect
							your financial data. We recommend using at least two different
							authentication methods for maximum security.
						</Text>
					</View>
				</Animated.View>

				<Animated.View
					entering={FadeInUp.delay(300).duration(400)}
					style={styles.buttonContainer}
				>
					<Pressable
						style={({ pressed }) => [
							styles.button,
							{
								backgroundColor: theme.colors.primary,
								opacity: pressed ? 0.9 : 1,
							},
						]}
					>
						<Text style={styles.buttonText}>Save Changes</Text>
					</Pressable>
				</Animated.View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	card: {
		borderRadius: 12,
		overflow: 'hidden',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	cardHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		gap: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#E5E7EB',
	},
	iconContainer: {
		width: 44,
		height: 44,
		borderRadius: 22,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardTitle: {
		fontSize: 18,
		fontFamily: 'Poppins-Medium',
	},
	cardContent: {
		padding: 16,
	},
	settingsList: {
		padding: 16,
	},
	settingItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
	},
	settingLabel: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	settingText: {
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
	},
	divider: {
		height: 1,
		width: '100%',
		opacity: 0.6,
	},
	infoText: {
		fontSize: 14,
		fontFamily: 'Poppins-Regular',
		lineHeight: 20,
	},
	buttonContainer: {
		marginTop: 24,
		alignItems: 'center',
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 12,
		minWidth: 200,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	buttonText: {
		fontSize: 16,
		fontFamily: 'Poppins-SemiBold',
		color: '#FFFFFF',
	},
});
