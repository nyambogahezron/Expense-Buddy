import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TransactionProps } from '@/Types';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function TransactionDetails() {
  // get item from local search params
  const { item } = useLocalSearchParams();
  const transaction: TransactionProps =
    typeof item === 'string' ? JSON.parse(item) : null;

  const transactionDetails = [
    { label: 'Amount', value: transaction.amount },
    { label: 'Date', value: transaction.date },
    { label: 'Transaction Fee', value: transaction.transactionFee },
    { label: 'Description', value: transaction.description },
    { label: 'Transaction Type', value: transaction.type },
    { label: 'Transaction Category', value: transaction.category.name },
  ];

  return (
    <GestureHandlerRootView className='bg-gray-100 flex flex-1 px-2'>
      <StatusBar style='light' backgroundColor='#161622' />
      <Stack.Screen
        options={{
          title: 'Transaction Details',
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
              backgroundColor: transaction.iconColor
                ? transaction?.iconColor
                : '#3030cc',
            }}
          >
            <Text className='text-lg font-bold text-white italic'>
              {transaction.icon}
            </Text>
          </View>

          <Text className='text-lg font-bold'>{transaction.title}</Text>
        </View>

        {/* Transaction Details */}
        {transactionDetails.map((detail, index) => (
          <View
            key={index}
            className='mb-5 relative'
            style={{ width: width * 0.92 }}
          >
            <Text className='text-gray-600 mb-1 ml-1 font-pbold'>
              {detail.label}
            </Text>
            <View className='bg-white p-4 rounded-lg text-black'>
              <Text className='text-[14.3px] capitalize font-pregular'>
                {detail.value}
              </Text>
            </View>
          </View>
        ))}

        {/* edit btn  */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/(transactions)/edit',
              params: { transaction: JSON.stringify(transaction) },
            })
          }
          style={{ width: width * 0.9 }}
          className='flex items-center justify-center bg-orange-600 p-3 rounded-full '
        >
          <View className='flex flex-row items-center gap-1'>
            <FontAwesome name='edit' size={20} color='#fff' />
            <Text className='text-white text-lg font-bold capitalize'>
              Edit
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
