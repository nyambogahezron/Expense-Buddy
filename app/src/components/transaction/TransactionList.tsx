import React, { useCallback } from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import TransactionItem from './TransactionItem';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Transaction } from '@/types';
import { formatDate } from '@/utils/helpers';

interface TransactionListProps {
	transactions: Transaction[];
	onTransactionPress: (id: string) => void;
}

export default function TransactionList({
	transactions,
	onTransactionPress,
}: TransactionListProps) {
	// Group transactions by date
	const groupedTransactions = React.useMemo(() => {
		const groups: { [key: string]: Transaction[] } = {};

		transactions.forEach((transaction) => {
			const date = new Date(transaction.date);
			const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

			if (!groups[dateStr]) {
				groups[dateStr] = [];
			}

			groups[dateStr].push(transaction);
		});

		// Convert to section list data format
		return Object.keys(groups)
			.map((date) => ({
				title: date,
				data: groups[date],
			}))
			.sort(
				(a, b) => new Date(b.title).getTime() - new Date(a.title).getTime()
			);
	}, [transactions]);

	const renderSectionHeader = useCallback(
		({ section: { title } }: { section: { title: string } }) => {
			return (
				<Animated.View
					style={styles.sectionHeader}
					entering={FadeInDown.delay(100).springify()}
				>
					<Text style={styles.sectionHeaderText}>{formatDate(title)}</Text>
				</Animated.View>
			);
		},
		[]
	);

	const renderItem = useCallback(
		({ item, index }: { item: Transaction; index: number }) => {
			return (
				<Animated.View
					entering={FadeInDown.delay(150 + index * 50).springify()}
					layout={Layout.springify()}
				>
					<TransactionItem transaction={item} />
				</Animated.View>
			);
		},
		[onTransactionPress]
	);

	return (
		<View style={styles.container}>
			<SectionList
				scrollEnabled={false}
				sections={groupedTransactions}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				renderSectionHeader={renderSectionHeader}
				stickySectionHeadersEnabled={false}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				initialNumToRender={10}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	sectionHeader: {
		paddingVertical: 8,
		marginVertical: 8,
		borderRadius: 8,
	},
	sectionHeaderText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
		paddingHorizontal: 10,
	},
	separator: {
		height: 8,
	},
});
