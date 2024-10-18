import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { TransactionProps } from '@/types';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText, ThemedView } from '@/components/Themed';
import BackButton from '@/components/navigation/BackButton';
import isEmoji from '@/utils/isEmoji';
import { useDataContext } from '@/context/DataProvider';
import { useToast } from 'react-native-toast-notifications';
const { width } = Dimensions.get('window');

export default function TransactionDetails() {
  const { deleteTransaction } = useDataContext();

  // get item from local search params
  const { item } = useLocalSearchParams();
  const transaction: TransactionProps =
    typeof item === 'string' ? JSON.parse(item) : null;
  const {
    amount,
    date,
    transactionFee,
    description,
    type,
    category,
    iconColor,
    title,
  } = transaction;
  const { theme } = useTheme();
  const toast = useToast();
  const transactionDetails = [
    { label: 'Amount', value: amount },
    { label: 'Date', value: date },
    { label: 'Transaction Fee', value: transactionFee },
    { label: 'Description', value: description },
    { label: 'Transaction Type', value: type },
    { label: 'Transaction Category', value: category.name },
  ];

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
          title: 'Transaction Details',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton containerStyles='-ml-2' />,
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
          className='relative flex flex-row items-center rounded-sm h-12 w-full mt-5 mb-8 ml-10'
        >
          <View
            className='absolute -ml-4 flex items-center justify-center h-14 w-14 rounded-full mr-3 p-2'
            style={{
              backgroundColor: iconColor ? iconColor : '#3030cc',
            }}
          >
            <Text className='text-lg font-bold text-white'>
              {category.icon && isEmoji(category.icon)
                ? category.icon
                : title.charAt(0)}
            </Text>
          </View>

          <ThemedText className='text-lg font-bold ml-16'>{title}</ThemedText>
        </ThemedView>

        {/* Transaction Details */}
        {transactionDetails.map((detail, index) => (
          <View
            key={index}
            className='mb-5 relative'
            style={{ width: width * 0.92 }}
          >
            <ThemedText className=' mb-1 ml-1 font-pbold'>
              {detail.label}
            </ThemedText>
            <ThemedView
              darkColor='#1c1c1e'
              lightColor='#ffffff'
              className='p-4 rounded-lg '
            >
              <ThemedText
                darkColor='#ccc'
                className='text-[14.3px] capitalize font-pregular'
              >
                {detail.value}
              </ThemedText>
            </ThemedView>
          </View>
        ))}

        {/* Action Buttons */}
        <View className='flex w-full flex-row justify-end gap-4 mr-4'>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: '/(transactions)/edit',
                params: { transaction: JSON.stringify(transaction) },
              })
            }
            className='p-3 border border-green-500 rounded-lg'
          >
            <View className='flex flex-row items-center gap-2'>
              <FontAwesome name='edit' size={18} color='#fff' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              deleteTransaction(transaction.id);
              router.push('/(tabs)/');
              toast.show('Transaction deleted successfully', {
                type: 'success',
              });
            }}
            className='p-3 rounded-lg border border-red-500'
          >
            <View className='flex flex-row items-center gap-2'>
              <FontAwesome name='trash' size={18} color='red' />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
