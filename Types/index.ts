type TransactionProps = {
  id: number;
  title: string;
  date: string;
  amount: string;
  icon?: string;
  type: 'expense' | 'income';
  category: TransactionCategoryProps;
  transactionFee?: string;
  description?: string;
  receipt?: string;
};

type TransactionCategoryProps = {
  id: number;
  name: string;
  icon: string;
};

export { TransactionProps, TransactionCategoryProps };
