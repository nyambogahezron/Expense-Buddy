import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
	FadeIn,
	FadeOut,
	SlideInDown,
	SlideOutDown,
	useAnimatedRef,
	useAnimatedStyle,
	interpolate,
	Extrapolation,
} from 'react-native-reanimated';
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
import { router, Stack } from 'expo-router';
import { useTransactionStore } from '@/store/transactions';
import HomeHeader from '@/components/HomeHeader';
const { width, height } = Dimensions.get('window');

const HEADER_HEIGHT = height * 0.4;
const CATEGORY_FILTER_HEIGHT = 60; // Approximate height of the category filter

export default function TransactionsScreen() {
	const { sortOrder, setSortOrder } = useTransactionStore();
	const [selectedCategory, setSelectedCategory] =
		useState<TransactionCategory | null>(null);

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

	const scrollOffset = useSharedValue(0);
	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const headerAnimatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[1.5, 1, 1]
					),
				},
			],
		};
	});

	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				scrollOffset.value,
				[0, HEADER_HEIGHT / 1.5],
				[0, 1]
			),
			// Only show the background when the fixed category filter is visible
			height: interpolate(
				scrollOffset.value,
				[
					HEADER_HEIGHT - CATEGORY_FILTER_HEIGHT - 20,
					HEADER_HEIGHT - CATEGORY_FILTER_HEIGHT,
				],
				[0, 100],
				Extrapolation.CLAMP
			),
		};
	}, []);

	// New animated style for the fixed category filter
	const fixedCategoryFilterStyle = useAnimatedStyle(() => {
		const showFixedFilter = interpolate(
			scrollOffset.value,
			[
				HEADER_HEIGHT - CATEGORY_FILTER_HEIGHT - 20,
				HEADER_HEIGHT - CATEGORY_FILTER_HEIGHT,
			],
			[0, 1],
			Extrapolation.CLAMP
		);

		return {
			opacity: showFixedFilter,
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[
							HEADER_HEIGHT - CATEGORY_FILTER_HEIGHT - 20,
							HEADER_HEIGHT - CATEGORY_FILTER_HEIGHT,
						],
						[-50, 0],
						Extrapolation.CLAMP
					),
				},
			],
		};
	});

	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollOffset.value = event.contentOffset.y;
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
			<Stack.Screen
				options={{
					headerShown: true,
					headerBackground() {
						return (
							<Animated.View
								style={[
									headerAnimatedStyle,
									{
										backgroundColor: theme.colors.background,
										width: width,
									},
								]}
							/>
						);
					},
					header: () => (
						<Animated.View
							style={[
								fixedCategoryFilterStyle,
								{
									width: '100%',
									zIndex: 999,
									top: 35,
									backgroundColor: theme.colors.background,
								},
							]}
						>
							<CategoryFilter
								selectedCategory={selectedCategory}
								onSelectCategory={setSelectedCategory}
							/>
						</Animated.View>
					),
				}}
			/>

			<Animated.ScrollView
				style={{ marginTop: -23 }}
				ref={scrollRef}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				contentContainerStyle={{ paddingBottom: 20 }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			>
				{/* header */}
				<View
					style={[
						{
							height: HEADER_HEIGHT,
							backgroundColor: theme.colors.background,
						},
						headerAnimatedStyles,
					]}
				>
					<HomeHeader balance={summary.balance} />
					<CategoryFilter
						selectedCategory={selectedCategory}
						onSelectCategory={setSelectedCategory}
					/>
				</View>

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
