import { create } from 'zustand';
import { Category } from '@/types/category';
import { Transaction } from '@/types/transaction';

interface CategoryStore {
	categories: Category[];
	selectedCategory: Category | null;
	isLoading: boolean;
	error: string | null;

	// Actions
	addCategory: (category: Omit<Category, 'id' | 'itemCount' | 'items'>) => void;
	updateCategory: (id: string, category: Partial<Category>) => void;
	deleteCategory: (id: string) => void;
	selectCategory: (category: Category | null) => void;
	addTransaction: (
		categoryId: string,
		transaction: Omit<Transaction, 'id'>
	) => void;
	updateTransaction: (
		categoryId: string,
		transactionId: string,
		transaction: Partial<Transaction>
	) => void;
	deleteTransaction: (categoryId: string, transactionId: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
	categories: [],
	selectedCategory: null,
	isLoading: false,
	error: null,

	addCategory: (category) => {
		const newCategory: Category = {
			id: Math.random().toString(36).substring(7),
			itemCount: 0,
			items: [],
			...category,
		};

		set((state) => ({
			categories: [...state.categories, newCategory],
		}));
	},

	updateCategory: (id, category) => {
		set((state) => ({
			categories: state.categories.map((c) =>
				c.id === id ? { ...c, ...category } : c
			),
		}));
	},

	deleteCategory: (id) => {
		set((state) => ({
			categories: state.categories.filter((c) => c.id !== id),
			selectedCategory:
				state.selectedCategory?.id === id ? null : state.selectedCategory,
		}));
	},

	selectCategory: (category) => {
		set({ selectedCategory: category });
	},

	addTransaction: (categoryId, transaction) => {
		const newTransaction: any = {
			id: Math.random().toString(36).substring(7),
			name: transaction.description, // Map description to name
			tags: [], // Provide default tags or map appropriately
		};

		set((state) => ({
			categories: state.categories.map((c) =>
				c.id === categoryId
					? {
							...c,
							items: [...c.items, newTransaction],
							itemCount: c.itemCount + 1,
					  }
					: c
			),
		}));
	},

	updateTransaction: (categoryId, transactionId, transaction) => {
		set((state) => ({
			categories: state.categories.map((c) =>
				c.id === categoryId
					? {
							...c,
							items: c.items.map((t) =>
								t.id === transactionId ? { ...t, ...transaction } : t
							),
					  }
					: c
			),
		}));
	},

	deleteTransaction: (categoryId, transactionId) => {
		set((state) => ({
			categories: state.categories.map((c) =>
				c.id === categoryId
					? {
							...c,
							items: c.items.filter((t) => t.id !== transactionId),
							itemCount: c.itemCount - 1,
					  }
					: c
			),
		}));
	},
}));
