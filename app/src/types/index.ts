export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categorySummary: {
    [key: string]: number;
  };
}

export type FilterType = 'all' | 'income' | 'expense' | string;
