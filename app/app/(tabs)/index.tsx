import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import { AnimatedHeader } from '@/components/AnimatedHeader';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TransactionCategory } from '@/types/transaction';
import { RefreshControl } from 'react-native';
import { useThemeStore } from '@/store/theme';
import { useTransactions } from '@/hooks/useTransactions';
import EmptyState from '@/components/EmptyState';
import TransactionList from '@/components/transaction/TransactionList';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

export default function TransactionsScreen() {
	const scrollY = useSharedValue(0);
	const [selectedCategory, setSelectedCategory] =
		useState<TransactionCategory | null>(null);
	const { theme } = useThemeStore();

	const {
		transactions,
		loading,
		error,
		refreshing,
		onRefresh,
		getTransactionSummary,
	} = useTransactions();
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true);
		await onRefresh();
		setIsRefreshing(false);
	}, [onRefresh]);

	const filteredTransactions = selectedCategory
		? transactions.filter((t) => t.category === selectedCategory)
		: transactions;

	const summary = getTransactionSummary();

	if (loading && !isRefreshing) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState message={error} onRetry={onRefresh} />;
	}

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<AnimatedHeader scrollY={scrollY} balance={summary.balance} />
			<Animated.ScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				contentContainerStyle={{ paddingBottom: 20 }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			>
				<CategoryFilter
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
				/>

				{transactions.length === 0 ? (
					<EmptyState message='No transactions found' />
				) : (
					<TransactionList
						transactions={filteredTransactions}
						onTransactionPress={(id) => {
							// Handle transaction press
						}}
					/>
				)}
			</Animated.ScrollView>
		</View>
	);
}
