import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import Button from '@/components/ui/Button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import CustomTextInput from '@/components/ui/CustomTextInput';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import ThemedView from '@/components/ui/View';
import useColorScheme from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useDataContext } from '@/context/DataProvider';
import { TransactionCategoryProps } from '@/types';

export default function EditCategory() {
	// get item from params
	const { item } = useLocalSearchParams();
	const category: TransactionCategoryProps =
		typeof item === 'string' ? JSON.parse(item) : null;
	const { id, name, icon } = category;

	// state
	const [title, setTitle] = useState(name || '');
	const [itemIcon, setIcon] = useState(icon || '');
	const [isLoading, setIsLoading] = useState(false);

	const { theme } = useTheme();
	const { updateCategory } = useDataContext();

	const handleOnSubmit = () => {
		setIsLoading(true);

		//unchanged
		if (title === name && icon === itemIcon) {
			alert('No Changes Made');
			setIsLoading(false);
			return;
		}

		if (title === '' || icon === '') {
			alert('Please fill all fields');
			setIsLoading(false);
			return;
		}

		updateCategory({ id, name: title, icon });
		setIsLoading(false);
	};
	return (
		<GestureHandlerRootView style={styles.flex1}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[useColorScheme('background')].background}
			/>
			<ThemedSafeAreaView style={styles.flex1Full}>
				<Stack.Screen
					options={{
						title: 'Edit Categories',
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
							value={itemIcon}
							placeholder='Choose Emoji For Icon'
						/>

						<Button
							isLoading={isLoading}
							title={isLoading ? 'Saving...' : 'Update Category'}
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
		backgroundColor: Colors.orange,
		marginTop: 20,
	},
	textWhite: {
		color: 'white',
	},
});
