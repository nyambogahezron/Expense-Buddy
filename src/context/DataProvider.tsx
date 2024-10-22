import { supabase } from '@/utils/supabase';
import React, { createContext, useContext } from 'react';
import { useGlobalContext } from './GlobalProvider';
import { Alert } from 'react-native';
import { createContextProps } from '@/types';
import { DataProviderInitialValues } from '@/types/initialValues';

const DataContext = createContext<createContextProps>({
  ...DataProviderInitialValues,
});

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { User } = useGlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactionsData, setTransactionsData] = React.useState<any>();
  const [categoriesData, setCategoriesData] = React.useState<any>();
  const [totalExpense, setTotalExpense] = React.useState<number>(0);
  const [totalIncome, setTotalIncome] = React.useState<number>(0);
  const [expenseList, setExpenseList] = React.useState<any>([]);
  const [incomeList, setIncomeList] = React.useState<any>([]);

  // ######### transactions #########

  async function fetchTransactions() {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
        setTransactionsData(transactions);
        // console.log('Transactions:', transactions);

        // get total expense and income
        const totalExpense = transactions.reduce(
          (sum: number, transaction: any) =>
            transaction.type === 'expense' ? sum + transaction.amount : sum,
          0
        );
        setTotalExpense(totalExpense);

        const totalIncome = transactions.reduce(
          (sum: number, transaction: any) =>
            transaction.type === 'income' ? sum + transaction.amount : sum,
          0
        );
        setTotalIncome(totalIncome);

        // categorize expenses and incomes by category ID
        const expenseCategories: {
          [key: string]: {
            name: string;
            amount: number;
            icon: string;
          };
        } = {};
        const incomeCategories: {
          [key: string]: {
            name: string;
            amount: number;
            icon: string;
          };
        } = {};

        transactions.forEach((transaction: any) => {
          const categoryId = transaction.category.id;
          const categoryName = transaction.category.name || 'Others';
          const categoryIcon = transaction.category.icon || '';

          if (transaction.type === 'expense') {
            if (!expenseCategories[categoryId]) {
              expenseCategories[categoryId] = {
                name: categoryName,
                amount: 0,
                icon: categoryIcon,
              };
            }
            expenseCategories[categoryId].amount += transaction.amount;
          } else if (transaction.type === 'income') {
            if (!incomeCategories[categoryId]) {
              incomeCategories[categoryId] = {
                name: categoryName,
                amount: 0,
                icon: categoryIcon,
              };
            }
            incomeCategories[categoryId].amount += transaction.amount;
          }
        });

        // create expense list for chart
        const expenseList = Object.keys(expenseCategories).map(
          (categoryId, index) => {
            const { name, amount, icon } = expenseCategories[categoryId];
            const percentage = Math.floor((amount * 100) / totalExpense);
            return {
              id: (index + 1).toString(),
              name: name,
              amount: amount.toFixed(2),
              percentage: percentage.toString(),
              icon: icon,
            };
          }
        );

        // create income list for chart
        const incomeList = Object.keys(incomeCategories).map(
          (categoryId, index) => {
            const { name, amount, icon } = incomeCategories[categoryId];
            const percentage = Math.floor((amount * 100) / totalIncome);
            return {
              id: (index + 1).toString(),
              name: name,
              amount: amount.toFixed(2),
              percentage: percentage.toString(),
              icon: icon,
            };
          }
        );

        // console.log('Expense List:', expenseList);
        // console.log('Income List:', incomeList);
        setIncomeList(incomeList);
        setExpenseList(expenseList);
      } else {
        setTransactionsData([]);
      }
    } catch (error) {
      console.log('error fetching transactions', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTransaction(id: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error deleting transaction', error);
        throw new Error(error.message);
      }
      setIsLoading(false);
      fetchTransactions();
    } catch (error) {
      console.log('error deleting transaction', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTransaction(transaction: any) {
    try {
      setIsLoading(true);
      const { error, data } = await supabase.from('transactions').insert([
        {
          ...transaction,
          userId: User?.sub,
        },
      ]);

      if (error) {
        console.log('error adding transaction', error);
        throw new Error(error.message);
      }

      fetchTransactions();
    } catch (error) {
      console.log('error adding transaction', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateTransaction(transaction: any) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('transactions')
        .update(transaction)
        .eq('id', transaction.id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error updating transaction', error);
        throw new Error(error.message);
      }
      fetchTransactions();
    } catch (error) {
      console.log('error updating transaction', error);
    } finally {
      setIsLoading(false);
    }
  }

  // ############### categories #############

  async function fetchCategories() {
    try {
      setIsLoading(true);
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .eq('userId', User?.sub);

      if (error) {
        console.log('error getting categories', error);
        throw new Error(error.message);
      }

      if (categories) {
        setCategoriesData(categories);
      } else {
        setCategoriesData([]);
      }
    } catch (error) {
      console.log('error fetching categories', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCategory(category: any) {
    try {
      setIsLoading(true);
      const { error } = await supabase.from('categories').insert([
        {
          ...category,
          userId: User?.sub,
        },
      ]);

      if (error) {
        console.log('error adding category', error);
        throw new Error(error.message);
      }
      fetchCategories();
    } catch (error) {
      console.log('error adding category', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCategory(category: any) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', category.id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error updating category', error);
        throw new Error(error.message);
      }
      fetchCategories();
    } catch (error) {
      console.log('error updating category', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCategory(id: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('userId', User?.sub);

      if (error) {
        console.log('error deleting category', error);
        throw new Error(error.message);
      }
      Alert.alert('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.log('error deleting category', error);
    } finally {
      setIsLoading(false);
    }
  }

  // ######### Files Upload #########

  // upload image
  async function uploadImage(image: any) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`public/${User?.sub}/${image.name}`, image);

      if (error) {
        console.log('error uploading image', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.log('error uploading image', error);
    } finally {
      setIsLoading(false);
    }
  }

  // delete image
  async function deleteImage(imagePath: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.storage
        .from('images')
        .remove([imagePath]);

      if (error) {
        console.log('error deleting image', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.log('error deleting image', error);
    } finally {
      setIsLoading(false);
    }
  }

  // upload file / receipt
  async function uploadFile(file: any) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from('files')
        .upload(`public/${User?.sub}/${file.name}`, file);

      if (error) {
        console.log('error uploading file', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.log('error uploading file', error);
    } finally {
      setIsLoading(false);
    }
  }

  // delete file / receipt

  async function deleteFile(filePath: string) {
    try {
      setIsLoading(true);
      const { error } = await supabase.storage.from('files').remove([filePath]);

      if (error) {
        console.log('error deleting file', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.log('error deleting file', error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (User) {
      fetchTransactions();
      fetchCategories();
    }
  }, [User]);

  return (
    <DataContext.Provider
      value={{
        transactionsData,
        isLoading,
        fetchTransactions,
        deleteTransaction,
        addTransaction,
        updateTransaction,
        categoriesData,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        uploadImage,
        deleteImage,
        uploadFile,
        deleteFile,
        totalExpense,
        totalIncome,
        expenseList,
        incomeList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
