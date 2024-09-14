import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import TransactionCategories from '@/Data/TransactionsTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TransactionCategoryProps } from '@/Types';
import CustomButton from '@/components/CustomButton';

const width = Dimensions.get('window').width;

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

  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  const CategoryCard = useCallback(
    ({ item }: { item: TransactionCategoryProps }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item.name);
          handleClosePress();
        }}
        key={item.id}
        activeOpacity={0.8}
        className='flex-row justify-between items-center bg-[#f3f4f6] p-4 rounded-lg mb-1 w-full'
        style={{ width: width * 0.94 }}
      >
        <View className='flex-row items-center'>
          <View className='bg-[#fff] p-3 rounded-full mr-4'>
            <Text>🛒</Text>
          </View>
          <View>
            <Text className='font-bold text-gray-800'>{item.name}</Text>
          </View>
        </View>
        <AntDesign name='checkcircleo' size={20} color='green' />
      </TouchableOpacity>
    ),
    []
  );
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
    <GestureHandlerRootView className='flex-1 bg-white'>
      <StatusBar style='dark' backgroundColor='#f2f2f2' />

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
      <ScrollView>
        <View className='mb-5'>
          {/* transaction form  */}

          <View className='mt-5 px-4'>
            {/* Title */}
            <View className='mb-2'>
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
            {/* category */}
            <View className='mb-4'>
              <Text className='text-gray-600 font-pbold text-lg'>Category</Text>
              <View className='flex-row justify-between items-center bg-gray-100 p-4 mt-2 px-4 py-2 rounded-lg'>
                <Text className='text-gray-600'>{selectedCategory}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleOpenPress}
                  className='bg-blue-500 p-2 rounded-lg'
                >
                  <Text className='text-white'>Choose</Text>
                </TouchableOpacity>
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
                  <Text className='text-sm text-gray-600 font-bold'>KSH</Text>
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
              <View className='bg-gray-100 py-1 px-2 rounded-lg flex-row justify-between items-center mb-4'>
                <TextInput
                  className='text-sm flex-1'
                  placeholder='Choose Type'
                  // value={type}
                  onChangeText={setType}
                />
                <Picker
                  selectedValue={type}
                  style={{ height: 5, width: 130 }}
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
              className='bg-orange-600 p-4 rounded-full items-center justify-center my-5'
              onPress={handleOnSubmit}
            >
              <Text className='text-white text-lg'>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BottomSheet for categories*/}
      </ScrollView>
      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        backgroundStyle={{ backgroundColor: '#070B11' }}
      >
        <BottomSheetFlatList
          data={TransactionCategories}
          keyExtractor={(i) => i.id.toString()}
          renderItem={CategoryCard}
          contentContainerStyle={{ alignItems: 'center' }}
          ListHeaderComponent={
            <View>
              <CustomButton
                title='New Category'
                handleOpenPress={() => router.push('/(tabs)/create')}
                customStyles='bg-orange-600 my-5 p-3'
                textStyles='text-white text-lg'
              />
            </View>
          }
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
