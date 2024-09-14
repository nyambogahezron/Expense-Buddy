import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
type LoadMoreBtnProps = {
  handleOnPress: () => void;
  title: string;
};

export default function LoadMoreBtn({
  handleOnPress,
  title,
}: LoadMoreBtnProps) {
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View className='flex-row items-center justify-center bg-gray-200 h-12 w-full mr-3 rounded-lg mt-4 mb-4'>
        <View className='flex-row items-center justify-between w-full px-2'>
          <Text className='text-[15px] font-semibold  text-gray-600 ml-2'>
            {title}
          </Text>
          <Ionicons name='chevron-forward' size={20} color='#000' />
        </View>
      </View>
    </TouchableOpacity>
  );
}
