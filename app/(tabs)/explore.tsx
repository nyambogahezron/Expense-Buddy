import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { transactions } from '@/Data';
import HomeTransactionCard from '@/components/HomeTransactionsCard';
import ExploreStatistics from '@/components/ExploreStatistics';

type TransactionCategoryProps = 'income' | 'expense' | 'All';

type TransactionProps = {
  id: number;
  category: TransactionCategoryProps;
  // Add other properties as needed
};

const width = Dimensions.get('window').width;

export default function HomeScreen() {
  const [category, setCategory] = React.useState<TransactionCategoryProps>('All');
  const [data, setData] = React.useState<TransactionProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sectionItems, setSectionItems] = React.useState<number>(10);

  const transactionsData: TransactionProps[] = transactions.slice(0, sectionItems);

  const handleLoadMore = () => {
    setLoading(true);
    const newLength = Math.min(sectionItems + 10, transactions.length);
    setSectionItems(newLength);
    setLoading(false);
  };

  const filterData = (category: TransactionCategoryProps) => {
    if (category === 'All') {
      setData(transactionsData);
    } else {
      const filteredData: TransactionProps[] = transactions.filter(
        (item) => item.category === category
      );
      setData(filteredData.slice(0, sectionItems));
    }
  };

  React.useEffect(() => {
    filterData(category);
  }, [sectionItems, category]);

  return (
    <SafeAreaView className='flex-1 bg-gray-100 px-2'>
      <StatusBar style='light' backgroundColor='#161622' />
      <Stack.Screen
        options={{
          title: 'Explore',
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
      <View>
        {/* <ExploreStatistics /> */}
        <View className='flex-row items-center justify-center gap-2 mt-1 mb-2'>
          <TouchableOpacity
            onPress={() => {
              setCategory('income');
              filterData('income');
            }}
            activeOpacity={0.6}
            className='flex items-center text-lg font-psemibold p-3 rounded-lg bg-blue-500'
            style={{ width: width * 0.42 }}
          >
            <Text className='text-white'>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCategory('expense');
              filterData('expense');
            }}
            activeOpacity={0.6}
            className='flex items-center text-lg font-psemibold p-3 rounded-lg bg-red-500'
            style={{ width: width * 0.42 }}
          >
            <Text className='text-white'>Expense</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-between mt-4 mb-4'>
          <Text className='text-[16px] font-pbold ml-2 text-gray-800'>
            Transactions
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data.length === 0 ? transactionsData : data}
          renderItem={({ item }) => <HomeTransactionCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            <View className='mb-28'>
              <TouchableOpacity activeOpacity={0.6} onPress={handleLoadMore}>
                <View className='flex-row items-center justify-center bg-gray-200 h-10 w-full mr-3 rounded-md mt-2 mb-4'>
                  <View className='flex-row items-center gap-2'>
                    <Text className='text-sm font-semibold  text-gray-600'>
                      Load more
                    </Text>
                    {loading && <ActivityIndicator />}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}