import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from '@/components/CustomButton';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from '@/components/Themed';
import CustomTextInput from '@/components/CustomTextInput';
import DatePicker from '@/components/DatePicker';
import CategoryListBottomSheet from '@/components/CategoryListBottomSheet';
import TransactionTypePicker from '@/components/TransactionTypePicker';
import { supabase } from '@/utils/supabase';
import getRandomColor from '@/utils/generateRandomClr';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useDataContext } from '@/context/DataProvider'; 

export default function AddExpense() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionFee, setTransactionFee] = useState(0.0);
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategoryObj, setSelectedCategoryObj] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const { theme } = useTheme();
  const { User } = useGlobalContext();
  const { fetchTransactions } = useDataContext(); 

  // from submission
  const handleOnSubmit = async () => {
    const colors = getRandomColor();

    if (!title || !date || !amount || !type || !type)
      return Alert.alert('Input all field!');

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            userId: User?.sub,
            title: title,
            date: date,
            amount: amount,
            iconColor: colors,
            type: type,
            category: selectedCategoryObj,
            transactionFee: transactionFee,
            description: description,
            receipt: 'https://receipt.com',
          },
        ])
        .select();

      if (error) {
        setIsLoading(false);
        console.log(error);
        return Alert.alert('An error occurred while adding transaction');
      }

      if (data) {
        setIsLoading(false);
        console.log(data);
        Alert.alert('Transaction added successfully');

        setAmount('');
        setTitle('');
        setDescription('');
        setTransactionFee(0.0);

        fetchTransactions(); // Call fetchTransactions after successfully adding a transaction
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView
      className='flex-1 '
      style={{ backgroundColor: theme === 'light' ? '#f3f4f6' : '#070B11' }}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='mb-20'>
          {/* transaction form  */}
          <View className='mt-5 px-4'>
            {/* Title */}
            <CustomTextInput
              title='Title'
              value={title}
              onChangeText={setTitle}
              placeholder='Enter Title'
            />
            {/* category */}
            <View className='mb-4'>
              <ThemedText className='font-pbold ml-2 '>Category</ThemedText>
              <ThemedView
                style={{
                  backgroundColor: theme === 'light' ? '#e5e7eb' : '#1c1c1e',
                }}
                className='relative h-12 flex-row justify-between items-center p-4 mt-2 px-4 py-2 rounded-lg'
              >
                <Text style={{ color: theme === 'light' ? '#333' : '#ccc' }}>
                  {selectedCategory}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleOpenPress}
                  className='absolute bg-blue-500 p-3 h-12  rounded-r-lg right-0 items-center justify-center'
                >
                  <ThemedText className='font-bold text-sm'>Choose</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </View>

            {/* Amount  */}
            <View className='mb-3'>
              <ThemedText className='font-pbold ml-2 mb-1'>Amount</ThemedText>
              <ThemedView
                darkColor='#1c1c1e'
                lightColor='#e5e7eb'
                className='relative p-4 h-12 rounded-lg flex-row justify-between items-center mb-4'
              >
                <TextInput
                  placeholderTextColor={theme === 'light' ? '#333' : '#ccc'}
                  className={`text-sm font-bold flex-1 h-12  ${
                    theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                  }`}
                  placeholder='Enter Amount'
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={setAmount}
                />
                <View className='absolute bg-blue-500 p-3 h-12  rounded-r-lg right-0 items-center justify-center'>
                  <ThemedText className='text-sm font-bold'>KSH</ThemedText>
                </View>
              </ThemedView>
            </View>
            {/* transaction fee */}

            <CustomTextInput
              title='Transaction Fee'
              placeholder=''
              value={transactionFee.toString()}
              onChangeText={setTransactionFee}
              keyboardType='numeric'
            />
            <TransactionTypePicker
              setType={(itemValue) => setType}
              type={type}
            />
            {/* Date Picker */}
            <DatePicker
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              date={date}
              setDate={setDate}
            />

            {/* Description Input */}
            <CustomTextInput
              title='Description'
              placeholder='Add a description...'
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Submit Button */}
            <CustomButton
              title='Add Transaction'
              handleOpenPress={handleOnSubmit}
              customStyles='bg-orange-600 my-5 p-3'
              textStyles='text-white text-lg'
              isLoading={isLoading}
            />
          </View>
        </View>
        {/* BottomSheet for categories*/}
      </ScrollView>
      <CategoryListBottomSheet
        setSelectedCategoryObj={setSelectedCategoryObj}
        selectedCategory={selectedCategory}
        bottomSheetRef={bottomSheetRef}
        setSelectedCategory={setSelectedCategory}
      />
    </GestureHandlerRootView>
  );
}
