import React, { useEffect, useState, useMemo } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Transaction } from '@/types';
import { deleteTransaction, getTransactionById } from '@/data/transactions';
import { CATEGORIES } from '@/constants/categories';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { useThemeStore } from '@/store/theme';

export default function TransactionsDetails() {
	const route = useRouter();
	const { theme } = useThemeStore();
	const styles = useMemo(() => createStyles(theme), [theme]);

	const { id } = useLocalSearchParams() as { id: string };
	const [transaction, setTransaction] = useState<Transaction | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const fetchTransaction = async () => {
			try {
				const data = await getTransactionById(id);
				if (data) {
					setTransaction(data);
				} else {
					setError('Transaction not found');
				}
			} catch (err) {
				setError('Failed to load transaction details');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchTransaction();
	}, [id]);

	const handleDelete = async () => {
		if (!transaction) return;

		try {
			setDeleting(true);
			await deleteTransaction(transaction.id);
			route.push('/(tabs)/transactions');
		} catch (err) {
			setError('Failed to delete transaction');
			console.error(err);
			setDeleting(false);
		}
	};

	const getCategoryDetails = (categoryId: string) => {
		return (
			CATEGORIES.find((cat) => cat.id === categoryId) || {
				name: categoryId,
				icon: 'help-circle',
				color: '#999',
			}
		);
	};

	if (loading) {
		return (
			<SafeAreaView style={styles.loadingContainer}>
				<ActivityIndicator size='large' color={theme.colors.primary} />
			</SafeAreaView>
		);
	}

	if (error || !transaction) {
		return (
			<SafeAreaView style={styles.errorContainer}>
				<Text style={styles.errorText}>{error || 'Transaction not found'}</Text>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => route.push('/(tabs)/transactions')}
				>
					<Text style={styles.backButtonText}>Go Back</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	const category = getCategoryDetails(transaction.category);

	return (
		<SafeAreaView style={styles.container}>
			<Animated.View style={styles.header} entering={FadeIn.duration(300)}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => route.push('/(tabs)/transactions')}
				>
					<Feather name='arrow-left' size={24} color={theme.colors.text} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Transaction Details</Text>
				<TouchableOpacity
					style={styles.deleteButton}
					onPress={handleDelete}
					disabled={deleting}
				>
					{deleting ? (
						<ActivityIndicator size='small' color={theme.colors.error} />
					) : (
						<Feather name='trash-2' size={24} color={theme.colors.error} />
					)}
				</TouchableOpacity>
			</Animated.View>

			<Animated.View
				style={styles.content}
				entering={SlideInRight.duration(400).delay(200)}
			>
				<View
					style={[
						styles.amountContainer,
						{
							backgroundColor:
								transaction.type === 'income'
									? theme.colors.success
									: theme.colors.error,
						},
					]}
				>
					<Text style={styles.amountLabel}>
						{transaction.type === 'income' ? 'Income' : 'Expense'}
					</Text>
					<Text style={styles.amount}>
						{transaction.type === 'income' ? '+' : '-'}
						{formatCurrency(transaction.amount)}
					</Text>
					<Text style={styles.date}>{formatDate(transaction.date)}</Text>
				</View>

				<View style={styles.detailsCard}>
					<View style={styles.detailRow}>
						<View style={styles.categoryIcon}>
							<Feather
								name={category.icon as any}
								size={20}
								color='#fff'
								style={{
									backgroundColor: category.color,
									padding: 10,
									borderRadius: 20,
								}}
							/>
						</View>
						<View>
							<Text style={styles.detailLabel}>Category</Text>
							<Text style={styles.detailValue}>{category.name}</Text>
						</View>
					</View>

					<View style={styles.separator} />

					<View style={styles.detailRow}>
						<Feather name='align-left' size={20} color={theme.colors.primary} />
						<View>
							<Text style={styles.detailLabel}>Description</Text>
							<Text style={styles.detailValue}>{transaction.description}</Text>
						</View>
					</View>

					<View style={styles.separator} />

					<View style={styles.detailRow}>
						<Feather name='calendar' size={20} color={theme.colors.primary} />
						<View>
							<Text style={styles.detailLabel}>Date & Time</Text>
							<Text style={styles.detailValue}>
								{formatDate(transaction.date, true)}
							</Text>
						</View>
					</View>

					<View style={styles.separator} />

					<View style={styles.detailRow}>
						<Feather name='hash' size={20} color={theme.colors.primary} />
						<View>
							<Text style={styles.detailLabel}>Transaction ID</Text>
							<Text style={styles.detailValue}>{transaction.id}</Text>
						</View>
					</View>
				</View>
			</Animated.View>
		</SafeAreaView>
	);
}

const createStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		},
		errorContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
			padding: 20,
		},
		errorText: {
			fontSize: 16,
			color: theme.colors.error,
			marginBottom: 20,
			textAlign: 'center',
		},
		header: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingHorizontal: 16,
			paddingVertical: 12,
			backgroundColor: theme.colors.surface,
			elevation: 2,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 3,
		},
		headerTitle: {
			fontSize: 18,
			fontWeight: '600',
			color: theme.colors.text,
		},
		backButton: {
			padding: 8,
		},
		backButtonText: {
			color: theme.colors.primary,
			fontSize: 16,
			fontWeight: '500',
		},
		deleteButton: {
			padding: 8,
		},
		content: {
			flex: 1,
			paddingHorizontal: 16,
			paddingTop: 20,
		},
		amountContainer: {
			borderRadius: 12,
			padding: 20,
			alignItems: 'center',
			marginBottom: 20,
		},
		amountLabel: {
			color: 'rgba(255, 255, 255, 0.8)',
			fontSize: 14,
			marginBottom: 5,
		},
		amount: {
			color: 'white',
			fontSize: 32,
			fontWeight: 'bold',
			marginBottom: 5,
		},
		date: {
			color: 'rgba(255, 255, 255, 0.8)',
			fontSize: 14,
		},
		detailsCard: {
			backgroundColor: theme.colors.surface,
			borderRadius: 12,
			padding: 20,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
			elevation: 2,
		},
		detailRow: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 12,
		},
		categoryIcon: {
			marginRight: 15,
		},
		detailLabel: {
			fontSize: 14,
			color: theme.colors.textSecondary,
			marginBottom: 4,
			marginLeft: 15,
		},
		detailValue: {
			fontSize: 16,
			color: theme.colors.text,
			marginLeft: 15,
		},
		separator: {
			height: 1,
			backgroundColor: theme.colors.border,
			marginVertical: 4,
		},
	});
