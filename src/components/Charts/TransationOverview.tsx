import { View, Text } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import { ThemedText } from '../Themed';
import { useDataContext } from '@/context/DataProvider';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function TransactionOverview() {
  const { totalExpense, totalIncome } = useDataContext();
  const { UserCurrency } = useGlobalContext();
  const percentageExpense = Math.floor((totalExpense * 100) / totalIncome);
  // console.log(totalExpense, totalIncome, percentageExpense);

  const pieData = [
    {
      value: percentageExpense,
      color: 'green',
      focused: true,
      text: `${percentageExpense}%`,
    },
    {
      value: 100 - percentageExpense,
      color: 'red',
      text: `${100 - percentageExpense}%`,
    },
  ];

  return (
    <View className='flex flex-row items-center px-2 justify-between'>
      <View className='flex-col gap-4'>
        <ThemedText type='defaultSemiBold'>Expense Summary</ThemedText>
        <ThemedText type='title' className='font-pbold text-3xl'>
          {UserCurrency}. {totalExpense || 0}
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
          innerCircleColor='#1A1A1A'
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
                  {100 - percentageExpense || 0}%
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
