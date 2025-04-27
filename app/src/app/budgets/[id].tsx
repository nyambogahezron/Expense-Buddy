import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeStore } from '@/store/theme';
import { useBudgetStore } from '@/store/budgets';
import { ArrowLeft, CreditCard as Edit2, Trash } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function BudgetDetailScreen() {
	const { theme } = useThemeStore();
	const { selectedBudget, deleteBudget } = useBudgetStore();
	const params = useLocalSearchParams();

	if (!selectedBudget) {
		return null;
	}

	const totalSpent = selectedBudget.categories.reduce(
		(sum, cat) => sum + cat.spent,
		0
	);
	const remaining = selectedBudget.totalAmount - totalSpent;

	const handleDelete = () => {
		deleteBudget(selectedBudget.id);
		router.back();
	};

	return (
		<View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<View style={styles.header}>
				<Pressable onPress={() => router.back()} style={styles.backButton}>
					<ArrowLeft size={24} color={theme.colors.text} />
				</Pressable>
				<Text style={[styles.title, { color: theme.colors.text }]}>
					{selectedBudget.name}
				</Text>
				<View style={styles.actions}>
					<Pressable
						onPress={() => router.push('/budgets/edit')}
						style={[
							styles.actionButton,
							{ backgroundColor: theme.colors.primary },
						]}
					>
						<Edit2 size={20} color='#FFFFFF' />
					</Pressable>
					<Pressable
						onPress={handleDelete}
						style={[
							styles.actionButton,
							{ backgroundColor: theme.colors.error },
						]}
					>
						<Trash size={20} color='#FFFFFF' />
					</Pressable>
				</View>
			</View>

			<ScrollView style={styles.content}>
				<Animated.View
					entering={FadeIn}
					style={[
						styles.summaryCard,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
						},
					]}
				>
					<View style={styles.summaryRow}>
						<Text
							style={[
								styles.summaryLabel,
								{ color: theme.colors.textSecondary },
							]}
						>
							Total Budget
						</Text>
						<Text style={[styles.summaryValue, { color: theme.colors.text }]}>
							${selectedBudget.totalAmount.toLocaleString()}
						</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text
							style={[
								styles.summaryLabel,
								{ color: theme.colors.textSecondary },
							]}
						>
							Total Spent
						</Text>
						<Text style={[styles.summaryValue, { color: theme.colors.text }]}>
							${totalSpent.toLocaleString()}
						</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text
							style={[
								styles.summaryLabel,
								{ color: theme.colors.textSecondary },
							]}
						>
							Remaining
						</Text>
						<Text
							style={[
								styles.summaryValue,
								{
									color:
										remaining < 0 ? theme.colors.error : theme.colors.success,
								},
							]}
						>
							${remaining.toLocaleString()}
						</Text>
					</View>
				</Animated.View>

				<View style={styles.section}>
					<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
						Categories
					</Text>
					{selectedBudget.categories.map((category) => {
						const progress = (category.spent / category.amount) * 100;
						return (
							<Animated.View
								key={category.id}
								entering={FadeIn}
								style={[
									styles.categoryCard,
									{
										backgroundColor: theme.colors.surface,
										borderColor: theme.colors.border,
									},
								]}
							>
								<View style={styles.categoryHeader}>
									<View style={styles.categoryInfo}>
										<Text
											style={[
												styles.categoryName,
												{ color: theme.colors.text },
											]}
										>
											{category.name}
										</Text>
										<Text
											style={[
												styles.categoryAmount,
												{ color: theme.colors.textSecondary },
											]}
										>
											${category.spent.toLocaleString()} of $
											{category.amount.toLocaleString()}
										</Text>
									</View>
									<Text
										style={[
											styles.categoryPercentage,
											{
												color:
													progress > 100
														? theme.colors.error
														: progress > 80
														? theme.colors.accent
														: theme.colors.success,
											},
										]}
									>
										{Math.round(progress)}%
									</Text>
								</View>
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
													progress > 100
														? theme.colors.error
														: progress > 80
														? theme.colors.accent
														: theme.colors.success,
											},
										]}
									/>
								</View>
							</Animated.View>
						);
					})}
				</View>
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
		paddingTop: 60,
	},
	backButton: {
		padding: 8,
	},
	title: {
		fontSize: 20,
		fontFamily: 'Inter-SemiBold',
		flex: 1,
		textAlign: 'center',
	},
	actions: {
		flexDirection: 'row',
		gap: 8,
	},
	actionButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		flex: 1,
		padding: 20,
	},
	summaryCard: {
		padding: 20,
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 24,
	},
	summaryRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	summaryLabel: {
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	summaryValue: {
		fontSize: 18,
		fontFamily: 'Inter-Bold',
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontFamily: 'Inter-SemiBold',
		marginBottom: 16,
	},
	categoryCard: {
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 12,
	},
	categoryHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	categoryInfo: {
		flex: 1,
	},
	categoryName: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
		marginBottom: 4,
	},
	categoryAmount: {
		fontSize: 14,
		fontFamily: 'Inter-Regular',
	},
	categoryPercentage: {
		fontSize: 16,
		fontFamily: 'Inter-Bold',
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
});
