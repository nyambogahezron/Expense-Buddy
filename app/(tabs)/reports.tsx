// screens/Statistics.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      data: [3000, 1500, 2000, 1800],
      color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // optional color for expenses
    },
    {
      data: [2000, 1000, 1500, 1300],
      color: (opacity = 1) => `rgba(99, 132, 255, ${opacity})`, // optional color for income
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.7,
  decimalPlaces: 0,
  labelColor: () => '#6B7280',
};

const Statistics = () => {
  return (
    <ScrollView className='flex-1 bg-white p-4'>
      {/* Income and Expenses Summary */}
      <View className='flex-row justify-between mb-4'>
        <View className='bg-purple-100 p-4 rounded-lg items-center w-1/2 mr-2'>
          <Text className='text-purple-700'>Total Income</Text>
          <Text className='text-xl font-bold text-purple-700'>$8,500</Text>
        </View>
        <View className='bg-orange-100 p-4 rounded-lg items-center w-1/2 ml-2'>
          <Text className='text-orange-700'>Total Expenses</Text>
          <Text className='text-xl font-bold text-orange-700'>$3,800</Text>
        </View>
      </View>

      {/* Statistics */}
      <View className='mb-4'>
        <Text className='text-lg font-bold text-gray-800 mb-2'>Statistics</Text>
        <Text className='text-sm text-gray-500'>Apr 01 - Apr 30</Text>
        <TouchableOpacity className='absolute right-0 top-0 p-2'>
          <Text className='text-sm text-gray-500'>Monthly</Text>
        </TouchableOpacity>
      </View>

      {/* Bar Chart */}
      <BarChart
        data={data}
        width={screenWidth - 40} // Subtract some padding
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />

      {/* Income and Expenses Tabs */}
      <View className='flex-row justify-center my-6'>
        <TouchableOpacity className='bg-white p-4 rounded-l-full border border-gray-200 w-1/2 items-center'>
          <Text className='text-black'>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-orange-500 p-4 rounded-r-full w-1/2 items-center'>
          <Text className='text-white'>Expenses</Text>
        </TouchableOpacity>
      </View>

      {/* Expense Detail */}
      <View className='flex-row justify-between bg-red-100 p-4 rounded-lg mb-4'>
        <View className='flex-row items-center'>
          <View className='bg-red-200 p-3 rounded-full mr-4'>
            <Text>🛒</Text>
          </View>
          <View>
            <Text className='font-bold text-gray-800'>Shopping</Text>
            <Text className='text-gray-500'>30 Apr 2022</Text>
          </View>
        </View>
        <Text className='text-red-600 font-bold'>- $1550</Text>
      </View>
    </ScrollView>
  );
};

export default Statistics;
