import { create } from 'zustand';
import { Budget, BudgetCategory } from '@/types/budget';
import { SAMPLE_BUDGETS } from '@/types/budget';

interface BudgetStore {
  budgets: Budget[];
  selectedBudget: Budget | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  selectBudget: (budget: Budget | null) => void;
  updateCategory: (budgetId: string, categoryId: string, amount: number) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: SAMPLE_BUDGETS,
  selectedBudget: null,
  isLoading: false,
  error: null,

  addBudget: (budget) => {
    const newBudget: Budget = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...budget,
    };

    set((state) => ({
      budgets: [...state.budgets, newBudget],
    }));
  },

  updateBudget: (id, budget) => {
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === id
          ? {
              ...b,
              ...budget,
              updatedAt: new Date().toISOString(),
            }
          : b
      ),
    }));
  },

  deleteBudget: (id) => {
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
      selectedBudget: state.selectedBudget?.id === id ? null : state.selectedBudget,
    }));
  },

  selectBudget: (budget) => {
    set({ selectedBudget: budget });
  },

  updateCategory: (budgetId, categoryId, amount) => {
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === budgetId
          ? {
              ...b,
              categories: b.categories.map((c) =>
                c.id === categoryId ? { ...c, spent: amount } : c
              ),
              updatedAt: new Date().toISOString(),
            }
          : b
      ),
    }));
  },
}));