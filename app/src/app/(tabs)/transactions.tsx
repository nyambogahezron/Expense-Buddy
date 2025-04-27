import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
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
import { Plus, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTransactionStore } from '@/store/transactions';
import { TransactionFilters } from '@/components/TransactionFilters';

export default function TransactionsScreen() {
	const { searchQuery, sortOrder, setSearchQuery, setSortOrder } =
		useTransactionStore();
	const scrollY = useSharedValue(0);
	const [selectedCategory, setSelectedCategory] =
		useState<TransactionCategory | null>(null);

	const [showSearch, setShowSearch] = useState(false);
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
				<View style={styles.toolbar}>
					{showSearch ? (
						<View
							style={[
								styles.searchContainer,
								{
									backgroundColor: theme.colors.surface,
									borderColor: theme.colors.border,
								},
							]}
						>
							<Search size={20} color={theme.colors.textSecondary} />
							<TextInput
								placeholder='Search transactions...'
								value={searchQuery}
								onChangeText={setSearchQuery}
								style={[styles.searchInput, { color: theme.colors.text }]}
								placeholderTextColor={theme.colors.textSecondary}
								autoFocus
							/>
						</View>
					) : (
						<Pressable
							onPress={() => setShowSearch(true)}
							style={[
								styles.searchButton,
								{ backgroundColor: theme.colors.surface },
							]}
						>
							<Search size={20} color={theme.colors.text} />
						</Pressable>
					)}
					<Pressable
						onPress={() => router.push('/transactions/new')}
						style={[
							styles.addButton,
							{ backgroundColor: theme.colors.primary },
						]}
					>
						<Plus size={24} color='#FFFFFF' />
					</Pressable>
				</View>

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	toolbar: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		gap: 12,
	},
	searchButton: {
		padding: 12,
		borderRadius: 12,
	},
	searchContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		gap: 12,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	addButton: {
		width: 48,
		height: 48,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	transactionsList: {
		padding: 20,
	},
});
