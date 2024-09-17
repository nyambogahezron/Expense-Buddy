import { View, TextInput } from 'react-native';
import React from 'react';
import { ThemedText } from './Themed';
import { useTheme } from '@/context/ThemeProvider';

type CustomTextInputProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  textInputStyle?: string;
  containerStyle?: string;
  inputContainerStyle?: string;
  value?: string;
};

export default function CustomTextInput({
  title,
  setTitle,
  value,
  placeholder,
  textInputStyle,
  containerStyle,
  inputContainerStyle,
}: CustomTextInputProps) {
  const { theme } = useTheme();

  return (
    <View className={`mb-2 ${containerStyle}`}>
      <ThemedText darkColor='#f2f2f2' className='font-pbold ml-2 mb-1'>
        {title}
      </ThemedText>
      <View
        style={{ backgroundColor: theme === 'light' ? '#f2f2f2' : '#fff' }}
        className={`p-4 rounded-lg flex-row justify-between items-center mb-4 ${inputContainerStyle}`}
      >
        <TextInput
          className={`text-sm flex-1 ${textInputStyle}`}
          placeholder={placeholder}
          value={value}
          onChangeText={setTitle}
        />
      </View>
    </View>
  );
}
