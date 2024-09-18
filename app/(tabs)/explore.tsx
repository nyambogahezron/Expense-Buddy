import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { transactions } from '@/Data';
import TransactionCard from '@/components/TransactionsCard';
import TransactionHeader from '@/components/TransactionHeader';
import { TransactionProps } from '@/Types';
import EmptyListCard from '@/components/EmptyListCard';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView, ThemedView } from '@/components/Themed';

type categoryType = 'All' | 'income' | 'expense';

export default function HomeScreen() {
  const [category, setCategory] = useState<categoryType>('All');
  const [data, setData] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [sectionItems, setSectionItems] = useState(10);
  const { theme } = useTheme();

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
    <ThemedSafeAreaView className='flex-1 px-2'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen
        options={{
          title: 'Explore',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className={`bg-opacity-50 rounded-lg p-1 py-2 ${
                theme === 'light' ? 'bg-white' : 'bg-[#070B11]'
              }`}
            >
              <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                <Feather name='arrow-left' size={22} />
              </View>
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => router.push('/(profile)/settings')}
              className={` bg-opacity-50 rounded-lg p-1 py-2 {theme === 'light' ? 'bg-white' : 'bg-[#070B11]'}`}
            >
              <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                <Ionicons name='settings-outline' size={22} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <ThemedView>
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
          ListHeaderComponentStyle={{ marginTop: 1 }}
          ListHeaderComponent={
            <ThemedView>
              <ThemedView className='flex-row justify-center gap-0'>
                <TouchableOpacity
                  activeOpacity={0.7}
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
                  activeOpacity={0.7}
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
                  activeOpacity={0.7}
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
              </ThemedView>
              <TransactionHeader viewMore={false} />
            </ThemedView>
          }
          ListFooterComponent={
            <LoadMoreBtn handleOnPress={handleLoadMore} title='Load More' />
          }
          ListEmptyComponent={<EmptyListCard />}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
