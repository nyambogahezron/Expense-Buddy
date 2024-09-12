import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { transactions } from '@/Data';
import TransactionCategories from '@/Data/TransactionsTypes';
import { TransactionProps } from '@/Types';
import { data, chartConfig, pieData, PieChartConfig } from '@/Data/ChartsData';
import CategoryCard from '@/components/CategoryCard';

const width = Dimensions.get('window').width;
const Statistics = () => {
  const [activeCategory, setActiveCategory] = useState<'income' | 'expense'>(
    'income'
  );
  const [Transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    const filteredTransactions: TransactionProps[] = transactions
      .filter(
        (transaction: TransactionProps) => transaction.type === activeCategory
      )
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, 5);
    setTransactions(filteredTransactions);
  }, [activeCategory]);

  const handleCatagories = (category: 'income' | 'expense') => {
    setActiveCategory(category);
    console.log(activeCategory);
  };
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='#161622' />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen
          options={{
            title: 'Reports',
            headerShown: true,
            headerTitleAlign: 'center',
            statusBarStyle: 'dark',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2 '
              >
                <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                  <Feather name='arrow-left' size={22} />
                </View>
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              color: '#333',
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => router.push('/(profile)/settings')}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2'
              >
                <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                  <Ionicons name='settings-outline' size={22} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <View className='px-3'>
          <View className='items-center w-full px-2'>
            {/* Income and Expenses Summary */}
            <View className='flex-row justify-between mb-4'>
              <View className='bg-purple-100 p-6 rounded-lg items-center w-1/2 mr-2'>
                <Text className='text-purple-700 font-bold'>Total Income</Text>
                <Text className='text-xl font-bold text-purple-700'>
                  KSH.8,500
                </Text>
              </View>
              <View className='bg-orange-100 p-6 rounded-lg items-center w-1/2 ml-2'>
                <Text className='text-orange-700 font-bold'>
                  Total Expenses
                </Text>
                <Text className='text-xl font-bold text-orange-700'>
                  KSH.3,800
                </Text>
              </View>
            </View>

            {/* Statistics */}
            <View className='my-3 items-center'>
              <Text className='text-lg font-bold text-gray-800 mb-5'>
                Statistics
              </Text>
              <Text className='text-sm text-gray-500'>Apr 01 - Apr 30</Text>
            </View>
          </View>

          <View className='mt-4 items-center' style={{ width: width * 0.95 }}>
            {/* Bar Chart */}
            <BarChart
              data={data}
              width={width * 0.95}
              height={220}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              yAxisLabel='KSH'
              yAxisSuffix=''
            />
          </View>

          <View>
            {/* Income and Expenses Tabs */}
            <View className='flex-row justify-center my-6'>
              <TouchableOpacity
                onPress={() => handleCatagories('income')}
                className={`bg-white p-4 rounded-l-full border border-gray-200 w-1/2 items-center ${
                  activeCategory === 'income' ? 'bg-orange-500' : 'bg-white'
                }`}
              >
                <Text
                  className={`text-black font-bold ${
                    activeCategory === 'income' ? 'text-white' : 'text-black'
                  }`}
                >
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCatagories('expense')}
                className={`border border-gray-200 bg-white p-4 rounded-r-full w-1/2 items-center ${
                  activeCategory === 'expense' ? 'bg-orange-500' : 'bg-white'
                }`}
              >
                <Text
                  className={`text-black font-bold ${
                    activeCategory === 'expense' ? 'text-white' : 'text-black'
                  }`}
                >
                  Expenses
                </Text>
              </TouchableOpacity>
            </View>

            <View className='my-2 ml-2'>
              <Text className='text-lg text-black font-bold capitalize'>
                Top Five {activeCategory}
              </Text>
            </View>

            {/* Expense Detail */}
            {Transactions.map((item) => {
              const { id, title, type, amount, date } = item;
              return (
                <View
                  key={id}
                  className={`flex-row justify-between bg-red-100 p-4 rounded-lg mb-4 ${
                    type === 'expense' ? 'bg-red-50' : 'bg-green-50'
                  }`}
                >
                  <View className='flex-row items-center'>
                    <View className='bg-red-200 p-3 rounded-full mr-4'>
                      <Text>🛒</Text>
                    </View>
                    <View>
                      <Text className='font-bold text-gray-800'>{title}</Text>
                      <Text className='text-gray-500'>{date}</Text>
                    </View>
                  </View>
                  <Text
                    className={` font-bold ${
                      type === 'expense' ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {'KSH' + amount}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className='my-3'>
            <Text className='ml-2 text-lg text-black font-bold'>
              Top Five Transactions
            </Text>
            {/* PieChart Graph */}
            <View
              className='flex items-center justify-center mb-4'
              style={{ width: width * 0.9 }}
            >
              <PieChart
                data={pieData}
                width={width}
                height={150}
                chartConfig={PieChartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'-5'}
                center={[10, 10]}
                absolute
              />
            </View>
          </View>

          {/* Expense Detail */}
          <View className='my-3'>
            <Text className='ml-2 text-lg text-black font-bold'>
              Categories
            </Text>
          </View>
          {TransactionCategories.slice(0, 5).map((item) => {
            const { id, name, icon } = item;
            return (
              <CategoryCard
                handleOnPress={() =>
                  router.push({
                    pathname: '/modals/categoriesDetails',
                    params: { item: JSON.stringify(item) },
                  })
                }
                id={id}
                name={name}
                icon={icon}
              />
            );
          })}

          <View className='items-center'>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => router.push('/modals/categories')}
            >
              <View
                className='flex-row items-center justify-center bg-gray-200 h-10 rounded-md mt-2 mb-4'
                style={{ width: width * 0.86 }}
              >
                <View className='flex-row items-center gap-2'>
                  <Text className='text-sm font-semibold  text-gray-600'>
                    View All
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Statistics;
