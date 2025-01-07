import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TransactionProps } from '@/types';
import CategoryCard from '@/components/cards/CategoryCard';
import CategoryActionCard from '@/components/cards/CategoryCard/CategoryActionCardModel';
import LoadMoreBtn from '@/components/ui/LoadMoreBtn';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { useDataContext } from '@/context/DataProvider';
import TransactionCard from '@/components/cards/TransactionCard';
import { useGlobalContext } from '@/context/GlobalProvider';
import SummaryChart from '@/components/Charts/SummaryOverview';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import ExpenseBlockCard from '@/components/cards/ExpenseBlockCard';

const width = Dimensions.get('window').width;

export default function Statistics() {
  const { theme } = useTheme();
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
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <ThemedView style={styles.mainContainer}>
          <View style={styles.summaryContainer}>
            {/* Income and Expenses Summary */}
            <View style={styles.summaryRow}>
              <View style={styles.incomeContainer}>
                <Text style={styles.incomeText}>Total Income</Text>
                <Text style={styles.incomeAmount}>
                  {UserCurrency}.{totalIncome}
                </Text>
              </View>
              <View style={styles.expenseContainer}>
                <Text style={styles.expenseText}>Total Expenses</Text>
                <Text style={styles.expenseAmount}>
                  {UserCurrency}.{totalExpense}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.chartContainer}>
            {/* Bar Chart */}
            <SummaryChart />
          </View>

          <View>
            {/* Income and Expenses Tabs */}
            <ThemedView style={styles.segmentedControlContainer}>
              <SegmentedControl
                values={['Income', 'Expense']}
                style={styles.segmentedControl}
                backgroundColor='#f97316'
                tintColor='#000'
                selectedIndex={activeCategory === 'income' ? 0 : 1}
                onChange={(event) => {
                  const index = event.nativeEvent.selectedSegmentIndex;
                  setActiveCategory(index === 0 ? 'income' : 'expense');
                }}
              />
            </ThemedView>

            <ThemedView style={styles.topFiveContainer}>
              <ThemedText style={styles.topFiveText}>
                Top Five {activeCategory}
              </ThemedText>
            </ThemedView>

            {/* Expense Detail */}
            {transactionsData &&
              transactionsData
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

          <ThemedView style={styles.expenseBlockContainer}>
            <ExpenseBlockCard />
            <View style={styles.expenseBlockInnerContainer}></View>
          </ThemedView>

          {/* Expense Detail */}
          <ThemedView style={styles.categoriesContainer}>
            <ThemedText style={styles.categoriesText}>Categories</ThemedText>
          </ThemedView>
          {categoriesData &&
            categoriesData.slice(0, 5).map((item: any) => {
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
            handleOnPress={() => router.push('/(tabs)')}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    marginTop: -10,
  },
  mainContainer: {
    paddingHorizontal: 12,
    marginBottom: 80,
  },
  summaryContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  incomeContainer: {
    backgroundColor: '#E9D5FF',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginRight: 4,
  },
  incomeText: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  incomeAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  expenseContainer: {
    backgroundColor: '#FFEDD5',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginLeft: 4,
  },
  expenseText: {
    color: '#F97316',
    fontWeight: 'bold',
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F97316',
  },
  chartContainer: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
    width: width * 0.95,
  },
  segmentedControlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  segmentedControl: {
    width: width * 0.95,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  topFiveContainer: {
    marginVertical: 8,
    marginLeft: 8,
  },
  topFiveText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  expenseBlockContainer: {
    marginVertical: 12,
  },
  expenseBlockInnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: width * 0.9,
  },
  categoriesContainer: {
    marginVertical: 12,
  },
  categoriesText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// TODO work on categories crud
