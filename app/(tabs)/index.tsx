import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import TransactionCard from '@/components/TransactionsCard';
import EmptyListCard from '@/components/EmptyListCard';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import { ThemedSafeAreaView } from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import TransactionHeader from '@/components/TransactionHeader';
import { useGlobalContext } from '@/context/GlobalProvider';
import { supabase } from '@/utils/supabase';
import Loading from '@/components/Loading';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState<any>();
  const { User } = useGlobalContext();
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('userId', User?.sub)
          .limit(10)
          .order('date', { ascending: true });

        if (error) {
          console.log('error getting transactions', error);
          throw new Error(error.message);
        }

        if (transactions) {
          setIsLoading(false);
          // console.log('transactions',transactions);
          setTransactionsData(transactions);
        } else {
          setIsLoading(false);

          setTransactionsData([]);
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <ThemedSafeAreaView className='flex-1 px-2'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <View>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={transactionsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionCard item={item} />}
            ListHeaderComponent={<TransactionHeader viewMore={true} />}
            ListFooterComponent={
              <View>
                {transactionsData && transactionsData.length > 8 && (
                  <LoadMoreBtn
                    handleOnPress={() => router.push('/(tabs)/explore')}
                    title='View All'
                  />
                )}
              </View>
            }
            ListEmptyComponent={<EmptyListCard />}
          />
        )}
      </View>
    </ThemedSafeAreaView>
  );
}
