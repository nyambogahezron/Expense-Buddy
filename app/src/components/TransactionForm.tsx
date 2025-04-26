import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useThemeStore } from '@/store/theme';
import { CATEGORIES, TransactionCategory } from '@/types/transaction';
import { Calendar, DollarSign } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TransactionFormProps {
	initialValues?: {
		amount: string;
		description: string;
		category: TransactionCategory;
		date: Date;
		type: 'income' | 'expense';
	};
	onSubmit: (values: {
		amount: number;
		description: string;
		category: TransactionCategory;
		date: Date;
		type: 'income' | 'expense';
	}) => void;
	onCancel: () => void;
}

export function TransactionForm({
	initialValues,
	onSubmit,
	onCancel,
}: TransactionFormProps) {
	const { theme } = useThemeStore();
	const [amount, setAmount] = useState(initialValues?.amount || '');
	const [description, setDescription] = useState(
		initialValues?.description || ''
	);
	const [category, setCategory] = useState<TransactionCategory>(
		initialValues?.category || 'other'
	);
	const [date, setDate] = useState(initialValues?.date || new Date());
	const [type, setType] = useState<'income' | 'expense'>(
		initialValues?.type || 'expense'
	);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleSubmit = () => {
		if (!amount || !description) return;

		onSubmit({
			amount: parseFloat(amount),
			description,
			category,
			date,
			type,
		});
	};

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.inputContainer,
					{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
					},
				]}
			>
				<DollarSign size={20} color={theme.colors.textSecondary} />
				<TextInput
					placeholder='Amount'
					value={amount}
					onChangeText={setAmount}
					keyboardType='decimal-pad'
					style={[styles.input, { color: theme.colors.text }]}
					placeholderTextColor={theme.colors.textSecondary}
				/>
			</View>

			<View
				style={[
					styles.inputContainer,
					{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
					},
				]}
			>
				<TextInput
					placeholder='Description'
					value={description}
					onChangeText={setDescription}
					style={[styles.input, { color: theme.colors.text }]}
					placeholderTextColor={theme.colors.textSecondary}
				/>
			</View>

			<View style={styles.typeSelector}>
				<Pressable
					onPress={() => setType('expense')}
					style={[
						styles.typeButton,
						{
							backgroundColor:
								type === 'expense'
									? theme.colors.primary
									: theme.colors.surface,
							borderColor: theme.colors.border,
						},
					]}
				>
					<Text
						style={[
							styles.typeText,
							{ color: type === 'expense' ? '#FFFFFF' : theme.colors.text },
						]}
					>
						Expense
					</Text>
				</Pressable>
				<Pressable
					onPress={() => setType('income')}
					style={[
						styles.typeButton,
						{
							backgroundColor:
								type === 'income' ? theme.colors.primary : theme.colors.surface,
							borderColor: theme.colors.border,
						},
					]}
				>
					<Text
						style={[
							styles.typeText,
							{ color: type === 'income' ? '#FFFFFF' : theme.colors.text },
						]}
					>
						Income
					</Text>
				</Pressable>
			</View>

			<View style={styles.categoryGrid}>
				{Object.entries(CATEGORIES).map(([key, { label, color }]) => (
					<Pressable
						key={key}
						onPress={() => setCategory(key as TransactionCategory)}
						style={[
							styles.categoryButton,
							{
								backgroundColor:
									category === key ? color : theme.colors.surface,
								borderColor: theme.colors.border,
							},
						]}
					>
						<Text
							style={[
								styles.categoryText,
								{ color: category === key ? '#FFFFFF' : theme.colors.text },
							]}
						>
							{label}
						</Text>
					</Pressable>
				))}
			</View>

			<Pressable
				onPress={() => setShowDatePicker(true)}
				style={[
					styles.dateButton,
					{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
					},
				]}
			>
				<Calendar size={20} color={theme.colors.textSecondary} />
				<Text style={[styles.dateText, { color: theme.colors.text }]}>
					{date.toLocaleDateString()}
				</Text>
			</Pressable>

			{showDatePicker && (
				<DateTimePicker
					value={date}
					mode='date'
					onChange={(event, selectedDate) => {
						setShowDatePicker(false);
						if (selectedDate) {
							setDate(selectedDate);
						}
					}}
				/>
			)}

			<View style={styles.buttons}>
				<Pressable
					onPress={onCancel}
					style={[
						styles.button,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
						},
					]}
				>
					<Text style={[styles.buttonText, { color: theme.colors.text }]}>
						Cancel
					</Text>
				</Pressable>
				<Pressable
					onPress={handleSubmit}
					style={[styles.button, { backgroundColor: theme.colors.primary }]}
				>
					<Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Save</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		gap: 16,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		gap: 12,
	},
	input: {
		flex: 1,
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	typeSelector: {
		flexDirection: 'row',
		gap: 12,
	},
	typeButton: {
		flex: 1,
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		alignItems: 'center',
	},
	typeText: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
	},
	categoryGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	categoryButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
		borderWidth: 1,
	},
	categoryText: {
		fontSize: 14,
		fontFamily: 'Inter-SemiBold',
	},
	dateButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		gap: 12,
	},
	dateText: {
		fontSize: 16,
		fontFamily: 'Inter-Regular',
	},
	buttons: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 8,
	},
	button: {
		flex: 1,
		padding: 16,
		borderRadius: 12,
		alignItems: 'center',
		borderWidth: 1,
	},
	buttonText: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
	},
});
