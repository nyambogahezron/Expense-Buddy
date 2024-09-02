import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
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
            <View className='ml-2'>
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

      {/* Card */}
      <LinearGradient
        colors={['##F570A0', '#805CDA']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        className='rounded-xl p-4 mb-4 -mt-8'
      >
        <View
          style={{
            width: width * 0.95,
            height: height * 0.2,
          }}
          className='p-1'
        >
          <View className='flex flex-row justify-around -ml-8'>
            <View>
              <Text className='text-xl font-bold text-green-700'>$580.00</Text>
              <Text className='text-gray-300 font-pbold'>Income</Text>
            </View>
            <View>
              <Text className='text-red-700 text-xl font-bold'>$500.00</Text>
              <Text className='text-gray-300 font-pbold'>Expenses</Text>
            </View>
            <View>
              <Text className='text-blue-700 text-xl font-bold'>$14.00</Text>
              <Text className='text-gray-300 font-pbold'>Tractions Costs</Text>
            </View>
          </View>
          <View className='relative flex flex-row -ml-1 overflow-hidden -bottom-5 w-[95%] bg-transparent h-3 rounded-full border border-gray-50 items-center'>
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
          <View className='mt-8 flex flex-row justify-between mr-5 p-1 items-center'>
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
          <View className='absolute -bottom-2 right-4 flex items-end'>
            <View className='flex flex-row mt-2 w-full'>
              <View className='w-7 h-7 rounded-full bg-[#EE401B] opacity-70'></View>
              <View className='w-7 h-7 rounded-full bg-[#F38D1B] opacity-70 right-3'></View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Transactions */}
      <View className='flex-row justify-between mt-2 mb-4'>
        <Text className='text-[16px] font-pbold ml-2 text-gray-800'>
          Transactions
        </Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
          <View className='flex-row items-center'>
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
        data={transactions}
        renderItem={HomeTransactionCard}
        keyExtractor={(item) => item.id}
      />

      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
}
