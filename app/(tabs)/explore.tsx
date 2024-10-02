import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, SectionList, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { transactions } from '@/data';
import TransactionCard from '@/components/TransactionsCard';
import TransactionHeader from '@/components/TransactionHeader';
import { TransactionProps } from '@/types';
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

  // get the first 10 transactions
  const transactionsData: TransactionProps[] = transactions.slice(
    0,
    sectionItems
  );

  // load more data
  const handleLoadMore = () => {
    setLoading(true);
    const newLength = Math.min(sectionItems + 10, transactions.length);
    setSectionItems(newLength);
    setLoading(false);
  };

  // filter data based on category

  const filterData = (category: categoryType) => {
    setData([]);
    setLoading(true);
    if (category === 'All') {
      setData(transactionsData);
    } else {
      const filteredData: TransactionProps[] = transactions.filter(
        (item) => item.type === category
      );
      setData(filteredData.slice(0, sectionItems));
    }
    setLoading(false);
  };
  useEffect(() => {
    filterData(category);
  }, [sectionItems, category]);

  // set data to be displayed in the section list
  const sections = [
    {
      title: category,
      data: data,
    },
  ];

  return (
    <ThemedSafeAreaView className='flex-1 px-2'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <ThemedView className='mt-4'>
        {/* transactions list  */}
        <SectionList
          contentInsetAdjustmentBehavior='automatic'
          keyExtractor={(item) => item.id.toString()}
          sections={sections}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
          initialNumToRender={10}
          renderSectionHeader={() => (
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
            </ThemedView>
          )}
          ListHeaderComponent={() => <TransactionHeader viewMore={false} />}
          renderItem={({ item }) => (
            <TransactionCard item={item} />
          )}
          ListHeaderComponentStyle={{ marginTop: 1 }}
          ListFooterComponent={
            <LoadMoreBtn handleOnPress={handleLoadMore} title='Load More' />
          }
          ListEmptyComponent={<EmptyListCard />}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
