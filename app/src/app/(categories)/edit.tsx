import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import Button from '@/components/ui/Button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import CustomTextInput from '@/components/Form/CustomTextInput';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import ThemedView from '@/components/ui/View';

export default function EditCategory() {
	const [title, setTitle] = useState('');
	const [icon, setIcon] = useState('');
	const { theme } = useTheme();

	const handleOnSubmit = () => {
		console.log('Submitted: ', title, icon);
	};
	return (
		<GestureHandlerRootView style={styles.flex1}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
			/>
			<ThemedSafeAreaView style={styles.flex1Full}>
				<Stack.Screen
					options={{
						title: 'Edit Categories',
						headerShown: true,
						headerTitleAlign: 'center',
						headerStyle: {
							backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
						},
						headerLeft: () => <BackButton />,
						headerTitleStyle: {
							color: theme === 'light' ? '#333' : '#fff',
							fontSize: 20,
							fontWeight: 'bold',
						},
					}}
				/>
				<ScrollView style={styles.marginTop20}>
					<ThemedView style={styles.paddingX4}>
						{/* Title */}

						<CustomTextInput
							title='Title'
							onChangeText={setTitle}
							value={title}
							placeholder='Enter Title'
						/>
						{/* Icon */}
						<CustomTextInput
							title='Icon'
							onChangeText={setIcon}
							value={icon}
							placeholder='Choose Emoji For Icon'
						/>

						<Button
							title='Edit'
							handleOpenPress={() => handleOnSubmit()}
							customStyles={styles.bgOrange500}
							textStyles={styles.textWhite}
						/>
					</ThemedView>
				</ScrollView>
			</ThemedSafeAreaView>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	flex1: {
		flex: 1,
	},
	flex1Full: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	marginTop20: {
		marginTop: '20%',
	},
	paddingX4: {
		paddingHorizontal: 16,
		marginVertical: 'auto',
		height: '100%',
	},
	bgOrange500: {
		backgroundColor: '#F97316',
		marginTop: 20,
	},
	textWhite: {
		color: '#FFFFFF',
	},
});
