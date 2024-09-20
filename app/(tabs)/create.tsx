import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from '@/components/CustomButton';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from '@/components/Themed';
import CustomTextInput from '@/components/CustomTextInput';
import BackButton from '@/components/BackButton';
import HeaderRightIconCard from '@/components/HeaderRightIconCard';
import DatePicker from '@/components/DatePicker';
import CategoryListBottomSheet from '@/components/CategoryListBottomSheet';
import TransactionTypePicker from '@/components/TransactionTypePicker';

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

  const { theme } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();

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
    <GestureHandlerRootView
      className='flex-1'
      style={{ backgroundColor: theme === 'light' ? '#f3f4f6' : '#070B11' }}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <Stack.Screen
        options={{
          title: 'Add Transaction',
          headerShown: true,
          headerTitleAlign: 'center',
          statusBarStyle: theme === 'light' ? 'dark' : 'light',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton />,
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <HeaderRightIconCard
              handleOnPress={() => router.push('/(profile)/settings')}
            >
              <Ionicons
                name='settings-outline'
                size={22}
                color={theme === 'light' ? 'black' : '#fff'}
              />
            </HeaderRightIconCard>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='mb-5'>
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
            />
          </View>
        </View>

        {/* BottomSheet for categories*/}
      </ScrollView>
      <CategoryListBottomSheet
        selectedCategory={selectedCategory}
        bottomSheetRef={bottomSheetRef}
        setSelectedCategory={setSelectedCategory}
      />
    </GestureHandlerRootView>
  );
}
