import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
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
import getRandomColor from '@/utils/generateRandomClr';
import { useDataContext } from '@/context/DataProvider';
import { Picker } from '@react-native-picker/picker';
const width = Dimensions.get('window').width;

export default function AddExpense() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionFee, setTransactionFee] = useState(0.0);
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategoryObj, setSelectedCategoryObj] = useState<any>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const { theme } = useTheme();
  const { addTransaction, isLoading } = useDataContext();

  console.log('selected type', type);
  
  // from submission
  const handleOnSubmit = async () => {
    const colors = getRandomColor();

    if (!title || !date || !amount || !type || !type)
      return Alert.alert('Input all field!');

    try {
      await addTransaction({
        title,
        date,
        amount,
        type,
        category: selectedCategoryObj,
        transactionFee,
        description,
        iconColor: colors,
      });

      Alert.alert('Transaction Added Successfully');
      // clear form
      setTitle('');
      setDate(new Date());
      setAmount('');
      setType('');
      setSelectedCategory('');
      setTransactionFee(0.0);
      setDescription('');
    } catch (error) {
      console.log(error);
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

            <View className='mb-3 w-full'>
              <ThemedText className='font-pbold text-sm ml-2 mb-1'>
                Transaction Type
              </ThemedText>

              <ThemedView lightColor='#e5e7eb' className='mb-6 pb-4'>
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
