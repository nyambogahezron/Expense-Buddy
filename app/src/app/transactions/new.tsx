import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useThemeStore } from '@/store/theme';
import { useTransactionStore } from '@/store/transactions';
import { TransactionForm } from '@/components/TransactionForm';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function NewTransactionScreen() {
	const { theme } = useThemeStore();
	const { addTransaction } = useTransactionStore();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (values: any) => {
		try {
			addTransaction(values);
			router.back();
		} catch (err) {
			setError('Failed to create transaction. Please try again.');
		}
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
					New Transaction
				</Text>
			</View>

			<ScrollView style={styles.content}>
				<Animated.View entering={FadeIn}>
					{error && (
						<Text style={[styles.error, { color: theme.colors.error }]}>
							{error}
						</Text>
					)}
					<TransactionForm
						onSubmit={handleSubmit}
						onCancel={() => router.back()}
					/>
				</Animated.View>
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
		alignItems: 'center',
		padding: 20,
		paddingTop: 60,
	},
	backButton: {
		padding: 8,
	},
	title: {
		fontSize: 24,
		fontFamily: 'Inter-Bold',
		marginLeft: 12,
	},
	content: {
		flex: 1,
	},
	error: {
		fontSize: 14,
		fontFamily: 'Inter-Regular',
		marginHorizontal: 20,
		marginBottom: 16,
	},
});
