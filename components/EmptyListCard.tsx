import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ThemedText, ThemedView } from '@/components/Themed';

const width = Dimensions.get('window').width;
type title = { title?: string };

export default function EmptyListCard({ title = 'No Transactions' }: title) {
  return (
    <ThemedView className='flex justify-center items-center mt-10'>
      <View className='my-8'>
        <Text className='text-4xl font-pbold text-yellow-500'>
          Oops<Text className='text-4xl text-red-600'>!</Text>
        </Text>
      </View>
      <ThemedText
        lightColor='#6b7280'
        className='text-gray-500 font-bold text-xl'
      >
        {title}
      </ThemedText>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => router.push('/(tabs)/create')}
      >
        <View
          className='flex items-center justify-center bg-blue-600 h-12 mr-3 rounded-lg mt-6 mb-5'
          style={{ width: width * 0.89 }}
        >
          <View className='flex-row items-center'>
            <ThemedText className='text-[15px] font-semibold  text-white'>
              Add Transactions
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}
