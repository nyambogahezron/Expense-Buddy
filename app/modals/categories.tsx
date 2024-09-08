import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionCategories from '@/Data/TransactionsTypes';
import { router } from 'expo-router';

const width = Dimensions.get('window').width;
export default function AddExpense() {

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='#161622' />

      <ScrollView className='flex-1'>
        {/* header  */}
        <View className='mb-5 mt-4 items-center justify-center '>
          <Text className='text-lg font-bold'>Choose Transaction Category</Text>
        </View>
        <View className='flex flex-row flex-wrap justify-center items-center mb-6 mt-2 gap-2 w-full'>
          {TransactionCategories.map((item) => (
            <TouchableOpacity
              style={{ width: width / 2.6 }}
              activeOpacity={0.8}
              key={item.id}
              className={`h-20 items-center justify-center bg-gray-100 p-3 m-2 rounded-lg`}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/create',
                  params: { category: JSON.stringify(item) },
                })
              }
            >
              <Text className='text-green-700 font-psemibold'>🛫 </Text>
              <Text className='text-black font-psemibold'>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
