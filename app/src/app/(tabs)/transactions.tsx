import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
	FadeIn,
	FadeOut,
	SlideInDown,
	SlideOutDown,
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
import { Plus, Filter, ArrowDownUp } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTransactionStore } from '@/store/transactions';

export default function TransactionsScreen() {
	const { searchQuery, sortOrder, setSearchQuery, setSortOrder } =
		useTransactionStore();
	const scrollY = useSharedValue(0);
	const [selectedCategory, setSelectedCategory] =
		useState<TransactionCategory | null>(null);

	const [showSearch, setShowSearch] = useState(false);
	const { theme } = useThemeStore();
	const [showFabMenu, setShowFabMenu] = useState(false);

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

	const toggleFabMenu = () => {
		setShowFabMenu(!showFabMenu);
	};

	const handleCreateTransaction = () => {
		setShowFabMenu(false);
		router.push('/transactions/new');
	};

	const handleShowFilters = () => {
		setShowFabMenu(false);
		// You could integrate TransactionFilters component here or navigate to a filters screen
		// For now we'll just toggle search
		setShowSearch(true);
	};

	const handleSort = () => {
		setShowFabMenu(false);
		// Toggle sort order
		setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
	};

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

			{/* Floating Action Button */}
			<View style={styles.fabContainer}>
				{showFabMenu && (
					<Animated.View
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
						style={styles.backdrop}
					>
						<Pressable
							style={{ flex: 1 }}
							onPress={() => setShowFabMenu(false)}
						/>
					</Animated.View>
				)}

				{showFabMenu && (
					<Animated.View
						entering={SlideInDown.springify().damping(15)}
						exiting={SlideOutDown.duration(200)}
						style={styles.fabMenuContainer}
					>
						<Pressable
							onPress={handleCreateTransaction}
							style={[
								styles.fabMenuItem,
								{ backgroundColor: theme.colors.primary },
							]}
						>
							<Plus size={20} color='#FFFFFF' />
							<Text style={styles.fabMenuItemText}>New Transaction</Text>
						</Pressable>

						<Pressable
							onPress={handleShowFilters}
							style={[
								styles.fabMenuItem,
								{ backgroundColor: theme.colors.surface },
							]}
						>
							<Filter size={20} color={theme.colors.text} />
							<Text
								style={[styles.fabMenuItemText, { color: theme.colors.text }]}
							>
								Filter
							</Text>
						</Pressable>

						<Pressable
							onPress={handleSort}
							style={[
								styles.fabMenuItem,
								{ backgroundColor: theme.colors.surface },
							]}
						>
							<ArrowDownUp size={20} color={theme.colors.text} />
							<Text
								style={[styles.fabMenuItemText, { color: theme.colors.text }]}
							>
								Sort {sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}
							</Text>
						</Pressable>
					</Animated.View>
				)}

				<Pressable
					onPress={toggleFabMenu}
					style={[
						styles.fab,
						{
							backgroundColor: theme.colors.primary,
							transform: [{ rotate: showFabMenu ? '45deg' : '0deg' }],
						},
					]}
				>
					<Plus size={28} color='#FFFFFF' />
				</Pressable>
			</View>
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
	fabContainer: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		alignItems: 'center',
	},
	fab: {
		width: 50,
		height: 50,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		zIndex: 1,
	},
	fabMenuContainer: {
		position: 'absolute',
		bottom: 80,
		right: 0,
		marginBottom: 8,
		borderRadius: 12,
		overflow: 'hidden',
		width: 200,
		zIndex: 3,
	},
	fabMenuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		gap: 12,
	},
	fabMenuItemText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontFamily: 'Inter-Medium',
	},
});
