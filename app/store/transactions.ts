import { create } from 'zustand';
import { Transaction, TransactionCategory } from '@/types/transaction';

interface TransactionStore {
	transactions: Transaction[];
	isLoading: boolean;
	error: string | null;
	searchQuery: string;
	selectedCategory: TransactionCategory | null;
	sortOrder: 'asc' | 'desc';

	// Actions
	addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
	updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
	deleteTransaction: (id: string) => void;
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

	addTransaction: (transaction) => {
		const newTransaction: Transaction = {
			id: Math.random().toString(36).substring(7),
			...transaction,
		};

		set((state) => ({
			transactions: [newTransaction, ...state.transactions],
		}));
	},

	updateTransaction: (id, transaction) => {
		set((state) => ({
			transactions: state.transactions.map((t) =>
				t.id === id ? { ...t, ...transaction } : t
			),
		}));
	},

	deleteTransaction: (id) => {
		set((state) => ({
			transactions: state.transactions.filter((t) => t.id !== id),
		}));
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
