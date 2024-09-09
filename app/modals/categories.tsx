import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionCategories from '@/Data/TransactionsTypes';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const width = Dimensions.get('window').width;
export default function AddExpense() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='#161622' />

      <ScrollView className='flex-1'>
        {/* header  */}
        <View className='mb-5 items-center justify-center '>
          <Text className='text-lg font-bold'>Choose Transaction Category</Text>
        </View>
        <View className='flex flex-row flex-wrap justify-center items-center mb-6 gap-2 w-full mx-auto'>
          {TransactionCategories.map((item) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/create',
                  params: { category: JSON.stringify(item) },
                })
              }
              key={item.id}
              activeOpacity={0.8}
              className='flex-row justify-between items-center bg-[#f3f4f6] p-4 rounded-lg mb-1 w-full'
              style={{ width: width * 0.94 }}
            >
              <View className='flex-row items-center'>
                <View className='bg-[#fff] p-3 rounded-full mr-4'>
                  <Text>🛒</Text>
                </View>
                <View>
                  <Text className='font-bold text-gray-800'>{item.name}</Text>
                </View>
              </View>
              <AntDesign name='checkcircleo' size={20} color='green' />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
