import { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  SectionList,
  View,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TransactionCard from '@/components/cards/TransactionCard';
import ListHeader from '@/components/cards/TransactionCard/ListHeader';
import { TransactionProps } from '@/types';
import EmptyListCard from '@/components/EmptyListCard';
import LoadMoreBtn from '@/components/ui/LoadMoreBtn';
import { useTheme } from '@/context/ThemeProvider';
import ThemedText from '@/components/ui/Text';
import ThemedView from '@/components/ui/View';
import { useDataContext } from '@/context/DataProvider';
import Loading from '@/components/ui/Loading';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';

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
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f2f2f2' : 'rgba(7, 11, 17,0.1)'}
      />
      <ThemedView style={styles.themedView}>
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
                <ThemedView style={styles.buttonContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setCategory('All')}
                    style={[
                      styles.button,
                      styles.buttonLeft,
                      category === 'All' && styles.buttonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        category === 'All' && styles.buttonTextActive,
                      ]}
                    >
                      All
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setCategory('income')}
                    style={[
                      styles.button,
                      styles.buttonMiddle,
                      category === 'income' && styles.buttonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        category === 'income' && styles.buttonTextActive,
                      ]}
                    >
                      Income
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setCategory('expense')}
                    style={[
                      styles.button,
                      styles.buttonRight,
                      category === 'expense' && styles.buttonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        category === 'expense' && styles.buttonTextActive,
                      ]}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  themedView: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    width: '33.33%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonLeft: {
    borderTopLeftRadius: 9999,
    borderBottomLeftRadius: 9999,
  },
  buttonMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonRight: {
    borderTopRightRadius: 9999,
    borderBottomRightRadius: 9999,
  },
  buttonActive: {
    backgroundColor: '#f97316',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonTextActive: {
    color: 'white',
  },
});
