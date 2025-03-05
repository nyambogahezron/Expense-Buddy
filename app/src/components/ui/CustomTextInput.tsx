import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ThemedText from '@/components/ui/Text';
import { useTheme } from '@/context/ThemeProvider';
import { CustomTextInputProps } from '@/types';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTextInput({
	title,
	onChangeText,
	placeholder,
	textInputStyle,
	containerStyle,
	inputContainerStyle,
	value,
	multiline,
	keyboardType = 'default',
	inputType = 'normal',
	passwordVisible,
	handleOnPress,
	isForConfirmation,
}: CustomTextInputProps) {
	const { theme } = useTheme();
	const styles = createStyles(theme);

	return (
		<View style={[styles.container, containerStyle]}>
			<ThemedText style={styles.title}>{title}</ThemedText>
			<View
				style={[
					styles.inputContainer,
					inputContainerStyle,
					{
						borderColor: Colors[useColorScheme('border')].border,
					},
				]}
			>
				{inputType === 'password' ? (
					<>
						<TextInput
							style={[styles.textInput, textInputStyle]}
							onChangeText={onChangeText}
							placeholder={placeholder}
							value={value}
							secureTextEntry={!passwordVisible}
							keyboardType={keyboardType}
							placeholderTextColor={theme === 'light' ? '#6B7280' : '#9CA3AF'}
						/>
						{!isForConfirmation && (
							<TouchableOpacity
								onPress={handleOnPress}
								className='absolute right-3 '
							>
								<Ionicons
									name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
									size={24}
									color={theme === 'light' ? '#000' : '#f3f4f6'}
								/>
							</TouchableOpacity>
						)}
					</>
				) : (
					<TextInput
						style={[styles.textInput, textInputStyle]}
						onChangeText={onChangeText}
						placeholder={placeholder}
						value={value}
						multiline={multiline}
						keyboardType={keyboardType}
						placeholderTextColor={theme === 'light' ? '#6B7280' : '#9CA3AF'}
					/>
				)}
			</View>
		</View>
	);
}

const createStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			marginBottom: 16,
		},
		title: {
			marginBottom: 5,
			color: theme === 'light' ? '#1F2937' : '#E5E7EB',
			fontWeight: 'bold',
			fontFamily: 'font-pbold',
		},
		inputContainer: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			borderWidth: 1,
			borderRadius: 10,
			paddingHorizontal: 10,
			paddingVertical: 7,
			backgroundColor: theme === 'light' ? '#e5e7eb' : '#1c1c1e',
		},
		textInput: {
			fontSize: 16,
			color: theme === 'light' ? '#1F2937' : '#E5E7EB',
		},
	});
