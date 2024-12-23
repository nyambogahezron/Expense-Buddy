import React from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import { useTheme } from '@/context/ThemeProvider';
import { useDataContext } from '@/context/DataProvider';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/cards/TransactionCard';
import Fab from '@/components/ui/Fab';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function Transactions() {
  const { transactionsData } = useDataContext();
  const { theme } = useTheme();

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={
          Colors[useColorScheme('headerBackground')].headerBackground
        }
      />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={transactionsData?.slice(0, 50) || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionCard item={item} />}
          ListEmptyComponent={
            <EmptyListCard title='No transactions available' />
          }
        />
      </View>
      <Fab onPress={() => router.push('/(tabs)/create')} />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  container: {
    marginTop: Platform.select({ android: -35, default: 0 }),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
