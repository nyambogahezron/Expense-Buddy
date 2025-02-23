import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/Form/CustomTextInput';
import AuthFooter from '@/components/Form/AuthFooter';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import Button from '@/components/ui/Button';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';

const { width, height } = Dimensions.get('window');
export default function ForgotPassword() {
	const [email, setEmail] = useState<string>('');
	const { theme } = useTheme();

	const handleSubmission = () => {
		console.log('Email:', email);
	};

	return (
		<ThemedSafeAreaView style={styles.container}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={theme === 'light' ? '#f3f4f6' : '#070B11'}
			/>
			<Stack.Screen options={{ headerShown: false }} />
			<ScrollView
				style={[styles.scrollView, { width: width * 0.93, height: height }]}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				{/* Logo and Title */}

				<ThemedView style={styles.headerContainer}>
					<ThemedView>
						<ThemedText style={styles.title}>Reset Password</ThemedText>
						<ThemedText style={styles.description}>
							Enter your email to reset your password.
						</ThemedText>
					</ThemedView>
				</ThemedView>

				{/* Email Input */}
				<CustomTextInput
					title=''
					onChangeText={(text) => setEmail(text)}
					placeholder='Enter Email'
					keyboardType='email-address'
				/>

				<Button
					title='Send Code '
					customStyles={styles.button}
					handleOpenPress={handleSubmission}
					textStyles={styles.buttonText}
				/>

				{/* Signup Option */}
				<AuthFooter
					title={`Remember password? `}
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
		paddingHorizontal: 12,
		width: '100%',
		justifyContent: 'center',
		height: '100%',
		alignItems: 'center',
	},
	scrollView: {
		marginVertical: 80,
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
