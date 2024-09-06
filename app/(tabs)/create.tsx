import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddExpense() {
  const [selectedCategory, setSelectedCategory] = useState('Travel');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView className='flex-1 bg-white p-4'>
      {/* Category Tabs */}
      <View className='flex-row justify-around mb-6'>
        <TouchableOpacity
          className={`${
            selectedCategory === 'Travel' ? 'bg-red-200' : 'bg-gray-100'
          } p-3 rounded-lg`}
          onPress={() => setSelectedCategory('Travel')}
        >
          <Text className='text-red-500'>🛫 Travel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            selectedCategory === 'Restaurant' ? 'bg-blue-200' : 'bg-gray-100'
          } p-3 rounded-lg`}
          onPress={() => setSelectedCategory('Restaurant')}
        >
          <Text className='text-blue-500'>🍽️ Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            selectedCategory === 'Shopping' ? 'bg-yellow-200' : 'bg-gray-100'
          } p-3 rounded-lg`}
          onPress={() => setSelectedCategory('Shopping')}
        >
          <Text className='text-yellow-500'>🛒 Shopping</Text>
        </TouchableOpacity>
      </View>

      {/* Amount Input */}
      <View className='bg-gray-100 p-4 rounded-lg flex-row justify-between items-center mb-4'>
        <TextInput
          className='text-xl flex-1'
          placeholder='Enter Amount'
          keyboardType='numeric'
          value={amount}
          onChangeText={setAmount}
        />
        <Picker
          selectedValue={currency}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => setCurrency(itemValue)}
        >
          <Picker.Item label='USD' value='USD' />
          <Picker.Item label='EUR' value='EUR' />
          <Picker.Item label='KSH' value='KSH' />
        </Picker>
      </View>

      {/* Date Picker */}
      <View className='flex-row justify-between items-center bg-gray-100 p-4 rounded-lg mb-4'>
        <Text>Date: {date.toDateString()}</Text>
        <TouchableOpacity
          className='bg-blue-500 p-2 rounded-lg'
          onPress={() => setShowDatePicker(true)}
        >
          <Text className='text-white'>Today</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode='date'
            display='default'
            onChange={onDateChange}
          />
        )}
      </View>

      {/* Description Input */}
      <View className='bg-gray-100 p-4 rounded-lg'>
        <Text className='text-gray-500 mb-2'>Description</Text>
        <TextInput
          className='text-gray-800'
          multiline
          placeholder='Add a description...'
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </ScrollView>
  );
}
