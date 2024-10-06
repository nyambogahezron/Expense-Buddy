import { supabase } from '@/utils/supabase';
import React, { createContext, useContext } from 'react';
import { useGlobalContext } from './GlobalProvider';
import { Alert } from 'react-native';
import { createContextProps } from '@/types';

const DataContext = createContext<createContextProps>({
  transactionsData: [],
  isLoading: false,
  fetchTransactions: async () => {},
  deleteTransaction: async () => {},
  addTransaction: async () => {},
  updateTransaction: async () => {},
  categoriesData: [],
  fetchCategories: async () => {},
  addCategory: async () => {},
  updateCategory: async () => {},
  deleteCategory: async () => {},
  uploadImage: async () => {},
  deleteImage: async () => {},
  uploadFile: async () => {},
  deleteFile: async () => {},
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

  // ######### transactions #########

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('userId', User?.sub)
        .limit(10)
        .order('date', { ascending: false });

      if (error) {
        console.log('error getting transactions', error);
        throw new Error(error.message);
      }

      if (transactions) {
        setTransactionsData(transactions);
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
      Alert.alert('Transaction deleted successfully');
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
