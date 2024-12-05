import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeProvider';
import ThemedText from '@/components/ui/Text';

type ListHeaderProps = {
  viewMore?: boolean;
  title: string;
  onPressViewMore?: () => void;
  containerStyle?: string;
  textStyles?: string;
};
export default function ListHeader({
  viewMore = false,
  title,
  onPressViewMore,
  containerStyle,
  textStyles,
}: ListHeaderProps) {
  const { theme } = useTheme();
  return (
    <View className={`flex-row justify-between my-2 ${containerStyle}`}>
      <ThemedText className={`text-[16px] font-pbold ml-2 ${textStyles}`}>
        {title}
      </ThemedText>
      {viewMore && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPressViewMore && onPressViewMore()}
        >
          <View className='flex-row items-center mr-2 mt-1'>
            <ThemedText className='text-sm'>View All</ThemedText>
            <Ionicons
              name='chevron-forward'
              size={16}
              color={theme === 'light' ? '#000' : '#fff'}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
