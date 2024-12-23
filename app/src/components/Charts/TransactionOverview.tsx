import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useDataContext } from '@/context/DataProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
const width = Dimensions.get('window').width;

export default function TransactionOverview() {
  const { totalExpense, totalIncome } = useDataContext();
  const { UserCurrency } = useGlobalContext();

  return (
    <ThemedView
      lightColor='#fff'
      className='flex mt-5 px-2  p-3 mb-2'
      style={styles.wrapper}
    >
      <View className='flex-col gap-4 p-2'>
        <ThemedText type='defaultSemiBold'> Summary</ThemedText>

        <View className='flex flex-row gap-4 justify-between'>
          <View className='flex items-center flex-row'>
            <Ionicons name='arrow-down' size={24} color={Colors.red} />
            <ThemedText type='subtitle' className='font-pbold text-lg mt-1'>
              {UserCurrency}. {totalExpense || 0}
            </ThemedText>
          </View>

          <View className='flex items-center flex-row'>
            <Ionicons name='arrow-up' size={24} color={Colors.blueViolet} />
            <ThemedText type='subtitle' className='font-pbold text-lg mt-1'>
              {UserCurrency}. {totalIncome || 0}
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  wrapper: {
    boxShadow: '5px 4px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    width: width * 0.94,
  },
});
