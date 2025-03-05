import { View, ScrollView, Alert } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import CustomTextInput from '@/components/ui/CustomTextInput';
import BackButton from '@/components/navigation/BackButton';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { supabase } from '@/utils/supabase';
import ThemedText from '@/components/ui/Text';
import Button from '@/components/ui/Button';

export default function AccountInfo() {
	const { User } = useGlobalContext();
	const [email, setEmail] = React.useState(User?.email);
	const [name, setName] = React.useState(User?.name);
	const navigation = useNavigation();
	const { theme } = useTheme();
	const colorScheme = useColorScheme();
	const [isLoading, setIsLoading] = React.useState(false);
	const [currentPassword, setCurrentPassword] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	async function updateUser(userData: any) {
		try {
			setIsLoading(true);

			const { data, error } = await supabase.auth.updateUser({
				email: userData.email,
			});

			if (!error) {
				Alert.alert('Update Data', 'Data was updated Successful');
			}

			if (error) {
				Alert.alert('Error', error.message);
			}
			setIsLoading(false);
		} catch (error) {
			console.log('error updating user', error);
		}
	}

	// form submission handler
	const HandleSubmit = () => {
		//check is data is unchanged
		if (email === User?.email && name === User?.name) {
			return Alert.alert('No changes made', 'Please make changes to submit');
		}

		updateUser({ email, name });
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Account Info',
			headerShown: true,
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: Colors[colorScheme].background,
			},
			headerLeft: () => <BackButton />,
			headerTitleStyle: {
				color: Colors[colorScheme].customIcon,
				fontSize: 20,
				fontWeight: 'bold',
			},
		});
	}, [navigation, colorScheme]);

	return (
		<ThemedSafeAreaView className='flex flex-1'>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[colorScheme].background}
			/>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				className='mb-5 px-2 pb-5'
			>
				{/* account info  */}
				<View className='flex flex-col px-3'>
					<ThemedText className='pb-4'> Personal Info</ThemedText>
					<CustomTextInput
						title='Email'
						onChangeText={(text) => setEmail(text)}
						keyboardType='email-address'
						value={email}
					/>
					<CustomTextInput
						title='Name'
						onChangeText={(text) => setName(text)}
						value={name}
					/>

					<Button
						title='Edit'
						customStyles={{ marginTop: 20 }}
						textStyles={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}
						handleOpenPress={() => HandleSubmit()}
					/>
				</View>

				{/* change password */}

				<View className='flex flex-col px-3 mt-10'>
					<ThemedText className='pb-4'> Change Password</ThemedText>
					<CustomTextInput
						title='Current Password'
						onChangeText={(text) => setCurrentPassword(text)}
						value={currentPassword}
					/>
					<CustomTextInput
						title='New Password'
						onChangeText={(text) => setNewPassword(text)}
						value={newPassword}
					/>
					<CustomTextInput
						title='Confirm Password'
						onChangeText={(text) => setConfirmPassword(text)}
						value={confirmPassword}
					/>

					<Button
						title='Change Password'
						customStyles={{ marginTop: 20 }}
						textStyles={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}
						handleOpenPress={() => HandleSubmit()}
					/>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}
