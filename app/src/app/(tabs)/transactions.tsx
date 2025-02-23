import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Platform,
	StyleSheet,
	View,
	Modal,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import { useDataContext } from '@/context/DataProvider';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/cards/TransactionCard';
import Fab from '@/components/ui/Fab';
import { router, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ThemedText from '@/components/ui/Text';
import ThemedView from '@/components/ui/View';
import { TransactionProps } from '@/types';

const { width, height } = Dimensions.get('window');

export default function Transactions() {
	const { transactionsData } = useDataContext();
	const { theme } = useTheme();
	const colorScheme = useColorScheme();
	const [modalVisible, setModalVisible] = useState(false);
	const [isFiltered, setIsFiltered] = useState(false);
	const [distinctCategories, setDistinctCategories] = useState<string[]>([]);
	const [filterOptions, setFilterOptions] = useState({
		transactionsType: 'all',
		category: 'all',
	});
	const [filteredTransactions, setFilteredTransactions] = useState<
		TransactionProps[]
	>([]);

	const openFilterModal = () => {
		setModalVisible(true);
	};

	const closeFilterModal = () => {
		setModalVisible(false);
	};

	type transactionType = 'all' | 'income' | 'expense';

	const handleToggleTranType = (type: transactionType) => {
		setFilterOptions({ ...filterOptions, transactionsType: type });
	};

	const handleToggleCategory = (category: string) => {
		setFilterOptions({ ...filterOptions, category });
	};

	const filterTransactions = () => {
		let filteredData = transactionsData;

		if (filterOptions.transactionsType !== 'all') {
			filteredData = filteredData.filter(
				(item: TransactionProps) => item.type === filterOptions.transactionsType
			);
		}

		if (filterOptions.category !== 'all') {
			filteredData = filteredData.filter(
				(item: TransactionProps) =>
					item.category.name === filterOptions.category
			);
		}

		setFilteredTransactions(filteredData);
	};

	useEffect(() => {
		setFilteredTransactions(transactionsData);

		const getDistinctCategories = () => {
			const categories =
				transactionsData &&
				transactionsData.map(
					(item: TransactionProps) => item.category.name || 'unknown'
				);
			const data: string[] = [...new Set(categories as string[])];
			setDistinctCategories(['all', ...data]);
		};

		getDistinctCategories();
	}, [transactionsData]);

	useEffect(() => {
		filterTransactions();

		if (
			filterOptions.transactionsType !== 'all' ||
			filterOptions.category !== 'all'
		) {
			setIsFiltered(true);
		} else {
			setIsFiltered(false);
		}
	}, [filterOptions]);

	return (
		<ThemedSafeAreaView style={styles.safeArea}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[colorScheme].background}
			/>

			<Stack.Screen
				options={{
					headerRight: () => (
						<TouchableOpacity
							onPress={
								isFiltered
									? () =>
											setFilterOptions({
												transactionsType: 'all',
												category: 'all',
											})
									: openFilterModal
							}
							style={{ marginRight: 15 }}
						>
							{isFiltered ? (
								<AntDesign name='close' size={24} color={'orange'} />
							) : (
								<Ionicons
									name='filter'
									size={24}
									color={Colors[colorScheme].customIcon}
								/>
							)}
						</TouchableOpacity>
					),
					headerTitleStyle: {
						color: Colors[colorScheme].customIcon,
						fontSize: 20,
						fontWeight: 'bold',
					},
				}}
			/>

			<View style={styles.container}>
				<FlatList
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					data={filteredTransactions.slice(0, 50) || []}
					keyExtractor={(item: TransactionProps) => item.id.toString()}
					renderItem={({ item }) => <TransactionCard item={item} />}
					ListEmptyComponent={
						<EmptyListCard title='No transactions available' />
					}
				/>
			</View>
			<Fab onPress={() => router.push('/(transactions)/create')} />

			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeFilterModal}
			>
				<ThemedView style={styles.modalView}>
					<TouchableOpacity
						onPress={closeFilterModal}
						className='flex flex-col gap-5 p-2 w-full h-full'
					>
						<TouchableOpacity
							style={{ position: 'absolute', top: 10, right: 10 }}
						>
							<Ionicons name='close' size={28} color='black' />
						</TouchableOpacity>

						<ThemedText style={styles.modalText}>Filter Options</ThemedText>
						<ScrollView className='flex-1'>
							<ThemedText className='mt-4 mb-2'>Transaction Type</ThemedText>
							<View className='flex flex-row flex-wrap gap-2'>
								{['all', 'income', 'expense'].map((type) => (
									<TouchableOpacity
										key={type}
										onPress={() =>
											handleToggleTranType(type as transactionType)
										}
										className={`flex items-center justify-center rounded-lg h-10 border-2 border-gray-300 px-8 ${
											filterOptions.transactionsType === type
												? 'bg-gray-300 border-orange-500'
												: 'bg-white'
										}`}
									>
										<ThemedText
											type='link'
											className={`capitalize ${
												filterOptions.transactionsType === type
													? 'text-red-500'
													: 'text-gray-500'
											}`}
										>
											{type}
										</ThemedText>
									</TouchableOpacity>
								))}
							</View>

							<ThemedText className='mt-4 mb-2'>Category</ThemedText>
							<View className='flex flex-row flex-wrap gap-2'>
								{distinctCategories.map((item, index: number) => (
									<TouchableOpacity
										key={index}
										onPress={() => handleToggleCategory(item)}
										className={`flex items-center justify-center rounded-lg h-10 border-2 border-gray-300 px-8 ${
											filterOptions.category === item
												? 'bg-gray-300 border-orange-500'
												: 'bg-white'
										}`}
									>
										<ThemedText
											type='link'
											className={`capitalize ${
												filterOptions.category === item
													? 'text-red-500'
													: 'text-gray-500'
											}`}
										>
											{item}
										</ThemedText>
									</TouchableOpacity>
								))}
							</View>
						</ScrollView>
					</TouchableOpacity>
				</ThemedView>
			</Modal>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		// paddingHorizontal: 8,
		paddingBottom: 20,
	},
	container: {
		marginTop: Platform.select({ android: -35, default: 0 }),
	},
	modalView: {
		position: 'absolute',
		bottom: 0,
		justifyContent: 'center',
		height: height * 0.6,
		width: width,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderWidth: 0.4,
		borderColor: '#ccc',
		alignItems: 'center',
		marginTop: 22,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		top: 10,
		marginBottom: 1,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
	},
	closeButton: {
		marginTop: 15,
		color: 'blue',
	},
});
