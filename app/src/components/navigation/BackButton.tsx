import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeProvider';
import useColorScheme from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type BackButtonProps = { containerStyles?: string };

export default function BackButton({ containerStyles }: BackButtonProps) {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ backgroundColor: Colors[colorScheme].background }}
      className={`bg-opacity-70 rounded-lg ml-2 py-1  ${containerStyles}`}
    >
      <View
        style={{ backgroundColor: Colors[colorScheme].bgLight }}
        className={`mr-2 p-2 rounded-lg `}
      >
        <Feather name='arrow-left' size={22} color={Colors[colorScheme].text} />
      </View>
    </TouchableOpacity>
  );
}
