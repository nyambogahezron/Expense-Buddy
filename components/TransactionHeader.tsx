import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionHeader({ viewMore }: { viewMore: boolean }) {
  return (
    <View className='flex-row justify-between mt-4 mb-4'>
      <Text className='text-[16px] font-pbold ml-2 text-gray-800'>
        Transactions
      </Text>
      {viewMore && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <View className='flex-row items-center mr-2'>
            <Text className='text-[15px] font-semibold  text-gray-600'>
              View All
            </Text>
            <Ionicons name='chevron-forward' size={18} color='#000' />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
