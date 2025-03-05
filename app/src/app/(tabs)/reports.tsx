import React, { useState } from 'react';
import {
	View,
	ScrollView,
	Dimensions,
	StyleSheet,
	Platform,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TransactionProps } from '@/types';
import LoadMoreBtn from '@/components/ui/LoadMoreBtn';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { useDataContext } from '@/context/DataProvider';
import TransactionCard from '@/components/cards/TransactionCard';
import SummaryChart from '@/components/Charts/SummaryOverview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import ExpenseBlockCard from '@/components/ExpenseBlockCard';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

const width = Dimensions.get('window').width;

export default function Statistics() {
	const { theme } = useTheme();
	const { transactionsData } = useDataContext();

	const [activeCategory, setActiveCategory] = useState<'income' | 'expense'>(
		'income'
	);

	return (
		<ThemedSafeAreaView style={styles.safeArea}>
			<StatusBar
				style={theme === 'light' ? 'dark' : 'light'}
				backgroundColor={Colors[useColorScheme('background')].background}
			/>

			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
			>
				<ThemedView style={styles.expenseBlockContainer}>
					<View style={styles.expenseBlockInnerContainer}>
						<ExpenseBlockCard />
					</View>
				</ThemedView>
				<ThemedView style={styles.mainContainer}>
					<View style={styles.chartContainer}>
						{/* Bar Chart */}
						<SummaryChart />
					</View>

					<View>
						{/* Income and Expenses Tabs */}
						<ThemedView style={styles.segmentedControlContainer}>
							<SegmentedControl
								values={['Income', 'Expense']}
								style={styles.segmentedControl}
								backgroundColor='#f97316'
								tintColor='#000'
								selectedIndex={activeCategory === 'income' ? 0 : 1}
								onChange={(event) => {
									const index = event.nativeEvent.selectedSegmentIndex;
									setActiveCategory(index === 0 ? 'income' : 'expense');
								}}
							/>
						</ThemedView>

						<ThemedView style={styles.topFiveContainer}>
							<ThemedText style={styles.topFiveText}>
								Top Five {activeCategory}
							</ThemedText>
						</ThemedView>

						{/* Expense Detail */}
						{transactionsData &&
							transactionsData
								.filter(
									(transaction: TransactionProps) =>
										transaction.type === activeCategory
								)
								.sort((a: any, b: any) => Number(b.amount) - Number(a.amount))
								.slice(0, 5)
								.map((item: any, index: number) => {
									return <TransactionCard item={item} key={index} />;
								})}

						<LoadMoreBtn
							title='View All'
							handleOnPress={() => router.push('/(tabs)/transactions')}
						/>
					</View>
				</ThemedView>
			</ScrollView>
		</ThemedSafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	scrollView: {
		marginTop: Platform.OS === 'android' ? -35 : 0,
	},
	mainContainer: {
		paddingHorizontal: 12,
		marginBottom: 80,
	},

	chartContainer: {
		marginTop: 16,
		alignItems: 'center',
		padding: 8,
		width: width * 0.95,
	},
	segmentedControlContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 24,
		marginBottom: 8,
	},
	segmentedControl: {
		width: width * 0.95,
		height: 40,
		borderRadius: 10,
		padding: 10,
	},
	topFiveContainer: {
		marginVertical: 8,
		marginLeft: 8,
	},
	topFiveText: {
		fontSize: 14,
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	expenseBlockContainer: {
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
	},
	expenseBlockInnerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
		width: width * 0.9,
	},
});
