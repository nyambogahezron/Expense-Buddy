import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import {  Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { transactions } from '@/Data';
import TransactionCategories from '@/Data/TransactionsTypes';
import { TransactionProps } from '@/Types';
import { data, chartConfig, pieData, PieChartConfig } from '@/Data/ChartsData';
import CategoryCard from '@/components/CategoryCard';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CategoryActionCard from '@/components/CategoryActionCard';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from '@/components/Themed';
import BackButton from '@/components/BackButton';
import HeaderRightIconCard from '@/components/HeaderRightIconCard';
const width = Dimensions.get('window').width;

export default function Statistics() {
  const [activeCategory, setActiveCategory] = useState<'income' | 'expense'>(
    'income'
  );
  const [Transactions, setTransactions] = useState<TransactionProps[]>([]);
  const { theme } = useTheme();

  const snapPoints = useMemo(() => ['30%', '35%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  // get top five transactions
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
    <GestureHandlerRootView
      className={`flex-1 ${theme === 'light' ? 'bg-gray-100' : 'bg-[#070B11]'}`}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen
          options={{
            title: 'Reports',
            headerShown: true,
            headerTitleAlign: 'center',
            statusBarStyle: theme === 'light' ? 'dark' : 'light',
            headerStyle: {
              backgroundColor: theme === 'light' ? '#fff' : '#070B11',
            },
            headerLeft: () => <BackButton />,
            headerTitleStyle: {
              color: theme === 'light' ? '#333' : '#fff',
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerRight: () => (
              <HeaderRightIconCard
                handleOnPress={() => router.push('/(profile)/settings')}
              >
                <Ionicons
                  name='settings-outline'
                  size={22}
                  color={theme === 'light' ? 'black' : '#fff'}
                />
              </HeaderRightIconCard>
            ),
          }}
        />
        <ThemedView className='px-3'>
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
            {Transactions.map((item) => {
              const { id, title, type, amount, date, category } = item;
              return (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/(transactions)/details',
                      params: { item: JSON.stringify(item) },
                    })
                  }
                  activeOpacity={0.7}
                  key={id}
                  className={`flex-row justify-between items-center bg-red-100 p-4 rounded-lg mb-1 ${
                    type === 'expense' ? 'bg-red-50' : 'bg-green-50'
                  } ${theme === 'light' ? '' : 'bg-[#1c1c1e]'}`}
                >
                  <View className='flex-row items-center'>
                    <View className='bg-red-200 p-3 rounded-full mr-4'>
                      <Text>{category.icon}</Text>
                    </View>
                    <View>
                      <ThemedText className='font-bold '>{title}</ThemedText>
                      <ThemedText
                        darkColor='#ccc'
                        lightColor='#6b7280 '
                        className='text-sm'
                      >
                        {date}
                      </ThemedText>
                    </View>
                  </View>
                  <Text
                    className={` font-bold ${
                      type === 'expense' ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {'KSH' + amount}
                  </Text>
                </TouchableOpacity>
              );
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
          {TransactionCategories.slice(0, 5).map((item) => {
            const { id, name, icon } = item;
            return (
              <CategoryCard
                key={id}
                handleOnPress={() =>
                  router.push({
                    pathname: '/modals/categoriesDetails',
                    params: { item: JSON.stringify(item) },
                  })
                }
                handleOpenPress={handleOpenPress}
                id={id}
                name={name}
                icon={icon}
              />
            );
          })}

          <LoadMoreBtn
            title='View All'
            handleOnPress={() => router.push('/modals/categories')}
          />
        </ThemedView>
      </ScrollView>

      {/* actions BottomSheet */}
      <BottomSheet
        detached={true}
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        backgroundStyle={{
          backgroundColor: '#1B1F24',
          alignItems: 'center',
          borderRadius: 0,
        }}
      >
        <CategoryActionCard handleClosePress={handleClosePress} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
