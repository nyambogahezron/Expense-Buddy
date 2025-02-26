import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import Button from '@/components/ui/Button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import ThemedView from '@/components/ui/View';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import CustomTextInput from '@/components/Form/CustomTextInput';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { useDataContext } from '@/context/DataProvider';

export default function CreateCategory() {
	const [title, setTitle] = useState('');
	const [icon, setIcon] = useState('');
	const { theme } = useTheme();
	const { addCategory } = useDataContext();
	const [isLoading, setIsLoading] = useState(false);

	const handleOnSubmit = async () => {
		setIsLoading(true);
		if (title === '' || icon === '') {
			alert('Please fill all fields');
			setIsLoading(false);
			return;
		}

		const res = await addCategory({ name: title, icon });
		if (res) {
			setTitle('');
			setIcon('');
		}
		setIsLoading(false);
		alert('Category Created Successfully');
	};
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[useColorScheme('background')].background}
			/>
			<ThemedSafeAreaView style={styles.safeAreaView}>
				<Stack.Screen
					options={{
						title: 'Create Categories',
						headerShown: true,
						headerTitleAlign: 'center',
						headerStyle: {
							backgroundColor: Colors[useColorScheme('background')].background,
						},
						headerLeft: () => <BackButton />,
						headerTitleStyle: {
							color: Colors[useColorScheme('customIcon')].customIcon,
							fontSize: 20,
							fontWeight: 'bold',
						},
					}}
				/>
				<ScrollView style={styles.scrollView}>
					<ThemedView style={styles.themedView}>
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
							title={isLoading ? 'Creating...' : 'Create'}
							isLoading={isLoading}
							handleOpenPress={() => handleOnSubmit()}
							customStyles={styles.customButton}
							textStyles={styles.buttonText}
						/>
					</ThemedView>
				</ScrollView>
			</ThemedSafeAreaView>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	scrollView: {
		marginTop: '20%',
	},
	themedView: {
		paddingHorizontal: 16,
		marginVertical: 'auto',
		height: '100%',
	},
	customButton: {
		backgroundColor: Colors.orange,
		marginTop: 20,
	},
	buttonText: {
		color: 'white',
	},
});
