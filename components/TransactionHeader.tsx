import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './Themed';
import { useTheme } from '@/context/ThemeProvider';

export default function TransactionHeader({ viewMore }: { viewMore: boolean }) {
  const { theme } = useTheme();
  return (
    <View className='flex-row justify-between mt-4 mb-4'>
      <ThemedText className='text-[16px] font-pbold ml-2 '>
        Transactions
      </ThemedText>
      {viewMore && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <View className='flex-row items-center mr-2'>
            <ThemedText className='text-sm font-semibold '>View All</ThemedText>
            <Ionicons
              name='chevron-forward'
              size={18}
              color={theme === 'light' ? '#000' : '#fff'}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
