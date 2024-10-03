import { supabase } from '@/utils/supabase';
import React, { createContext, useContext } from 'react';
import { useGlobalContext } from './GlobalProvider';
import { Alert } from 'react-native';

const DataContext = createContext<any>(null);

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { User } = useGlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactionsData, setTransactionsData] = React.useState<any>();

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
      Alert.alert('Transaction deleted successfully');
      fetchTransactions();
    } catch (error) {
      console.log('error deleting transaction', error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (User) {
      fetchTransactions();
    }
  }, [User]);

  return (
    <DataContext.Provider
      value={{
        transactionsData,
        isLoading,
        fetchTransactions,
        deleteTransaction,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
