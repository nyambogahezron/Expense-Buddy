import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import Loading from '@/components/ui/Loading';
import { useDataContext } from '@/context/DataProvider';
import IncomeBlockCard from '@/components/cards/IncomeBlockCard';
import Animated from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import TopSpendingSection from '@/components/TopSpendingSection';
import useColorScheme from '@/hooks/useColorScheme';
import Fab from '@/components/ui/Fab';

export default function HomeScreen() {
  const { isLoading, fetchTransactions } = useDataContext();
  const { theme } = useTheme();

  async function onRefresh() {
    await fetchTransactions();
  }

  const data = [
    { key: 'TopSpendingSection', component: <TopSpendingSection /> },
    { key: 'incomeCard', component: <IncomeBlockCard /> },
  ];

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={
          Colors[useColorScheme('headerBackground')].headerBackground
        }
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

      <Fab />
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
