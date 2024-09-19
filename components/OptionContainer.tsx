import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

// Define a type for valid Ionicons names
type IoniconsName = keyof typeof Ionicons.glyphMap;

type OptionContainerProps = {
  title: string;
  icon: IoniconsName;
  handleOnPress: () => void;
};

export default function OptionContainer({
  title,
  icon,
  handleOnPress,
}: OptionContainerProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
        theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
      }`}
      onPress={handleOnPress}
    >
      <Ionicons name={icon} size={22} color='#6B7280' />
      <Text
        className={`ml-4 ${
          theme === 'light' ? 'text-gray-800' : 'text-gray-200'
        }`}
      >
        {title}
      </Text>
      <View className='absolute flex right-2'>
        <Ionicons name='chevron-forward' size={22} color='#6B7280' />
      </View>
    </TouchableOpacity>
  );
}
