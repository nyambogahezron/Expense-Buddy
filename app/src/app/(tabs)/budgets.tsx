import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';
import { useThemeStore } from '@/store/theme';
import { useBudgetStore } from '@/store/budgets';
import { Plus } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

export default function BudgetsScreen() {
	const { theme } = useThemeStore();
	const { budgets, selectBudget } = useBudgetStore();

	const handleBudgetPress = (budget: any) => {
		selectBudget(budget);
		router.push('/budgets/[id]');
	};

	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<StatusBar
				style={theme.name.toLocaleLowerCase() === 'light' ? 'dark' : 'light'}
			/>

			<Stack.Screen
				options={{
					headerShown: true,
					header: () => {
						return (
							<View
								style={[
									styles.header,
									{ backgroundColor: theme.colors.primary },
								]}
							>
								<Text style={[styles.title, { color: theme.colors.border }]}>
									Budgets
								</Text>
								<Pressable
									onPress={() => router.push('/budgets/new')}
									style={[
										styles.addButton,
										{ backgroundColor: theme.colors.background },
									]}
								>
									<Plus size={24} color={theme.colors.primary} />
								</Pressable>
							</View>
						);
					},
				}}
			/>

			<ScrollView style={styles.content}>
				{budgets.map((budget, index) => {
					const totalSpent = budget.categories.reduce(
						(sum, cat) => sum + cat.spent,
						0
					);
					const progress = (totalSpent / budget.totalAmount) * 100;

					return (
						<Animated.View
							key={budget.id}
							entering={FadeInUp.delay(index * 100)}
							style={[
								styles.budgetCard,
								{
									backgroundColor: theme.colors.surface,
									borderColor: theme.colors.border,
								},
							]}
						>
							<Pressable
								onPress={() => handleBudgetPress(budget)}
								style={styles.budgetContent}
							>
								<View style={styles.budgetHeader}>
									<Text
										style={[styles.budgetName, { color: theme.colors.text }]}
									>
										{budget.name}
									</Text>
									<Text
										style={[
											styles.budgetAmount,
											{ color: theme.colors.primary },
										]}
									>
										${budget.totalAmount.toLocaleString()}
									</Text>
								</View>

								<View style={styles.progressContainer}>
									<View
										style={[
											styles.progressBar,
											{ backgroundColor: theme.colors.border },
										]}
									>
										<View
											style={[
												styles.progressFill,
												{
													width: `${Math.min(progress, 100)}%`,
													backgroundColor:
														progress > 90
															? theme.colors.error
															: theme.colors.primary,
												},
											]}
										/>
									</View>
									<Text
										style={[
											styles.progressText,
											{ color: theme.colors.textSecondary },
										]}
									>
										${totalSpent.toLocaleString()} spent
									</Text>
								</View>

								<View style={styles.categoriesGrid}>
									{budget.categories.map((category) => (
										<View
											key={category.id}
											style={[
												styles.categoryChip,
												{ backgroundColor: category.color + '20' },
											]}
										>
											<Text
												style={[styles.categoryName, { color: category.color }]}
											>
												{category.name}
											</Text>
											<Text
												style={[
													styles.categoryAmount,
													{ color: category.color },
												]}
											>
												${category.amount.toLocaleString()}
											</Text>
										</View>
									))}
								</View>
							</Pressable>
						</Animated.View>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		paddingTop: 45,
	},
	title: {
		fontSize: 28,
		fontFamily: 'Inter-Bold',
	},
	addButton: {
		width: 40,
		height: 40,
		borderRadius: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		padding: 5,
	},
	budgetCard: {
		borderRadius: 8,
		padding: 20,
		marginBottom: 16,
		borderWidth: 1,
	},
	budgetContent: {
		gap: 16,
	},
	budgetHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	budgetName: {
		fontSize: 20,
		fontFamily: 'Inter-SemiBold',
	},
	budgetAmount: {
		fontSize: 20,
		fontFamily: 'Inter-Bold',
	},
	progressContainer: {
		gap: 8,
	},
	progressBar: {
		height: 8,
		borderRadius: 4,
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		borderRadius: 4,
	},
	progressText: {
		fontSize: 14,
		fontFamily: 'Inter-Regular',
	},
	categoriesGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	categoryChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	categoryName: {
		fontSize: 14,
		fontFamily: 'Inter-SemiBold',
	},
	categoryAmount: {
		fontSize: 14,
		fontFamily: 'Inter-Regular',
	},
});
