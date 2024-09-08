import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AddExpense() {
  const [id, setId] = useState(1);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [icon, setIcon] = useState('A');
  const [iconColor, setIconColor] = useState('#FF0000');
  const [type, setType] = useState('expense');
  const [selectedCategory, setSelectedCategory] = useState('Travel');
  const [transactionFee, setTransactionFee] = useState(0.0);
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  type onDateChangeProps = {
    event: DateTimePickerEvent;
    selectedDate: Date;
  };

  // get date from date picker or current date
  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): onDateChangeProps => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDate(currentDate);
    return { event, selectedDate: currentDate };
  };

  // from submission
  const handleOnSubmit = () => {
    const newTransaction = {
      id: id + 1,
      title,
      date: date.toDateString(),
      amount,
      icon,
      iconColor,
      type,
      category: {
        id: 11,
        name: selectedCategory,
        icon: 'other',
      },
      transactionFee: transactionFee,
      description,
      receipt: 'https://example.com',
    };
    console.log(newTransaction);
    setAmount('');
    setTitle('');
    setDescription('');
    setTransactionFee(0.0);
    setId(id);
    setIcon('A');
    setIconColor('#FF0000');  
  };

 
  return (
    <ScrollView className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='#161622' />
      <Stack.Screen
        options={{
          title: 'Add Transaction',
          headerShown: true,
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className='bg-white bg-opacity-50 rounded-lg p-1 py-2 '
            >
              <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                <Feather name='arrow-left' size={22} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: '#333',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => router.push('/(profile)/settings')}
              className='bg-white bg-opacity-50 rounded-lg p-1 py-2'
            >
              <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                <Ionicons name='settings-outline' size={22} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
     
        <View className='mb-5'>
          {/* transaction form  */}
          <TouchableOpacity onPress={() => router.push('/modals/categories')}>
            <Text>Choose Cat</Text>
          </TouchableOpacity>
          <View className='mt-5 px-4'>
            {/* Title */}
            <View className='mb-3'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Title
              </Text>
              <View className='bg-gray-100 p-4 rounded-lg flex-row justify-between items-center mb-4'>
                <TextInput
                  className='text-sm flex-1'
                  placeholder='Enter Title'
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Amount  */}
            <View className='mb-3'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Amount
              </Text>
              <View className='bg-gray-100 p-4 rounded-lg flex-row justify-between items-center mb-4'>
                <TextInput
                  className='text-sm flex-1'
                  placeholder='Enter Amount'
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={setAmount}
                />
                <View className=''>
                  <Text className='text-lg font-pbold'>KSH</Text>
                </View>
              </View>
            </View>
            {/* transaction fee */}
            <View className='mb-3'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Transaction Fee
              </Text>
              <View className='bg-gray-100 p-4 rounded-lg flex-row justify-between items-center mb-4'>
                <TextInput
                  className='text-sm flex-1'
                  placeholder='Enter Type'
                  value={transactionFee.toString()}
                  onChangeText={(text) =>
                    setTransactionFee(parseFloat(text) || 0)
                  }
                  keyboardType='numeric'
                />
              </View>
            </View>
            {/* Type */}
            <View className='mb-3'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Transaction Type
              </Text>
              <View className='bg-gray-100 p-4 rounded-lg flex-row justify-between items-center mb-4'>
                <TextInput
                  className='text-sm flex-1'
                  placeholder='Enter Type'
                  value={type}
                  onChangeText={setType}
                />
                <Picker
                  selectedValue={type}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => setType(itemValue)}
                >
                  <Picker.Item label='Income' value='income' />
                  <Picker.Item label='Expense' value='expense' />
                </Picker>
              </View>
            </View>

            {/* Date Picker */}
            <View className='mb-3'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Date
              </Text>
              <View className='flex-row justify-between items-center bg-gray-100 p-4 rounded-lg mb-4'>
                <Text>{date.toDateString()}</Text>
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
            </View>

            {/* Description Input */}
            <View className='mb-3'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Description
              </Text>
              <View className='bg-gray-100 p-4 rounded-lg'>
                <TextInput
                  className='text-gray-800'
                  multiline
                  placeholder='Add a description...'
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              className='bg-blue-500 p-4 rounded-lg items-center justify-center my-5'
              onPress={handleOnSubmit}
            >
              <Text className='text-white text-lg'>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>

    
    </ScrollView>
  );
}
