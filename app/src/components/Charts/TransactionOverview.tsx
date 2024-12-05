import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDataContext } from '@/context/DataProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';

export default function TransactionOverview() {
  const { totalExpense, totalIncome } = useDataContext();
  const { UserCurrency } = useGlobalContext();
  const percentageExpense = Math.floor((totalExpense * 100) / totalIncome);
  const percentageSavings = 100 - percentageExpense;

  return (
    <ThemedView
      lightColor='#fff'
      className='flex mt-5 px-2  p-3 mb-2'
      style={{
        boxShadow: '5px 4px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: 10,
      }}
    >
      <View className='flex-col gap-4'>
        <ThemedText type='defaultSemiBold'>Expense Summary</ThemedText>
        <ThemedText type='title' className='font-pbold text-3xl'>
          {UserCurrency}. {totalExpense || 0}
        </ThemedText>
      </View>
      <ProgressOverView category='Savings' progress={percentageSavings} />
      <ProgressOverView category='Expenses' progress={percentageExpense} />
    </ThemedView>
  );
}

export const ProgressOverView = ({
  category,
  progress,
}: {
  category: string;
  progress: number;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress}%`,
              backgroundColor: category === 'Savings' ? '#4CAF50' : '#F44336',
            },
          ]}
        />
        <Text style={styles.text}>{category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressContainer: {
    height: 25,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  progressBar: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#7C4DFF',
    borderRadius: 10,
  },

  text: {
    fontSize: 13,
    color: '#fff',
    position: 'absolute',
    padding: 4,
    fontWeight: 'bold',
    left: 10,
  },
});
