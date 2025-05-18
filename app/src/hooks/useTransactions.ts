import { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionSummary, FilterType } from '../types';
import {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../data/transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTransactions(transactions);
    } else if (filter === 'income' || filter === 'expense') {
      setFilteredTransactions(transactions.filter((t) => t.type === filter));
    } else {
      // Filter by category
      setFilteredTransactions(transactions.filter((t) => t.category === filter));
    }
  }, [transactions, filter]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  }, [fetchTransactions]);

  const addNewTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    try {
      setLoading(true);
      const newTransaction = await addTransaction(transaction);
      setTransactions((prev) => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      setError('Failed to add transaction');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExistingTransaction = useCallback(async (transaction: Transaction) => {
    try {
      setLoading(true);
      const updatedTransaction = await updateTransaction(transaction);
      setTransactions((prev) =>
        prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
      );
      return updatedTransaction;
    } catch (err) {
      setError('Failed to update transaction');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeTransaction = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete transaction');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTransactionSummary = useCallback((): TransactionSummary => {
    const summary: TransactionSummary = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      categorySummary: {},
    };

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpense += transaction.amount;
      }

      // Update category summary
      if (!summary.categorySummary[transaction.category]) {
        summary.categorySummary[transaction.category] = 0;
      }

      if (transaction.type === 'income') {
        summary.categorySummary[transaction.category] += transaction.amount;
      } else {
        summary.categorySummary[transaction.category] -= transaction.amount;
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpense;
    return summary;
  }, [transactions]);

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    loading,
    error,
    filter,
    refreshing,
    setFilter,
    onRefresh,
    addTransaction: addNewTransaction,
    updateTransaction: updateExistingTransaction,
    deleteTransaction: removeTransaction,
    getTransactionSummary,
  };
};
