import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/HelloWave';
import { transactions } from '@/Data';
import HomeTransactionCard from '@/components/HomeTransactionsCard';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const userCurrency = 'Ksh';
  const transactionsData = transactions.slice(0, 8);
  return (
    <SafeAreaView className='flex-1 bg-gray-100 px-2'>
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
      <>
        {/* Card */}
        <View
          style={{
            width: width * 0.95,
            height: height * 0.23,
          }}
          className='relative p-4 bg-[#fff] rounded-xl shadow-md -mt-8 '
        >
          <LinearGradient
            colors={['#787BE2', '#E2999A']}
            className='absolute top-0 left-0 right-0 bottom-0 rounded-xl'
          />
          <View className='flex flex-row justify-between -ml-1 px-1 mt-1'>
            <View>
              <Text className='text-xl font-bold text-green-700'>
                {userCurrency + '.'}580.00
              </Text>
              <Text className='text-gray-300 font-pbold'>Income</Text>
            </View>
            <View>
              <Text className='text-red-700 text-xl font-bold'>
                {userCurrency + '.'}500.00
              </Text>
              <Text className='text-gray-300 font-pbold'>Expenses</Text>
            </View>
            <View>
              <Text className='text-blue-700 text-xl font-bold'>
                {userCurrency + '.'}14.00
              </Text>
              <Text className='text-gray-300 font-pbold'>Tractions Costs</Text>
            </View>
          </View>
          <View className='relative flex flex-row -ml-1 overflow-hidden -bottom-5 w-full bg-transparent h-3 rounded-full border border-gray-50 items-center'>
            <View className='bg-green-700 ' style={{ width: '50%' }}>
              <Text></Text>
            </View>
            <View className='bg-red-700' style={{ width: '40%' }}>
              <Text></Text>
            </View>
            <View className='bg-blue-700' style={{ width: '10%' }}>
              <Text></Text>
            </View>
          </View>
          <View className='mt-7 flex flex-row justify-between mr-5 p-1 items-center'>
            <View className='flex-row items-center gap-1'>
              <View className='bg-green-700 h-3 w-3 rounded-full'></View>
              <Text className='text-white font-bold'>50%</Text>
            </View>
            <View className='flex-row items-center gap-1'>
              <View className='bg-red-700 h-3 w-3 rounded-full'></View>
              <Text className='text-white font-bold'>40%</Text>
            </View>
            <View className='flex-row items-center gap-1'>
              <View className='bg-blue-700 h-3 w-3 rounded-full'></View>
              <Text className='text-white font-bold'>10%</Text>
            </View>
          </View>
          <View className='absolute bottom-1 right-4 flex items-end'>
            <View className='flex flex-row mt-2 w-full'>
              <View className='w-8 h-8 rounded-full bg-[#EE401B] opacity-70'></View>
              <View className='w-8 h-8 rounded-full bg-[#F38D1B] opacity-70 right-3'></View>
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View className='flex-row justify-between mt-4 mb-4'>
          <Text className='text-[16px] font-pbold ml-2 text-gray-800'>
            Transactions
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
            <View className='flex-row items-center mr-2'>
              <Text className='text-[15px] font-semibold  text-gray-600'>
                View All
              </Text>
              <Ionicons name='chevron-forward' size={18} color='#000' />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={transactionsData}
          renderItem={HomeTransactionCard}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            <View>
              <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
                <View className='flex-row items-center justify-center bg-gray-200 h-14 w-full mr-3 rounded-full mt-4 mb-4'>
                  <View className='flex-row items-center'>
                    <Text className='text-[17px] font-semibold  text-gray-600'>
                      View All
                    </Text>
                    <Ionicons name='chevron-forward' size={18} color='#000' />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </>

      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
}
