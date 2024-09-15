import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TransactionProps } from '@/Types';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function EditTransaction() {
  // get item from local search params
  const { transaction } = useLocalSearchParams();
  const initialTransaction: TransactionProps =
    typeof transaction === 'string' ? JSON.parse(transaction) : null;

  const { title, amount, date, transactionFee, description, type, category } =
    initialTransaction;

  const [titleF, setTitle] = useState(title);
  const [amountF, setAmount] = useState(amount);
  const [dateF, setDate] = useState(date);
  const [transactionFeeF, setTransactionFee] = useState(transactionFee);
  const [descriptionF, setDescription] = useState(description);
  const [typeF, setType] = useState(type);
  const [categoryF, setCategory] = useState(category.name);

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
    <GestureHandlerRootView className='bg-gray-100 flex flex-1 px-2'>
      <StatusBar backgroundColor='#ffffff' style='dark' />
      <Stack.Screen
        options={{
          title: 'Edit Transaction',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className='bg-white bg-opacity-50 rounded-lg p-1 py-2 '
            >
              <View className='bg-gray-200 ml-1 p-2 rounded-lg'>
                <Feather name='arrow-left' size={22} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: '#333',
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
        <View className='flex flex-row items-center bg-white rounded-sm h-10 w-full mt-5 mb-8'>
          <View
            className='flex items-center justify-center h-12 w-12 rounded-full mr-3 p-2'
            style={{
              backgroundColor: initialTransaction.iconColor
                ? initialTransaction?.iconColor
                : '#3030cc',
            }}
          >
            <Text className='text-lg font-bold text-white italic'>
              {initialTransaction.category.icon}
            </Text>
          </View>

          <Text className='text-lg font-bold'>{initialTransaction.title}</Text>
        </View>

        {/* Transaction Details */}
        <View className='mb-5 relative' style={{ width: width * 0.92 }}>
          <Text className='text-gray-600 mb-1 ml-1 font-pbold'>Title</Text>
          <View className='bg-white p-4 rounded-lg text-black'>
            <TextInput
              value={titleF}
              onChangeText={setTitle}
              className='text-[14.3px] capitalize font-pregular'
            />
          </View>
        </View>
        <View className='mb-5 relative' style={{ width: width * 0.92 }}>
          <Text className='text-gray-600 mb-1 ml-1 font-pbold'>Amount</Text>
          <View className='bg-white p-4 rounded-lg text-black'>
            <TextInput
              value={amountF}
              onChangeText={setAmount}
              className='text-[14.3px] capitalize font-pregular'
              keyboardType='numeric'
            />
          </View>
        </View>

        <View className='mb-5 relative' style={{ width: width * 0.92 }}>
          <Text className='text-gray-600 mb-1 ml-1 font-pbold'>Date</Text>
          <View className='bg-white p-4 rounded-lg text-black'>
            <TextInput
              value={dateF}
              onChangeText={setDate}
              className='text-[14.3px] capitalize font-pregular'
            />
          </View>
        </View>

        <View className='mb-5 relative' style={{ width: width * 0.92 }}>
          <Text className='text-gray-600 mb-1 ml-1 font-pbold'>
            Transaction Fee
          </Text>
          <View className='bg-white p-4 rounded-lg text-black'>
            <TextInput
              value={transactionFeeF}
              onChangeText={setTransactionFee}
              keyboardType='numeric'
              className='text-[14.3px] capitalize font-pregular'
            />
          </View>
        </View>

        <View className='mb-5 relative' style={{ width: width * 0.92 }}>
          <Text className='text-gray-600 mb-1 ml-1 font-pbold'>
            Description
          </Text>
          <View className='bg-white p-4 rounded-lg text-black'>
            <TextInput
              value={descriptionF}
              onChangeText={setDescription}
              className='text-[14.3px] capitalize font-pregular'
            />
          </View>
        </View>

        <View className='mb-5 relative' style={{ width: width * 0.92 }}>
          <Text className='text-gray-600 mb-1 ml-1 font-pbold'>
            Transaction Type
          </Text>
          <View className='bg-white p-4 rounded-lg text-black'>
            <TextInput
              value={typeF}
              onChangeText={() => setType.toString()}
              className='text-[14.3px] capitalize font-pregular'
            />
          </View>
        </View>

        <View className='mb-5 relative' style={{ width: width * 0.92 }}>
          <Text className='text-gray-600 mb-1 ml-1 font-pbold'>
            Transaction Category
          </Text>
          <View className='bg-white p-4 rounded-lg text-black'>
            <TextInput
              value={categoryF}
              onChangeText={setCategory}
              className='text-[14.3px] capitalize font-pregular'
            />
          </View>
        </View>

        {/* Save btn  */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleSave}
          style={{ width: width * 0.9 }}
          className='flex items-center justify-center bg-orange-600 p-3 rounded-full '
        >
          <View className='flex flex-row items-center gap-1'>
            <Text className='text-white text-lg font-bold capitalize'>
              Save
            </Text>
            <FontAwesome name='save' size={15} color='#fff' />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
