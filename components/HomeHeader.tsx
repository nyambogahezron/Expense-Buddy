import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeHeader() {
  const userCurrency = 'Ksh';

  return (
    <View>
      <View
        style={{
          width: width * 0.95,
          height: height * 0.23,
        }}
        className='relative p-4 bg-[#fff] rounded-xl shadow-md  '
      >
        <LinearGradient
          colors={['#787BE2', '#E2999A']}
          className='absolute top-0 left-0 right-0 bottom-0 rounded-xl'
        />
        <View className='flex flex-row justify-between -ml-1 px-1 mt-1'>
          <View>
            <Text className='text-xl font-bold text-green-700'>
              {userCurrency + '.'}580.00
            </Text>
            <Text className='text-gray-300 font-pbold'>Income</Text>
          </View>
          <View>
            <Text className='text-red-700 text-xl font-bold'>
              {userCurrency + '.'}500.00
            </Text>
            <Text className='text-gray-300 font-pbold'>Expenses</Text>
          </View>
          <View>
            <Text className='text-blue-700 text-xl font-bold'>
              {userCurrency + '.'}14.00
            </Text>
            <Text className='text-gray-300 font-pbold'>Tractions Costs</Text>
          </View>
        </View>
        <View className='relative flex flex-row -ml-1 overflow-hidden -bottom-5 w-full bg-transparent h-3 rounded-full border border-gray-50 items-center'>
          <View className='bg-green-700 ' style={{ width: '50%' }}>
            <Text></Text>
          </View>
          <View className='bg-red-700' style={{ width: '40%' }}>
            <Text></Text>
          </View>
          <View className='bg-blue-700' style={{ width: '10%' }}>
            <Text></Text>
          </View>
        </View>
        <View className='mt-7 flex flex-row justify-between mr-5 p-1 items-center'>
          <View className='flex-row items-center gap-1'>
            <View className='bg-green-700 h-3 w-3 rounded-full'></View>
            <Text className='text-white font-bold'>50%</Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <View className='bg-red-700 h-3 w-3 rounded-full'></View>
            <Text className='text-white font-bold'>40%</Text>
          </View>
          <View className='flex-row items-center gap-1'>
            <View className='bg-blue-700 h-3 w-3 rounded-full'></View>
            <Text className='text-white font-bold'>10%</Text>
          </View>
        </View>
        <View className='absolute bottom-1 right-4 flex items-end'>
          <View className='flex flex-row mt-2 w-full'>
            <View className='w-8 h-8 rounded-full bg-[#EE401B] opacity-70'></View>
            <View className='w-8 h-8 rounded-full bg-[#F38D1B] opacity-70 right-3'></View>
          </View>
        </View>
      </View>
    </View>
  );
}
