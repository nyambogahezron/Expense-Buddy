import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import Loading from '@/components/ui/Loading';
import { useDataContext } from '@/context/DataProvider';
import IncomeBlockCard from '@/components/cards/IncomeBlockCard';
import TransactionFlatList from '@/components/cards/TransactionCard/FlatListCard';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import TopSpendingSection from '@/components/TopSpendingSection';

export default function HomeScreen() {
  const { transactionsData, isLoading, fetchTransactions } = useDataContext();
  const { theme } = useTheme();

  async function onRefresh() {
    await fetchTransactions();
  }

  const data = [
    { key: 'TopSpendingSection', component: <TopSpendingSection /> },
    { key: 'incomeCard', component: <IncomeBlockCard /> },
    // {
    //   key: 'transactions',
    //   component: <TransactionFlatList transactionsData={transactionsData} />,
    // },
  ];

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f2f2f2' : 'rgba(7, 11, 17,0.1)'}
      />

      {isLoading && <Loading />}
      <View style={styles.contentContainer}>
        <Animated.FlatList
          refreshing={false}
          onRefresh={onRefresh}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <View>{item.component}</View>}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.navigate('/(tabs)/create')}
      >
        <Ionicons name='add' size={24} color='white' />
      </TouchableOpacity>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  contentContainer: {
    marginTop: 48,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.orange,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
