export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'bills'
  | 'salary'
  | 'investment'
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: TransactionCategory;
  type: 'income' | 'expense';
  description: string;
}

export const CATEGORIES: Record<TransactionCategory, { label: string; color: string }> = {
  food: { label: 'Food', color: '#EF4444' },
  transport: { label: 'Transport', color: '#F59E0B' },
  shopping: { label: 'Shopping', color: '#10B981' },
  entertainment: { label: 'Entertainment', color: '#6366F1' },
  bills: { label: 'Bills', color: '#8B5CF6' },
  salary: { label: 'Salary', color: '#3B82F6' },
  investment: { label: 'Investment', color: '#EC4899' },
  other: { label: 'Other', color: '#6B7280' },
};