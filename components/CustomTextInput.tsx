import React from 'react';
import { View, TextInput } from 'react-native';
import { ThemedText, ThemedView } from './Themed';
import { useTheme } from '@/context/ThemeProvider';

type CustomTextInputProps = {
  title: string;
  onChangeText: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  textInputStyle?: string;
  containerStyle?: string;
  inputContainerStyle?: string;
  keyboardType?: 'email-address' | 'default' | 'numeric';
  value?: string;
  multiline?: boolean;
};

export default function CustomTextInput({
  title,
  onChangeText,
  placeholder,
  textInputStyle,
  containerStyle,
  inputContainerStyle,
  value,
  multiline,
  keyboardType = 'default',
}: CustomTextInputProps) {
  const { theme } = useTheme();

  return (
    <View className={`mb-3 w-full ${containerStyle}`}>
      <ThemedText darkColor='#f2f2f2' className='font-pbold ml-2 mb-1'>
        {title}
      </ThemedText>
      <ThemedView
        darkColor='#1c1c1e'
        lightColor='#e5e7eb'
        className={`p-4 rounded-lg flex-row justify-between items-center mb-4 ${inputContainerStyle}`}
      >
        <TextInput
          placeholderTextColor={theme === 'light' ? '#6b7280' : '#ccc'}
          className={`text-sm font-bold flex-1 ${textInputStyle}  ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-200'
          }`}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={value}
          multiline={multiline}
        />
      </ThemedView>
    </View>
  );
}
