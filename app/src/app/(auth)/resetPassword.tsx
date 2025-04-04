import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import Button from '@/components/ui/Button';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import CustomTextInput from '@/components/ui/CustomTextInput';

export default function ResetPassword() {
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const { theme } = useTheme();

	const handleSubmission = () => {
		console.log('pass:', password);
	};

	return (
		<ThemedSafeAreaView style={styles.container}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={theme === 'light' ? '#f3f4f6' : '#070B11'}
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
						<ThemedText style={styles.title}> Reset Password</ThemedText>
						<ThemedText style={styles.description}>
							Change your password.
						</ThemedText>
					</ThemedView>
				</ThemedView>

				{/* Email Input */}
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
					placeholder='Confirm Password'
					isForConfirmation={true}
				/>

				<Button
					title='Reset Password'
					customStyles={styles.button}
					handleOpenPress={handleSubmission}
					textStyles={styles.buttonText}
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
		width: Dimensions.get('window').width * 0.93,
		height: Dimensions.get('window').height,
		marginVertical: 20,
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
