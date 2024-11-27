import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, SectionList, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TransactionCard from '@/components/cards/TransactionCard';
import ListHeader from '@/components/cards/TransactionCard/ListHeader';
import { TransactionProps } from '@/types';
import EmptyListCard from '@/components/EmptyListCard';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView, ThemedView } from '@/components/Themed';
import { useDataContext } from '@/context/DataProvider';
import Loading from '@/components/Loading';

type categoryType = 'All' | 'income' | 'expense';

export default function HomeScreen() {
  const [category, setCategory] = useState<categoryType>('All');
  const [data, setData] = useState<TransactionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionItems, setSectionItems] = useState(10);
  const { theme } = useTheme();
  const { transactionsData, fetchTransactions } = useDataContext();

  // get the first 10 transactions
  const transactions: TransactionProps[] = transactionsData.slice(
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

  // refresh transactions
  async function onRefresh() {
    await fetchTransactions();
    setCategory('All');
    setData(transactionsData);
  }

  // filter data based on category
  const filterData = (category: categoryType) => {
    // setData(transactionsData);
    setLoading(true);

    if (category === 'All') {
      setLoading(false);
      return setData(transactionsData);
    }
    const filteredData: TransactionProps[] = transactionsData.filter(
      (item: any) => item.type === category
    );
    setData(filteredData.slice(0, sectionItems));
    setLoading(false);
  };

  useEffect(() => {
    filterData(category);
  }, [category, sectionItems]);

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
        backgroundColor={theme === 'light' ? '#f2f2f2' : 'rgba(7, 11, 17,0.1)'}
      />
      <ThemedView className='mt-4'>
        <SectionList
          onRefresh={() => onRefresh()}
          refreshing={false}
          contentInsetAdjustmentBehavior='automatic'
          keyExtractor={(item) => item.id.toString()}
          sections={sections}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
          initialNumToRender={10}
          renderSectionHeader={() => (
            <ThemedView>
              {!loading && (
                <ThemedView className='flex-row justify-center gap-0'>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setCategory('All')}
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
                    onPress={() => setCategory('income')}
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
                    onPress={() => setCategory('expense')}
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
              )}
            </ThemedView>
          )}
          ListHeaderComponent={() => (
            <ListHeader viewMore={false} title='Recent Transactions' />
          )}
          renderItem={({ item }) => (
            <View>
              {loading ? <Loading /> : <TransactionCard item={item} />}
            </View>
          )}
          ListHeaderComponentStyle={{ marginTop: 1 }}
          ListFooterComponent={
            data.length > 10 ? (
              <LoadMoreBtn handleOnPress={handleLoadMore} title='Load More' />
            ) : null
          }
          ListEmptyComponent={<EmptyListCard />}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
