import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const transactions = [
    {
      id: '1',
      title: 'Dribbble Pro',
      date: '18 Sep, 2021',
      amount: '-$145.00',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dribbble_icon_2020.svg/512px-Dribbble_icon_2020.svg.png',
    },
    {
      id: '2',
      title: 'Figma',
      date: '14 Sep, 2021',
      amount: '-$46.00',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.png',
    },
  ];
  const renderTransaction = ({ item }) => (
    <View className='flex-row justify-between items-center bg-gray-200 p-4 rounded-xl mb-4'>
      <View className='flex-row items-center'>
        <Image source={{ uri: item.icon }} className='w-10 h-10 mr-4' />
        <View>
          <Text className='text-lg font-semibold'>{item.title}</Text>
          <Text className='text-gray-500'>{item.date}</Text>
        </View>
      </View>
      <Text className='text-lg font-bold'>{item.amount}</Text>
    </View>
  );
  return (
    <SafeAreaView className='flex-1 bg-gray-100 p-6'>
      {/* Header */}
      <View className='flex-row justify-between items-center mb-6'>
        <Text className='text-gray-500'>Good Morning!</Text>
        <Text className='text-lg font-bold'>Iqbal Hossain</Text>
        <TouchableOpacity>
          <Text className='text-gray-500'>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <LinearGradient
        colors={['#434343', '#282828']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        className='rounded-xl p-6 mb-6'
      >
        <Text className='text-white text-xl font-bold'>$5480.00</Text>
        <Text className='text-gray-400'>Balance</Text>
        <View className='mt-4'>
          <Text className='text-white text-lg'>**** **** **** 402</Text>
        </View>
      </LinearGradient>

      {/* Transactions */}
      <Text className='text-xl font-semibold mb-4'>Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
      />

      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
}
