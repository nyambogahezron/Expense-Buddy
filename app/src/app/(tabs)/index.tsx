import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import { useDataContext } from '@/context/DataProvider';
import IncomeBlockCard from '@/components/cards/IncomeBlockCard';
import Animated from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import TopSpendingSection from '@/components/TopSpendingSection';
import useColorScheme from '@/hooks/useColorScheme';
import Fab from '@/components/ui/Fab';
import EmptyListCard from '@/components/EmptyListCard';

export default function HomeScreen() {
  const { fetchTransactions, transactionsData } = useDataContext();
  const { theme } = useTheme();

  async function onRefresh() {
    await fetchTransactions();
  }

  const data = transactionsData
    ? [
        { key: 'TopSpendingSection', component: <TopSpendingSection /> },
        { key: 'incomeCard', component: <IncomeBlockCard /> },
      ]
    : [];

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={Colors[useColorScheme('background')].background}
      />
      <View style={styles.contentContainer}>
        <Animated.FlatList
          refreshing={false}
          onRefresh={onRefresh}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <View>{item.component}</View>}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <EmptyListCard
              boldTitle='Welcome'
              title='To get started add transactions'
            />
          )}
        />
      </View>

      <Fab onPress={() => {}} />
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
});
