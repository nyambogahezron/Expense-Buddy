import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText, ThemedView } from './Themed';
import { useTheme } from '@/context/ThemeProvider';
type LoadMoreBtnProps = {
  handleOnPress: () => void;
  title: string;
};

export default function LoadMoreBtn({
  handleOnPress,
  title,
}: LoadMoreBtnProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleOnPress}>
      <ThemedView
        darkColor='#1c1c1e'
        lightColor='#f3f4f6'
        className='flex-row items-center justify-center h-12 w-full mr-3 rounded-[12px] border-2 mt-4 mb-4 px-2'
      >
        <View className='flex-row items-center justify-between w-full px-2'>
          <ThemedText className='text-[15px] font-semibold  text-gray-600 ml-4'>
            {title}
          </ThemedText>
          <Ionicons
            name='chevron-forward'
            size={20}
            color={theme === 'light' ? '#333' : '#fff'}
          />
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
