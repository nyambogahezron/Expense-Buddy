// screens/WeeklyReport.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {  StackedBarChart } from 'react-native-chart-kit';
import ProgressCircle from 'react-native-progress-circle';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const barData = {
  labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  datasets: [
    {
      data: [400, 200, 300, 280, 150, 400, 200],
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

const ExploreStatistics = () => {
  const [activeTab, setActiveTab] = useState('Weekly');

  return (
    <View className=' bg-white p-4'>
      {/* Weekly, Monthly, Yearly Tabs */}
      <View className='flex-row justify-between mb-6'>
        <TouchableOpacity
          className={`${
            activeTab === 'Weekly' ? 'bg-blue-500' : 'bg-transparent'
          } p-2 px-4 rounded-full`}
          onPress={() => setActiveTab('Weekly')}
        >
          <Text
            className={`${
              activeTab === 'Weekly' ? 'text-white' : 'text-gray-500'
            }`}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            activeTab === 'Monthly' ? 'bg-blue-500' : 'bg-transparent'
          } p-2 px-4 rounded-full`}
          onPress={() => setActiveTab('Monthly')}
        >
          <Text
            className={`${
              activeTab === 'Monthly' ? 'text-white' : 'text-gray-500'
            }`}
          >
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            activeTab === 'Yearly' ? 'bg-blue-500' : 'bg-transparent'
          } p-2 px-4 rounded-full`}
          onPress={() => setActiveTab('Yearly')}
        >
          <Text
            className={`${
              activeTab === 'Yearly' ? 'text-white' : 'text-gray-500'
            }`}
          >
            Yearly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Circular Percentage Graph */}
      <View className='flex-row justify-between items-center mb-8'>
        <ProgressCircle
          percent={60}
          radius={80}
          borderWidth={8}
          color='#FF0000'
          shadowColor='#999'
          bgColor='#fff'
        >
          <Text className='font-bold text-xl'>$1930</Text>
          <Text className='text-gray-500'>This week</Text>
        </ProgressCircle>

        <View>
          <Text className='text-red-500'>🛫 30% - $400</Text>
          <Text className='text-yellow-500'>🛒 20% - $300</Text>
          <Text className='text-blue-500'>🍽️ 40% - $200</Text>
        </View>
      </View>

      {/* Bar Chart for Expenses */}
      <View className='bg-white p-4 mb-4 rounded-xl shadow-sm'>
        <StackedBarChart
          data={barData}
          width={screenWidth - 40} // Subtract padding
          height={220}
          chartConfig={chartConfig}
          showValuesOnTopOfBars={true}
        />
        <Text className='text-blue-500 text-center mt-2'>View More</Text>
      </View>

      {/* Expense and Income Tabs */}
      <View className='flex-row justify-center mt-6'>
        <TouchableOpacity className='bg-blue-500 p-4 w-1/2 items-center rounded-l-full'>
          <Text className='text-white'>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-gray-200 p-4 w-1/2 items-center rounded-r-full'>
          <Text className='text-gray-500'>Income</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExploreStatistics;
