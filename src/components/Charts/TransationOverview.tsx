import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import { ThemedText } from '../Themed';
const Colors = {
  black: '#1A1A1A',
  grey: '#242424',
  white: '#FCFCFC',
  tintColor: '#723FEB',
  blue: '#97E0F7',
};
export default function TransactionOverview() {
  const pieData = [
    {
      value: 47,
      color: Colors.tintColor,
      focused: true,
      text: '47%',
    },
    {
      value: 40,
      color: Colors.blue,
      text: '40%',
    },
    {
      value: 16,
      color: Colors.white,
      text: '16%',
    },
    { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97', text: '3%' },
  ];

  return (
    <View className='flex flex-row items-center px-2 justify-between'>
      <View className='flex-col gap-4'>
        <ThemedText type='defaultSemiBold' className='text-sm'>
          Expense Summary
        </ThemedText>
        <ThemedText type='title' className='font-pbold text-3xl'>
          USD.120.00
        </ThemedText>
      </View>
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          semiCircle
          radius={70}
          innerRadius={55}
          innerCircleColor={Colors.black}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  47%
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
