import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { TransactionProps } from '@/types';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import {
  ThemedSafeAreaView,
  ThemedText,
  ThemedView,
} from '@/components/Themed';
import BackButton from '@/components/navigation/BackButton';
import CustomTextInput from '@/components/Form/CustomTextInput';
import DatePicker from '@/components/Form/DatePicker';
import CustomButton from '@/components/CustomButton';
import BottomSheet from '@gorhom/bottom-sheet';
import CategoryListBottomSheet from '@/components/cards/CategoryCard/CategoryListBottomSheet';
import TransactionTypePicker from '@/components/Form/TransactionTypePicker';
import { supabase } from '@/utils/supabase';
import { useDataContext } from '@/context/DataProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useToast } from 'react-native-toast-notifications';

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
  const [dateF, setDate] = useState(new Date(date));
  const [transactionFeeF, setTransactionFee] = useState(transactionFee);
  const [descriptionF, setDescription] = useState(description);
  const [typeF, setType] = useState<any>(type);
  const [categoryF, setCategory] = useState(category.name);
  const [selectedCategoryObj, setSelectedCategoryObj] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const { fetchTransactions } = useDataContext();
  const { User } = useGlobalContext();
  const toast = useToast();

  const handleSave = async () => {
    if (!titleF || !dateF || !amountF || !typeF || !categoryF)
      return toast.show('Input all fields', {
        type: 'danger',
      });

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .update({
          title: titleF,
          amount: amountF,
          date: dateF,
          transactionFee: transactionFeeF,
          description: descriptionF,
          type: typeF,
          category: selectedCategoryObj,
        })
        .eq('id', initialTransaction.id)
        .eq('userId', User?.sub)
        .select();

      if (error) {
        console.log(error);
        setIsLoading(false);
      }

      if (data) {
        console.log(data);
        setIsLoading(false);

        toast.show('Transaction updated successfully', {
          type: 'success',
        });
        router.push('/(tabs)/');
        // Call fetchTransactions after successfully updating a transaction
        fetchTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemedSafeAreaView className='flex flex-1 px-2'>
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
          headerLeft: () => <BackButton containerStyles='-ml-1' />,
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
        <TransactionTypePicker setType={setType} type={typeF} />

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
          isLoading={isLoading}
          title='Save'
          handleOpenPress={handleSave}
          customStyles=' bg-orange-600'
          textStyles='text-white'
        />
      </ScrollView>
      <CategoryListBottomSheet
        setSelectedCategoryObj={setSelectedCategoryObj}
        selectedCategory={categoryF}
        bottomSheetRef={bottomSheetRef}
        setSelectedCategory={setCategory}
      />
    </ThemedSafeAreaView>
  );
}