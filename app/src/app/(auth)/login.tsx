import React, { useState } from 'react';
import {
	Text,
	TouchableOpacity,
	ScrollView,
	Alert,
	StyleSheet,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import CustomTextInput from '@/components/Form/CustomTextInput';
import CustomPasswordInput from '@/components/Form/CustomPasswordInput';
import AuthFooter from '@/components/Form/AuthFooter';
import Button from '@/components/ui/Button';
import { supabase } from '@/utils/supabase';
import { useToast } from 'react-native-toast-notifications';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';

export default function Login() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const { theme } = useTheme();
	const toast = useToast();

	async function signInWithUser() {
		if (!email || !password)
			return toast.show('Input all fields', { type: 'danger' });

		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	return (
		<ThemedSafeAreaView style={styles.container}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor='transparent'
			/>
			<Stack.Screen options={{ headerShown: false }} />
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{/* Logo and Title */}
				<ThemedView style={styles.headerContainer}>
					<ThemedView>
						<Text style={styles.title}>Login</Text>
						<ThemedText style={styles.description}>
							Welcome Back, Login Now
						</ThemedText>
					</ThemedView>
				</ThemedView>

				<CustomTextInput
					title='Email'
					onChangeText={(text) => setEmail(text)}
					placeholder='Enter Email'
					keyboardType='email-address'
				/>

				<CustomPasswordInput
					title='Password'
					onChangeText={(text) => setPassword(text)}
					placeholder='Enter Password'
					passwordVisible={passwordVisible}
					handleOnPress={() => setPasswordVisible(!passwordVisible)}
				/>

				{/* Forgot Password */}
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => router.push('/(auth)/forgotPassword')}
					className='mb-8'
				>
					<Text className='text-blue-600 text-right'>Forget password?</Text>
				</TouchableOpacity>

				{/* Login Button */}
				<Button
					isLoading={loading}
					title={loading ? 'Loading...' : 'Login'}
					customStyles={styles.button}
					handleOpenPress={signInWithUser}
					textStyles={styles.buttonText}
				/>
				{/* Signup Option */}
				<AuthFooter
					title={`Don't Have An Account ?`}
					handleOnPress={() => router.push('/(auth)/register')}
					buttonText='Signup'
				/>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 12,
		width: '100%',
		justifyContent: 'center',
	},
	scrollView: {
		marginVertical: 20,
		paddingHorizontal: 10,
	},
	button: {
		backgroundColor: '#2563eb',
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: 'bold',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 40,
	},
	title: {
		fontSize: 40,
		fontWeight: '800',
		marginVertical: 10,
		color: '#1e3a8a',
	},
	description: {
		fontSize: 20,
		fontWeight: '600',
	},
});
