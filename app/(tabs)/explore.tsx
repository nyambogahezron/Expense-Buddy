import { useState,useEffect } from 'react';
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
import TransactionCard from '@/components/TransactionsCard';
import TransactionHeader from '@/components/TransactionHeader';
import { TransactionProps } from '@/Types';
import EmptyListCard from '@/components/EmptyListCard';

const width = Dimensions.get('window').width;
type categoryType = 'All' | 'income' | 'expense';

export default function HomeScreen() {
  const [category, setCategory] = useState<categoryType>('All');
  const [data, setData] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [sectionItems, setSectionItems] = useState(10);

  const transactionsData: TransactionProps[] = transactions.slice(
    0,
    sectionItems
  );

  const handleLoadMore = () => {
    setLoading(true);
    const newLength = Math.min(sectionItems + 10, transactions.length);
    setSectionItems(newLength);
    setLoading(false);
  };

  const filterData = (category: categoryType) => {
    setData([]);
    setLoading(true);
    if (category.toString() === 'All') {
      setData(transactionsData);
      setLoading(false);
    } else {
      const filteredData: TransactionProps[] = transactions.filter(
        (item) => item.type === category.toString()
      );
      setData(filteredData.slice(0, sectionItems));
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    filterData(category as categoryType);
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
      <View className='-mt-8'>
        {/* transactions list  */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <TransactionCard item={item} isLoading={loading} />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponentStyle={{ marginTop: 10 }}
          ListHeaderComponent={
            <View>
              <View className='flex-row justify-center gap-0'>
                <TouchableOpacity
                  onPress={() => {
                    setCategory('All');
                    filterData('All');
                  }}
                  className={`p-4 rounded-l-full w-1/3 items-center ${
                    category === 'All' ? 'bg-orange-500' : 'bg-white'
                  }`}
                >
                  <Text
                    className={`text-black font-bold ${
                      category === 'All' ? 'text-white' : ''
                    }`}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCategory('income');
                    filterData('income');
                  }}
                  className={`bg-white p-4 border-l border-r border-gray-200 w-1/3 items-center ${
                    category === 'income' ? 'bg-orange-500' : 'bg-white'
                  }`}
                >
                  <Text
                    className={`text-black font-bold ${
                      category === 'income' ? 'text-white' : ''
                    }`}
                  >
                    Income
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCategory('expense');
                    filterData('expense');
                  }}
                  className={`p-4 rounded-r-full w-1/3 items-center ${
                    category === 'expense' ? 'bg-orange-500' : 'bg-white'
                  }`}
                >
                  <Text
                    className={`text-black font-bold ${
                      category === 'expense' ? 'text-white' : ''
                    }`}
                  >
                    Expenses
                  </Text>
                </TouchableOpacity>
              </View>
              <TransactionHeader viewMore={false} />
            </View>
          }
          ListFooterComponent={
            <View className='flex-row items-center justify-center mb-5'>
              <TouchableOpacity activeOpacity={0.6} onPress={handleLoadMore}>
                <View
                  className='flex-row items-center justify-center bg-gray-200 h-10 rounded-md mt-2 mb-4'
                  style={{ width: width * 0.86 }}
                >
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
          ListEmptyComponent={<EmptyListCard />}
        />
      </View>
    </SafeAreaView>
  );
}
