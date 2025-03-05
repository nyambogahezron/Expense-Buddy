import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import CustomTextInput from '@/components/ui/CustomTextInput';
import AuthFooter from '@/components/AuthFooter';
import Button from '@/components/ui/Button';
import { supabase } from '@/utils/supabase';
import { useToast } from 'react-native-toast-notifications';
import defaultCategories from '@/data/defaultCategories';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';

export default function Login() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const { theme } = useTheme();
	const toast = useToast();

	const defaultCategoriesData = defaultCategories;

	async function signUpWithUser() {
		if (!email || !password || !username || !confirmPassword)
			return toast.show('Input all fields', { type: 'danger' });

		if (password !== confirmPassword)
			return toast.show('Passwords do not match', { type: 'danger' });

		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					name: username,
					email: email,
				},
			},
		});
		if (session) {
			// insert default categories
			const { error } = await supabase
				.from('categories')
				.insert([defaultCategoriesData]);
			if (error) {
				console.log('Error inserting default:', error);
			}
		}
		if (error) Alert.alert('Something went wrong, please try again!');

		setLoading(false);
	}

	return (
		<ThemedSafeAreaView style={styles.container}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={theme === 'light' ? '#f3f4f6' : '#070B11'}
			/>
			<Stack.Screen options={{ headerShown: false }} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{/* Logo and Title */}
				<ThemedView style={styles.headerContainer}>
					<ThemedView>
						<ThemedText style={styles.title}>Register</ThemedText>
						<ThemedText style={styles.description}>
							Create Account To Get Started
						</ThemedText>
					</ThemedView>
				</ThemedView>
				<CustomTextInput
					title='Username'
					onChangeText={(text) => setUsername(text)}
					placeholder='Enter Username'
				/>
				<CustomTextInput
					title='Email'
					onChangeText={(text) => setEmail(text)}
					placeholder='Enter Email'
					keyboardType='email-address'
				/>

				<CustomTextInput
					inputType='password'
					title='Password'
					onChangeText={(text) => setPassword(text)}
					placeholder='Enter Password'
					passwordVisible={passwordVisible}
					handleOnPress={() => setPasswordVisible(!passwordVisible)}
				/>
				<CustomTextInput
					inputType='password'
					title='Confirm Password'
					onChangeText={(text) => setConfirmPassword(text)}
					passwordVisible={passwordVisible}
					handleOnPress={() => setPasswordVisible(!passwordVisible)}
					isForConfirmation={true}
				/>

				<Button
					isLoading={loading}
					title={loading ? 'Loading...' : 'Register'}
					customStyles={styles.registerButton}
					handleOpenPress={signUpWithUser}
					textStyles={styles.registerButtonText}
				/>

				{/* SignUp Option */}
				<AuthFooter
					title={`Already Have An Account ?`}
					handleOnPress={() => router.push('/(auth)/login')}
					buttonText='Signin'
				/>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		width: '100%',
		justifyContent: 'center',
	},
	registerButton: {
		marginTop: 10,
		backgroundColor: '#1D4ED8',
	},
	registerButtonText: {
		color: '#FFFFFF',
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
