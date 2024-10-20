import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TransactionProps } from '@/types';
import { data, chartConfig, pieData, PieChartConfig } from '@/data/ChartsData';
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

const width = Dimensions.get('window').width;

export default function Statistics() {
  const { theme } = useTheme();
  const { transactionsData, categoriesData } = useDataContext();
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

  const handleCatagories = (category: 'income' | 'expense') =>
    setActiveCategory(category);

  return (
    <ThemedSafeAreaView>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView className='px-3 mb-20'>
          <View className='items-center w-full px-2'>
            {/* Income and Expenses Summary */}
            <View className='flex-row justify-between mb-4 mt-2'>
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
              <ThemedText className='text-sm font-bold mb-5'>
                Statistics
              </ThemedText>
              <ThemedText lightColor='#6b7280' className='text-sm'>
                Apr 01 - Apr 30
              </ThemedText>
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
            <ThemedView className='flex-row justify-center my-6'>
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
            </ThemedView>

            <ThemedView className='my-2 ml-2'>
              <ThemedText className='text-lg  font-bold capitalize'>
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
            <ThemedText darkColor='#fff' className='ml-2 text-lg font-bold'>
              Top Five Transactions
            </ThemedText>
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
