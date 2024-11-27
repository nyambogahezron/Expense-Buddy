import {
  Text,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import React from 'react';

const width = Dimensions.get('window').width;

type CustomButtonProps = {
  handleOpenPress: () => void;
  title: string;
  textStyles?: string;
  customStyles?: string;
  styles?: ViewStyle;
  touchOpacity?: number;
  isLoading?: boolean;
};

export default function CustomButton({
  handleOpenPress,
  title,
  customStyles,
  styles,
  textStyles,
  touchOpacity = 0.7,
  isLoading = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={touchOpacity}
      onPress={handleOpenPress}
      style={[{ width: width * 0.9 }, styles]}
      className={`flex items-center justify-center p-4 rounded-full  ${customStyles} ${isLoading ? 'opacity-50' : ''}`}
    >
      <View className='items-center justify-center flex flex-row gap-2'>
        <Text
          className={`text-black text-lg font-bold capitalize ${textStyles}`}
        >
          {isLoading ? 'Loading...' : title}
        </Text>
        {isLoading && <ActivityIndicator size='small' color='#fff' />}
      </View>
    </TouchableOpacity>
  );
}
