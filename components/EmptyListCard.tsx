import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const width = Dimensions.get('window').width;

export default function EmptyListCard() {
  return (
    <View className='flex justify-center items-center mt-10'>
      <Text className='text-gray-500 font-bold text-xl'>No Transactions</Text>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => router.push('/(tabs)/create')}
      >
        <View
          className='flex items-center justify-center bg-blue-600 h-12 mr-3 rounded-lg mt-6 mb-4'
          style={{ width: width * 0.9 }}
        >
          <View className='flex-row items-center'>
            <Text className='text-[15px] font-semibold  text-white'>
              Add Transactions
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}