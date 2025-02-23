import { View, ScrollView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import CustomTextInput from '@/components/Form/CustomTextInput';
import BackButton from '@/components/navigation/BackButton';
import { useGlobalContext } from '@/context/GlobalProvider';
import CustomButton from '@/components/CustomButton';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function AccountInfo() {
	const { User } = useGlobalContext();
	const [email, setEmail] = React.useState(User?.email);
	const [name, setName] = React.useState(User?.name);
	const navigation = useNavigation();
	const { theme } = useTheme();

	// form submission handler
	const HandleSubmit = () => {
		console.log(email, name);
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Account Info',
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
		});
	}, []);

	return (
		<ThemedSafeAreaView className='flex flex-1'>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[useColorScheme('background')].background}
			/>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				className='mb-5 px-2'
			>
				{/* account info  */}
				<View className='flex flex-col px-3'>
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

					<CustomButton
						title='Edit'
						customStyles='bg-orange-600'
						textStyles='text-white text-lg font-bold'
						handleOpenPress={() => HandleSubmit()}
					/>
				</View>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}
