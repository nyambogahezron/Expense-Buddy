import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ThemedText from './ui/Text';

interface BudgetProgressBarProps {
  spent: number;
  limit: number;
  category: string;
}

export const BudgetProgressBar = ({
  spent,
  limit,
  category,
}: BudgetProgressBarProps) => {
  const progress = (spent / limit) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.total}>
        <ThemedText style={styles.category}>Total :</ThemedText>
        <ThemedText style={styles.category}>$.30,000</ThemedText>
      </View>

      <ThemedText style={styles.category}>{category}</ThemedText>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${Math.min(progress, 100)}%` },
            progress > 100 && styles.exceeded,
          ]}
        />
      </View>
      <View style={styles.amounts}>
        <ThemedText style={styles.spent}>${spent}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'red',
    width: '100%',
  },
  total: {
    flexDirection: 'row',
    
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7C4DFF',
    borderRadius: 4,
  },
  exceeded: {
    backgroundColor: '#FF4081',
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  spent: {
    fontSize: 14,
    color: '#666',
  },
  limit: {
    fontSize: 14,
    color: '#666',
  },
});
