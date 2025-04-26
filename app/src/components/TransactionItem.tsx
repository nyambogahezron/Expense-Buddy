import { StyleSheet, Text, View } from 'react-native';
import { Transaction } from '@/types/transaction';
import { format } from 'date-fns';
import { CATEGORIES } from '@/types/transaction';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useThemeStore } from '@/store/theme';

interface TransactionItemProps {
	transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
	const { amount, date, category, type, description } = transaction;
	const { color } = CATEGORIES[category];
	const { theme } = useThemeStore();

	return (
		<Animated.View
			entering={FadeInRight}
			exiting={FadeOutLeft}
			style={[styles.container, { backgroundColor: theme.colors.surface }]}
		>
			<View style={styles.left}>
				<View style={[styles.categoryDot, { backgroundColor: color }]} />
				<View>
					<Text style={styles.description}>{description}</Text>
					<Text style={styles.date}>
						{format(new Date(date), 'MMM d, yyyy h:mm a')}
					</Text>
				</View>
			</View>
			<Text
				style={[
					styles.amount,
					{ color: type === 'income' ? '#10B981' : '#EF4444' },
				]}
			>
				{type === 'income' ? '+' : '-'}${amount.toLocaleString()}
			</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
		backgroundColor: '#FFFFFF',
		marginHorizontal: 20,
		marginBottom: 12,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	categoryDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
	},
	description: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
		color: '#1F2937',
		marginBottom: 4,
	},
	date: {
		fontSize: 14,
		fontFamily: 'Inter-Regular',
		color: '#6B7280',
	},
	amount: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
	},
});
