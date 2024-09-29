import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { TransactionProps } from '@/types';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from '@/components/Themed';
import BackButton from '@/components/BackButton';
import CustomTextInput from '@/components/CustomTextInput';
import DatePicker from '@/components/DatePicker';
import { CustomButton } from '@/components';
import BottomSheet from '@gorhom/bottom-sheet';
import CategoryListBottomSheet from '@/components/CategoryListBottomSheet';
import TransactionTypePicker from '@/components/TransactionTypePicker';

const { width } = Dimensions.get('window');

export default function EditTransaction() {
  // get item from local search params
  const { transaction } = useLocalSearchParams();
  const initialTransaction: TransactionProps =
    typeof transaction === 'string' ? JSON.parse(transaction) : null;

  const { title, amount, date, transactionFee, description, type, category } =
    initialTransaction;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleF, setTitle] = useState(title);
  const [amountF, setAmount] = useState(amount);
  const [dateF, setDate] = useState(new Date());
  const [transactionFeeF, setTransactionFee] = useState(transactionFee);
  const [descriptionF, setDescription] = useState(description);
  const [typeF, setType] = useState(type);
  const [categoryF, setCategory] = useState(category.name);
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const handleSave = () => {
    console.log(
      title,
      amountF,
      dateF,
      transactionFeeF,
      descriptionF,
      typeF,
      categoryF
    );
  };

  return (
    <GestureHandlerRootView
      style={{ backgroundColor: theme === 'light' ? '#f3f4f6' : '#070B11' }}
      className='flex flex-1 px-2'
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen
        options={{
          title: 'Edit Transaction',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton />,
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        className='flex flex-1 mb-8'
      >
        {/* Title  */}
        <ThemedView
          darkColor='#1c1c1e'
          lightColor='#f2f2f2'
          className='flex flex-row items-center rounded-sm h-10 w-full mt-5 mb-8'
        >
          <View
            className='flex items-center justify-center h-12 w-12 rounded-full mr-3 p-2'
            style={{
              backgroundColor: initialTransaction.iconColor
                ? initialTransaction?.iconColor
                : '#3030cc',
            }}
          >
            <ThemedText className='text-lg font-bold'>
              {initialTransaction.category.icon.charAt(0)}
            </ThemedText>
          </View>

          <ThemedText className='text-lg font-bold'>
            {initialTransaction.title}
          </ThemedText>
        </ThemedView>

        {/* Transaction Details */}

        <CustomTextInput title='Title' value={titleF} onChangeText={setTitle} />
        <CustomTextInput
          title='Amount'
          value={amountF}
          onChangeText={setAmount}
          keyboardType='numeric'
        />
        <CustomTextInput
          title='Transaction Fee'
          value={transactionFeeF}
          onChangeText={setTransactionFee}
          keyboardType='numeric'
        />
        <View className='mb-4 w-full'>
          <ThemedText className='font-pbold ml-2 '>Category</ThemedText>
          <ThemedView
            style={{
              backgroundColor: theme === 'light' ? '#f3f4f6' : '#1c1c1e',
            }}
            className='relative h-12 flex-row justify-between items-center p-4 mt-2 px-4 py-2 rounded-lg'
          >
            <Text style={{ color: theme === 'light' ? '#333' : '#ccc' }}>
              {categoryF}
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
        {/* Transaction Type */}
        <TransactionTypePicker setType={(itemValue) => setType} type={typeF} />

        <DatePicker
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          date={dateF}
          setDate={setDate}
        />

        <CustomTextInput
          title='Description'
          multiline={true}
          value={descriptionF}
          onChangeText={setDescription}
        />

        {/* Save btn  */}

        <CustomButton
          title='Save'
          handleOpenPress={handleSave}
          customStyles=' bg-orange-600'
          textStyles='text-white'
        />
      </ScrollView>
      <CategoryListBottomSheet
        selectedCategory={categoryF}
        bottomSheetRef={bottomSheetRef}
        setSelectedCategory={setCategory}
      />
    </GestureHandlerRootView>
  );
}
