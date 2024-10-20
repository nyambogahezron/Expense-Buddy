import React from 'react';
import { View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedSafeAreaView } from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import Loading from '@/components/Loading';
import { useDataContext } from '@/context/DataProvider';
import ExpenseBlock from '@/components/cards/ExpenseBlockCard';
import IncomeBlockCard from '@/components/cards/IncomeBlockCard';
import TransactionFlatList from '@/components/cards/TransactionCard/FlatListCard';

export default function HomeScreen() {
  const { transactionsData, isLoading, fetchTransactions } = useDataContext();
  const { theme } = useTheme();

  async function onRefresh() {
    await fetchTransactions();
  }

  const data = [
    { key: 'expense', component: <ExpenseBlock /> },
    { key: 'incomeCard', component: <IncomeBlockCard /> },
    {
      key: 'transactions',
      component: <TransactionFlatList transactionsData={transactionsData} />,
    },
  ];

  return (
    <ThemedSafeAreaView className='flex-1 px-2'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f2f2f2' : 'rgba(7, 11, 17,0.1)'}
      />

      {isLoading && <Loading />}
      <View className='mt-12'>
        <FlatList
          refreshing={false}
          onRefresh={onRefresh}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <View>{item.component}</View>}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ThemedSafeAreaView>
  );
}
