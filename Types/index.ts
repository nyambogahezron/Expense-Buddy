type TransactionProps = {
  id: number;
  title: string;
  date: string;
  amount: string;
  icon?: string;
  iconColor?:
    | '#FFA500'
    | '#FF4500'
    | '#FF6347'
    | '#FF0000'
    | '#FF69B4'
    | '#FF1493'
    | '#3030cc'
    | '#FF4500';
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
