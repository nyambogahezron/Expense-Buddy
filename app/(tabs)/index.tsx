import React from 'react';
import { View, TouchableOpacity, FlatList, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/HelloWave';
import { transactions } from '@/Data';
import HomeTransactionCard from '@/components/TransactionsCard';
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

export default function HomeScreen() {
  const transactionsData = transactions.slice(0, 8);
  const colorScheme = useColorScheme();
  const { User } = useGlobalContext();
  const { theme } = useTheme();

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
                  {User?.first_name}
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
      <View className='-mt-6'>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={transactionsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HomeTransactionCard item={item} />}
          ListHeaderComponent={<TransactionHeader viewMore={true} />}
          ListFooterComponent={
            <View>
              {transactionsData && transactionsData.length > 0 && (
                <LoadMoreBtn
                  handleOnPress={() => router.push('/(tabs)/explore')}
                  title='View All'
                />
              )}
            </View>
          }
          ListEmptyComponent={<EmptyListCard />}
        />
      </View>
    </ThemedSafeAreaView>
  );
}
