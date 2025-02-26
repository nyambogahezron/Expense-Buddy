import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TransactionCategoryProps } from '@/types';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/cards/TransactionCard';
import { TransactionProps } from '@/types';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import { useDataContext } from '@/context/DataProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import ThemedView from '@/components/ui/View';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import { MenuProvider } from 'react-native-popup-menu';

export default function CategoriesDetails() {
	const { theme } = useTheme();
	const { transactionsData } = useDataContext();
	const [categoriesDetails, setCategoriesDetails] = useState<
		TransactionProps[]
	>([]);
	const { item } = useLocalSearchParams();
	const category: TransactionCategoryProps =
		typeof item === 'string' ? JSON.parse(item) : null;
	const { id, name } = category;

	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const pageTitle = `${name} Category Transactions`;
	const viewTitle =
		pageTitle.length > 30 ? pageTitle.slice(0, 30) + '...' : pageTitle;

	useEffect(() => {
		const data = transactionsData.filter(
			(item: any) => item.category.id === id
		);
		setCategoriesDetails(data);
	}, [id, transactionsData]);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: viewTitle,
			headerShown: true,
			headerTitleAlign: 'left',
			headerStyle: {
				backgroundColor: Colors[colorScheme].background,
			},
			headerLeft: () => <BackButton containerStyles='mr-4 -ml-4 p-1' />,
			headerTitleStyle: {
				color: Colors[colorScheme].customIcon,
				fontSize: 17,
				fontWeight: 400,
			},
		});
	}, [navigation, name, colorScheme]);

	return (
		<MenuProvider>
			<ThemedSafeAreaView style={styles.safeAreaView}>
				<StatusBar
					style={theme === 'light' ? 'dark' : 'light'}
					backgroundColor={Colors[colorScheme].background}
				/>

				<ThemedView style={styles.themedView}>
					{/* category transactions */}
					<FlatList
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						data={categoriesDetails}
						renderItem={({ item }) => (
							<View style={styles.transactionCardContainer}>
								<TransactionCard item={item} />
							</View>
						)}
						keyExtractor={(item) => item.id.toString()}
						ListEmptyComponent={
							<EmptyListCard title={`No Transactions For ${name}`} />
						}
					/>
				</ThemedView>
			</ThemedSafeAreaView>
		</MenuProvider>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
	themedView: {
		marginTop: -8,
	},
	transactionCardContainer: {
		paddingHorizontal: 5,
	},
});
