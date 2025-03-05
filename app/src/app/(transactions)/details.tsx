import React from 'react';
import {
	FlatList,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { TransactionProps } from '@/types';
import { useTheme } from '@/context/ThemeProvider';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import isEmoji from '@/utils/isEmoji';
import { useDataContext } from '@/context/DataProvider';
import { useToast } from 'react-native-toast-notifications';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import BackButton from '@/components/navigation/BackButton';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function TransactionDetails() {
	const { deleteTransaction } = useDataContext();
	const { theme } = useTheme();
	const toast = useToast();
	const navigation = useNavigation();
	const colorScheme = useColorScheme();

	/**
	 * @desc get item from local search params
	 */
	const { transaction } = useLocalSearchParams();
	const item: TransactionProps =
		typeof transaction === 'string' ? JSON.parse(transaction) : null;

	const transactionDetails = [
		{ label: 'Amount', value: item.amount },
		{ label: 'Date', value: item.date },
		{ label: 'Transaction Fee', value: item.transactionFee },
		{ label: 'Description', value: item.description },
		{ label: 'Transaction Type', value: item.type },
		{ label: 'Transaction Category', value: item.category.name },
	];

	const handleOnDelete = (id: string) => {
		deleteTransaction(id);
		router.push('/(tabs)');
		toast.show('Transaction deleted successfully', {
			type: 'success',
		});
	};

	const handleOnEdit = (item: TransactionProps) => {
		router.push({
			pathname: '/(transactions)/edit',
			params: { transaction: JSON.stringify(item) },
		});
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title:
				transactionDetails.length > 30
					? item.title.slice(0, 30) + ' Transaction Details...'
					: item.title + ' Transaction Details',
			headerShown: true,
			headerTitleAlign: 'left',
			headerStyle: {
				backgroundColor: Colors[colorScheme].header,
			},
			headerTitleStyle: {
				color: Colors[colorScheme].customIcon,
				fontSize: 20,
				fontWeight: 'bold',
			},
			headerLeft: () => <BackButton containerStyles='mr-3' />,
		});
	}, [navigation, theme, colorScheme, item]);

	return (
		<ThemedSafeAreaView className='relative flex-1'>
			<FlatList
				data={transactionDetails}
				keyExtractor={(item, index) => index.toString()}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
				renderItem={({ item }) => (
					<View className='mb-2 relative px-2' style={{ width: width * 0.92 }}>
						<ThemedView lightColor='transparent' className='p-2 rounded-lg '>
							<ThemedText className='ml-2 font-pbold text-[15px]'>
								{item.label}
							</ThemedText>

							<ThemedText
								darkColor='#ccc'
								className='text-[14px] capitalize font-pregular ml-2'
							>
								{item.value}
							</ThemedText>
						</ThemedView>
					</View>
				)}
				ListHeaderComponent={() => (
					<View
						className='relative items-center justify-center p-1 pb-3 rounded-[18px] mt-10 mb-14'
						style={{
							borderColor: theme === 'light' ? '#f2f2f2' : '#1c1c1e',
						}}
					>
						{/* Title  */}
						<ThemedView
							darkColor='#1c1c1e'
							lightColor='#f2f2f2'
							className='absolute top-0 flex flex-col items-center rounded-full p-1 -mt-10 mb-8  '
						>
							<View
								className='flex items-center justify-center h-20 w-20 rounded-full p-2'
								style={{
									backgroundColor: item.iconColor ? item.iconColor : '#3030cc',
								}}
							>
								<Text className='text-5xl font-bold text-red-500'>
									{item.category.icon && isEmoji(item.category.icon)
										? item.category.icon
										: item.title.charAt(0)}
								</Text>
							</View>
						</ThemedView>
					</View>
				)}
			/>
			{/* action icons */}
			<ThemedView className='absolute bottom-0 gap-2 py-5 flex flex-row justify-between items-center px-4 w-full'>
				<TouchableOpacity
					onPress={() => handleOnEdit(item)}
					className='flex justify-between items-center px-4 py-3 w-1/2 p-2 bg-orange rounded-md'
				>
					<ThemedText
						style={{ fontSize: 16 }}
						className='text-[16px] font-pbold bg-orange'
					>
						Edit
					</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => handleOnDelete(item.id)}
					className='flex justify-between items-center px-4 py-3 w-1/2 p-2 rounded-md bg-red-400'
				>
					<Text className='text-white text-md font-pbold'>Delete</Text>
				</TouchableOpacity>
			</ThemedView>
		</ThemedSafeAreaView>
	);
}
