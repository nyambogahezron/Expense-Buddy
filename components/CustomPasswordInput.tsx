import { View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { ThemedText } from './Themed';
import { useTheme } from '@/context/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

type CustomTextInputProps = {
  title: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  textInputStyle?: string;
  containerStyle?: string;
  inputContainerStyle?: string;
  value?: string;
  handleOnPress?: () => void;
  passwordVisible?: boolean;
  isForConfirmation?: boolean;
};

export default function CustomPasswordInput({
  title,
  onChangeText,
  value,
  placeholder,
  textInputStyle,
  containerStyle,
  inputContainerStyle,
  handleOnPress,
  passwordVisible,
  isForConfirmation=false
}: CustomTextInputProps) {
  const { theme } = useTheme();

  return (
    <View className={`mb-3 relative ${containerStyle}`}>
      <ThemedText darkColor='#f2f2f2' className='font-pbold ml-2 mb-1'>
        {title}
      </ThemedText>
      <View
        style={{
          backgroundColor: theme === 'light' ? '#f3f4f6' : '#1c1c1e',
        }}
        className={`p-4 rounded-lg flex-row justify-between items-center mb-4 relative ${inputContainerStyle}`}
      >
        <TextInput
          placeholderTextColor={theme === 'light' ? '#333' : '#ccc'}
          className={`font-bold flex-1 ${textInputStyle}  ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-200'
          }`}
          placeholder={placeholder}
          secureTextEntry={!passwordVisible}
          value={value}
          onChangeText={onChangeText}
        />
        {!isForConfirmation && (
          <TouchableOpacity
            onPress={handleOnPress}
            className='absolute right-3 '
          >
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={theme === 'light' ? '#f3f4f6' : '#f3f4f6'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}