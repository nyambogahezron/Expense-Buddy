import { Text, Dimensions, ViewStyle, TouchableOpacity } from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width;

type CustomButtonProps = {
  handleOpenPress: () => void;
  title: string;
  textStyles?: string;
  customStyles?: string;
  styles?: ViewStyle;
  touchOpacity?: number;
};

export default function CustomButton({
  handleOpenPress,
  title,
  customStyles,
  styles,
  textStyles,
  touchOpacity = 0.7,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      onPress={handleOpenPress}
      style={[{ width: width * 0.9 }, styles]}
      className={`flex items-center justify-center bg-white p-4 rounded-full  ${customStyles}`}
    >
      <Text className={`text-black text-lg font-bold capitalize ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
