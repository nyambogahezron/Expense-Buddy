import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/HelloWave';
import TransactionCard from '@/components/TransactionsCard';
import EmptyListCard from '@/components/EmptyListCard';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import {
  ThemedText,
  ThemedSafeAreaView,
  ThemedView,
} from '@/components/Themed';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeProvider';
import TransactionHeader from '@/components/TransactionHeader';
import { useGlobalContext } from '@/context/GlobalProvider';
import { supabase } from '@/utils/supabase';
import Loading from '@/components/Loading';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState<any>();
  const colorScheme = useColorScheme();
  const { User } = useGlobalContext();
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('userId', User?.sub)
          .limit(10)
          .order('date', { ascending: true });

        if (error) {
          console.log('error getting transactions', error);
          throw new Error(error.message);
        }

        if (transactions) {
          setIsLoading(false);
          // console.log('transactions',transactions);
          setTransactionsData(transactions);
        } else {
          setIsLoading(false);

          setTransactionsData([]);
        }
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <ThemedSafeAreaView className='flex-1 px-2'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      {/* Header */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => (
            <ThemedView lightColor='#fff' className='ml-2 px-2'>
              <View className='flex '>
                <View className='flex flex-row'>
                  <ThemedText style={{ fontSize: 15 }}>
                    Welcome Back!
                  </ThemedText>
                  <HelloWave />
                </View>
                <ThemedText className='text-lg font-bold'>
                  {User?.name}
                </ThemedText>
              </View>
            </ThemedView>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              style={{
                backgroundColor: Colors[colorScheme ?? 'light'].text,
                padding: 8,
                borderRadius: 50,
                shadowColor: '#171717',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
              className='mr-2'
            >
              <Ionicons name='person' size={23} />
            </TouchableOpacity>
          ),
        }}
      />
      <View className='-mt-10'>
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
