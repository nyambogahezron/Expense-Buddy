import { create } from 'zustand';
import { Transaction, TransactionCategory } from '@/types/transaction';
import * as transactionService from '@/services/db/transactions';

interface TransactionStore {
	transactions: Transaction[];
	isLoading: boolean;
	error: string | null;
	searchQuery: string;
	selectedCategory: TransactionCategory | null;
	sortOrder: 'asc' | 'desc';

	// Actions
	loadTransactions: () => Promise<void>;
	addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
	updateTransaction: (
		id: string,
		transaction: Partial<Transaction>
	) => Promise<void>;
	deleteTransaction: (id: string) => Promise<void>;
	setSearchQuery: (query: string) => void;
	setSelectedCategory: (category: TransactionCategory | null) => void;
	setSortOrder: (order: 'asc' | 'desc') => void;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
	transactions: [],
	isLoading: false,
	error: null,
	searchQuery: '',
	selectedCategory: null,
	sortOrder: 'desc',

	loadTransactions: async () => {
		set({ isLoading: true, error: null });
		try {
			const transactions = await transactionService.getAllTransactions();
			set({ transactions, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Failed to load transactions',
				isLoading: false,
			});
		}
	},

	addTransaction: async (transaction) => {
		set({ isLoading: true, error: null });
		try {
			const newTransaction = await transactionService.createTransaction(
				transaction
			);
			set((state) => ({
				transactions: [newTransaction, ...state.transactions],
				isLoading: false,
			}));
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to add transaction',
				isLoading: false,
			});
		}
	},

	updateTransaction: async (id, transaction) => {
		set({ isLoading: true, error: null });
		try {
			await transactionService.updateTransaction(id, transaction);
			const updatedTransaction = await transactionService.getTransactionById(
				id
			);
			if (updatedTransaction) {
				set((state) => ({
					transactions: state.transactions.map((t) =>
						t.id === id ? updatedTransaction : t
					),
					isLoading: false,
				}));
			}
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Failed to update transaction',
				isLoading: false,
			});
		}
	},

	deleteTransaction: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await transactionService.deleteTransaction(id);
			set((state) => ({
				transactions: state.transactions.filter((t) => t.id !== id),
				isLoading: false,
			}));
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Failed to delete transaction',
				isLoading: false,
			});
		}
	},

	setSearchQuery: (query) => {
		set({ searchQuery: query });
	},

	setSelectedCategory: (category) => {
		set({ selectedCategory: category });
	},

	setSortOrder: (order) => {
		set({ sortOrder: order });
	},
}));
