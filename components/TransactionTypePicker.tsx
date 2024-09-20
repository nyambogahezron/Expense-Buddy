import { View, Text, TextInput, Dimensions } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from './Themed';

const width = Dimensions.get('window').width;

type CategoryPickerProps = {
  setType: (value: string) => void;
  type: string;
};

export default function TransactionTypePicker({
  setType,
  type,
}: CategoryPickerProps) {
  const { theme } = useTheme();
  return (
    <View className='mb-3 w-full'>
      <ThemedText className='font-pbold text-sm ml-2 mb-1'>
        Transaction Type
      </ThemedText>

      <ThemedView lightColor='#e5e7eb' className='mb-6'>
        <TextInput
          className='text-sm flex-1'
          placeholderTextColor={theme === 'light' ? '#333' : '#ccc'}
          onChangeText={setType}
        />
        <Picker
          selectedValue={type}
          dropdownIconColor={theme === 'light' ? '#333' : '#fff'}
          style={{
            height: 8,
            width: width * 0.92,
            backgroundColor: theme === 'light' ? '#e5e7eb' : '#1c1c1e',
            color: theme === 'light' ? '#333' : '#fff',
            borderRadius: 10,
          }}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label='Income' value='income' />
          <Picker.Item label='Expense' value='expense' />
        </Picker>
      </ThemedView>
    </View>
  );
}
