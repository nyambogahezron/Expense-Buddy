import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type AuthFooterProps = {
  title: string;
  buttonText: string;
  handleOnPress: () => void;
};

export default function AuthFooter({ title, handleOnPress, buttonText }: AuthFooterProps) {
  return (
    <View className='flex-row justify-center mt-8 mb-3'>
      <Text className='text-gray-500'>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={handleOnPress}>
        <Text className='text-blue-600 font-bold ml-2'>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}