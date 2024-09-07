import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/HelloWave';
import { transactions } from '@/Data';
import HomeTransactionCard from '@/components/TransactionsCard';
import HomeHeader from '@/components/HomeHeader';
import TransactionHeader from '@/components/TransactionHeader';
import EmptyListCard from '@/components/EmptyListCard';


export default function HomeScreen() {
  const transactionsData = transactions.slice(0, 8);
  return (
    <SafeAreaView className='flex-1 bg-gray-100 px-2'>
      <StatusBar style='light' backgroundColor='#161622' />
      {/* Header */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerStyle: { backgroundColor: '#f2f2f2' },
          headerLeft: () => (
            <View className='ml-2 p-2'>
              <View className='flex mb-1 mt-2'>
                <View className='flex flex-row'>
                  <Text style={{ fontSize: 15 }}>Welcome Back!</Text>
                  <HelloWave />
                </View>
                <Text className='text-lg font-bold'>John Doe</Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              style={{
                backgroundColor: '#fff',
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
      <View className='-mt-7'>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={transactionsData}
          renderItem={({ item }) => <HomeTransactionCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View>
              {/* Card */}
              <HomeHeader />

              {/* Transactions header */}
              <TransactionHeader viewMore={true} />
            </View>
          }
          ListFooterComponent={
            <View>
              {transactionsData && transactionsData.length > 0 && (
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/explore')}
                >
                  <View className='flex-row items-center justify-center bg-gray-200 h-10 w-full mr-3 rounded-full mt-4 mb-4'>
                    <View className='flex-row items-center'>
                      <Text className='text-[15px] font-semibold  text-gray-600'>
                        View All
                      </Text>
                      <Ionicons name='chevron-forward' size={18} color='#000' />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          }
          ListEmptyComponent={<EmptyListCard />}
        />
      </View>
    </SafeAreaView>
  );
}
