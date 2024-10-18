import { View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
type HeaderLeftIconCardProps = {
  handleOnPress: () => void;
  children: React.ReactNode;
};

export default function HeaderRightIconCard({
  handleOnPress,
  children,
}: HeaderLeftIconCardProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleOnPress}
      className={`bg-opacity-50 rounded-lg p-1 py-2 ${
        theme === 'light' ? 'bg-white' : 'bg-[#070B11]'
      }`}
    >
      <View
        className={`mr-2 p-2 rounded-lg  ${
          theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
        }`}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}
