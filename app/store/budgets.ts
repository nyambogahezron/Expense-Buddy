import { create } from 'zustand';
import { Budget } from '@/types/budget';
import * as budgetService from '@/services/db/budgets';

interface BudgetStore {
	budgets: Budget[];
	selectedBudget: Budget | null;
	isLoading: boolean;
	error: string | null;

	// Actions
	loadBudgets: () => Promise<void>;
	addBudget: (
		budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>
	) => Promise<void>;
	updateBudget: (
		id: string,
		budget: Partial<Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>>
	) => Promise<void>;
	deleteBudget: (id: string) => Promise<void>;
	selectBudget: (budget: Budget | null) => void;
	updateCategorySpent: (
		budgetId: string,
		categoryId: string,
		spent: number
	) => Promise<void>;
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
	budgets: [],
	selectedBudget: null,
	isLoading: false,
	error: null,

	loadBudgets: async () => {
		set({ isLoading: true, error: null });
		try {
			const budgets = await budgetService.getAllBudgets();
			set({ budgets, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to load budgets',
				isLoading: false,
			});
		}
	},

	addBudget: async (budget) => {
		set({ isLoading: true, error: null });
		try {
			const newBudget = await budgetService.createBudget(budget);
			set((state) => ({
				budgets: [...state.budgets, newBudget],
				isLoading: false,
			}));
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to add budget',
				isLoading: false,
			});
		}
	},

	updateBudget: async (id, budget) => {
		set({ isLoading: true, error: null });
		try {
			await budgetService.updateBudget(id, budget);
			const updatedBudget = await budgetService.getBudgetById(id);
			if (updatedBudget) {
				set((state) => ({
					budgets: state.budgets.map((b) => (b.id === id ? updatedBudget : b)),
					selectedBudget:
						state.selectedBudget?.id === id
							? updatedBudget
							: state.selectedBudget,
					isLoading: false,
				}));
			}
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to update budget',
				isLoading: false,
			});
		}
	},

	deleteBudget: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await budgetService.deleteBudget(id);
			set((state) => ({
				budgets: state.budgets.filter((b) => b.id !== id),
				selectedBudget:
					state.selectedBudget?.id === id ? null : state.selectedBudget,
				isLoading: false,
			}));
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to delete budget',
				isLoading: false,
			});
		}
	},

	selectBudget: (budget) => {
		set({ selectedBudget: budget });
	},

	updateCategorySpent: async (budgetId, categoryId, spent) => {
		set({ isLoading: true, error: null });
		try {
			await budgetService.updateCategorySpent(budgetId, categoryId, spent);
			const updatedBudget = await budgetService.getBudgetById(budgetId);
			if (updatedBudget) {
				set((state) => ({
					budgets: state.budgets.map((b) =>
						b.id === budgetId ? updatedBudget : b
					),
					selectedBudget:
						state.selectedBudget?.id === budgetId
							? updatedBudget
							: state.selectedBudget,
					isLoading: false,
				}));
			}
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: 'Failed to update category spent amount',
				isLoading: false,
			});
		}
	},
}));
