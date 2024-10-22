import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TransactionProps } from '@/types';
import CategoryCard from '@/components/cards/CategoryCard';
import CategoryActionCard from '@/components/cards/CategoryCard/CategoryActionCardModel';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import { useTheme } from '@/context/ThemeProvider';
import {
  ThemedSafeAreaView,
  ThemedText,
  ThemedView,
} from '@/components/Themed';
import { useDataContext } from '@/context/DataProvider';
import TransactionCard from '@/components/cards/TransactionCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import SummaryChart from '@/components/Charts/SummaryOverview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import ExpenseBlockCard from '@/components/cards/ExpenseBlockCard';

const width = Dimensions.get('window').width;

export default function Statistics() {
  const { theme } = useTheme();
  const { expenseList } = useDataContext();
  const { transactionsData, categoriesData, totalExpense, totalIncome } =
    useDataContext();
  const { UserCurrency } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'income' | 'expense'>(
    'income'
  );
  const [activeTransaction, setActiveTransaction] = useState();

  // open and close actions modal
  const handleOpenPress = (item: any) => {
    setModalVisible(true);
    setActiveTransaction(item);
  };
  const handleClosePress = () => setModalVisible(false);

  return (
    <ThemedSafeAreaView>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className='-mt-10'
      >
        <ThemedView className='px-3 mb-20'>
          <View className='items-center w-full px-2'>
            {/* Income and Expenses Summary */}
            <View className='flex-row justify-between mb-4 mt-2'>
              <View className='bg-purple-100 p-6 rounded-lg items-center w-1/2 mr-2'>
                <Text className='text-purple-700 font-bold'>Total Income</Text>
                <Text className='text-xl font-bold text-purple-700'>
                  {UserCurrency}.{totalIncome}
                </Text>
              </View>
              <View className='bg-orange-100 p-6 rounded-lg items-center w-1/2 ml-2'>
                <Text className='text-orange-700 font-bold'>
                  Total Expenses
                </Text>
                <Text className='text-xl font-bold text-orange-700'>
                  {UserCurrency}.{totalExpense}
                </Text>
              </View>
            </View>
          </View>

          <View
            className='mt-4 items-center p-2 '
            style={{ width: width * 0.95 }}
          >
            {/* Bar Chart */}
            <SummaryChart />
          </View>

          <View>
            {/* Income and Expenses Tabs */}
            <ThemedView className='flex-row justify-center mt-6 mb-2'>
              <SegmentedControl
                values={['Income', 'Expense']}
                style={{
                  width: width * 0.95,
                  height: 40,
                  borderRadius: 10,
                  padding: 10,
                }}
                backgroundColor='#f97316'
                tintColor='#000'
                selectedIndex={activeCategory === 'income' ? 0 : 1}
                onChange={(event) => {
                  const index = event.nativeEvent.selectedSegmentIndex;
                  setActiveCategory(index === 0 ? 'income' : 'expense');
                }}
              />
            </ThemedView>

            <ThemedView className='my-2 ml-2'>
              <ThemedText className='text-sm  font-bold capitalize'>
                Top Five {activeCategory}
              </ThemedText>
            </ThemedView>

            {/* Expense Detail */}
            {transactionsData
              .filter(
                (transaction: TransactionProps) =>
                  transaction.type === activeCategory
              )
              .sort((a: any, b: any) => Number(b.amount) - Number(a.amount))
              .slice(0, 5)
              .map((item: any) => {
                return <TransactionCard item={item} />;
              })}

            <LoadMoreBtn
              title='View All'
              handleOnPress={() => router.push('/(tabs)/explore')}
            />
          </View>

          <ThemedView className='my-3'>
            <ExpenseBlockCard />
            <View
              className='flex items-center justify-center mb-4'
              style={{ width: width * 0.9 }}
            ></View>
          </ThemedView>

          {/* Expense Detail */}
          <ThemedView className='my-3'>
            <ThemedText className='ml-2 text-lg font-bold'>
              Categories
            </ThemedText>
          </ThemedView>
          {categoriesData.slice(0, 5).map((item: any) => {
            const { id, name, icon } = item;
            return (
              <CategoryCard
                key={id}
                handleOnPress={() =>
                  router.push({
                    pathname: '/(categories)/details',
                    params: { item: JSON.stringify(item) },
                  })
                }
                handleOpenPress={() => handleOpenPress({ item })}
                id={id}
                name={name}
                icon={icon}
              />
            );
          })}

          <LoadMoreBtn
            title='View All'
            handleOnPress={() => router.push('/(categories)/')}
          />
        </ThemedView>
      </ScrollView>

      {/* actions BottomSheet model */}
      <CategoryActionCard
        handleClosePress={handleClosePress}
        item={activeTransaction}
        modalVisible={modalVisible}
      />
    </ThemedSafeAreaView>
  );
}
