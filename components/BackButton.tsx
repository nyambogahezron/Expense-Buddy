import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeProvider';

export default function BackButton() {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className={`bg-opacity-50 rounded-lg ml-2 py-2 ${
        theme === 'light' ? 'bg-white' : 'bg-[#070B11]'
      }`}
    >
      <View
        className={`mr-2 p-2 rounded-lg  ${
          theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
        }`}
      >
        <Feather
          name='arrow-left'
          size={22}
          color={theme === 'light' ? 'black' : '#fff'}
        />
      </View>
    </TouchableOpacity>
  );
}
