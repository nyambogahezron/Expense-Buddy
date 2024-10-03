import { View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import TransactionCard from '@/components/TransactionsCard';
import EmptyListCard from '@/components/EmptyListCard';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import { ThemedSafeAreaView } from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import TransactionHeader from '@/components/TransactionHeader';
import Loading from '@/components/Loading';
import { useDataContext } from '@/context/DataProvider';

export default function HomeScreen() {
  const { transactionsData, isLoading } = useDataContext();
  const { theme } = useTheme();

  return (
    <ThemedSafeAreaView className='flex-1 px-2'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <View>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={transactionsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionCard item={item} />}
            ListHeaderComponent={<TransactionHeader viewMore={true} />}
            ListFooterComponent={
              <View>
                {transactionsData && transactionsData.length > 8 && (
                  <LoadMoreBtn
                    handleOnPress={() => router.push('/(tabs)/explore')}
                    title='View All'
                  />
                )}
              </View>
            }
            ListEmptyComponent={<EmptyListCard />}
          />
        )}
      </View>
    </ThemedSafeAreaView>
  );
}
