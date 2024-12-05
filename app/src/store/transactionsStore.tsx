import { create } from 'zustand';
import { supabase } from '@/utils/supabase';
import { useGlobalContext } from '@/context/GlobalProvider';

type TransactionsStoreProps = {
  transactionsData: any[];
  totalExpense: number;
  totalIncome: number;
  expenseList: any[];
  incomeList: any[];
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addTransaction: (transaction: any) => Promise<void>;
  updateTransaction: (transaction: any) => Promise<void>;
};

export const useTransactionsStore = create<TransactionsStoreProps>((set, get) => ({
  transactionsData: [],
  totalExpense: 0,
  totalIncome: 0,
  expenseList: [],
  incomeList: [],
  isLoading: false,
  fetchTransactions: async () => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('userId', User?.sub)
        .order('date', { ascending: false });

      if (error) {
        console.log('error getting transactions', error);
        throw new Error(error.message);
      }

      if (transactions) {
        set({ transactionsData: transactions });
        // ...existing code...
        set({ totalExpense, totalIncome, expenseList, incomeList });
      } else {
        set({ transactionsData: [] });
      }
    } catch (error) {
      console.log('error fetching transactions', error);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteTransaction: async (id: string) => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error deleting transaction', error);
        throw new Error(error.message);
      }
      get().fetchTransactions();
    } catch (error) {
      console.log('error deleting transaction', error);
    } finally {
      set({ isLoading: false });
    }
  },
  addTransaction: async (transaction: any) => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { error } = await supabase.from('transactions').insert([
        {
          ...transaction,
          userId: User?.sub,
        },
      ]);

      if (error) {
        console.log('error adding transaction', error);
        throw new Error(error.message);
      }

      get().fetchTransactions();
    } catch (error) {
      console.log('error adding transaction', error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateTransaction: async (transaction: any) => {
    const { User } = useGlobalContext();
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('transactions')
        .update(transaction)
        .eq('id', transaction.id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error updating transaction', error);
        throw new Error(error.message);
      }
      get().fetchTransactions();
    } catch (error) {
      console.log('error updating transaction', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
