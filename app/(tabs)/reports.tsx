import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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

const pieData = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const PieChartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};
const width = Dimensions.get('window').width;

const Statistics = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='#161622' />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Stack.Screen
          options={{
            title: 'Reports',
            headerShown: true,
            headerTitleAlign: 'center',
            statusBarStyle: 'dark',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2 '
              >
                <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                  <Feather name='arrow-left' size={22} />
                </View>
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              color: '#333',
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => router.push('/(profile)/settings')}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2'
              >
                <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                  <Ionicons name='settings-outline' size={22} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <View className='px-2'>
         <View className='items-center w-full px-2'>
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
              <Text className='text-lg font-bold text-gray-800 mb-2'>
                Statistics
              </Text>
              <Text className='text-sm text-gray-500'>Apr 01 - Apr 30</Text>
              <TouchableOpacity className='absolute right-0 top-0 p-2'>
                <Text className='text-sm text-gray-500'>Monthly</Text>
              </TouchableOpacity>
            </View>
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
          <View className='flex-row justify-between bg-green-100 p-4 rounded-lg mb-4'>
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

          <View>
            <Text>Top Five Transactions</Text>
            {/* PieChart Graph */}
            <View
              className='flex items-center justify-center mb-4'
              style={{ width: width * 0.9 }}
            >
              <PieChart
                data={pieData}
                width={width}
                height={150}
                chartConfig={PieChartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'-5'}
                center={[10, 10]}
                absolute
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Statistics;
