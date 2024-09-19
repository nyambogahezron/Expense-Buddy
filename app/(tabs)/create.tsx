import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import TransactionCategories from '@/Data/TransactionsTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TransactionCategoryProps } from '@/Types';
import CustomButton from '@/components/CustomButton';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from '@/components/Themed';
import CustomTextInput from '@/components/CustomTextInput';
import BackButton from '@/components/BackButton';
import HeaderRightIconCard from '@/components/HeaderRightIconCard';
import DatePicker from '@/components/DatePicker';
import CategoryListBottomSheet from '@/components/CategoryListBottomSheet';

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

  const { theme } = useTheme();

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
        style={{
          width: width * 0.94,
          backgroundColor: theme === 'light' ? '#f3f4f6' : '#1c1c1e',
        }}
      >
        <View className='flex-row items-center'>
          <View className='bg-[#fff] p-3 rounded-full mr-4'>
            <Text>{item.icon ? item.icon : item.name.charAt(0)}</Text>
          </View>
          <View>
            <ThemedText className='font-bold'>{item.name}</ThemedText>
          </View>
        </View>
        <Entypo name='circle' size={24} color='green' />
      </TouchableOpacity>
    ),
    []
  );

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
      style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#070B11' }}
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
              <ThemedText className='font-pbold '>Category</ThemedText>
              <ThemedView
                style={{
                  backgroundColor: theme === 'light' ? '#f3f4f6' : '#1c1c1e',
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
                lightColor='#f3f4f6'
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
              placeholder='Enter Type'
              value={transactionFee.toString()}
              onChangeText={setTransactionFee}
              keyboardType='numeric'
            />

            {/* Date Picker */}
            <DatePicker
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              date={date}
              setDate={setDate}
            />

            {/* Description Input */}
            <View className='mb-3'>
              <ThemedText className='font-pbold ml-2 mb-1'>
                Description
              </ThemedText>
              <ThemedView
                darkColor='#1c1c1e'
                lightColor='#f3f4f6'
                className='p-4 rounded-lg'
              >
                <TextInput
                  placeholderTextColor={theme === 'light' ? '#333' : '#ccc'}
                  className={`text-sm font-bold flex-1 h-12  ${
                    theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                  }`}
                  multiline
                  placeholder='Add a description...'
                  value={description}
                  onChangeText={setDescription}
                />
              </ThemedView>
            </View>

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
      <CategoryListBottomSheet />
    </GestureHandlerRootView>
  );
}
