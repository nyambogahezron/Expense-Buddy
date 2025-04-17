import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import AnimatedNumber from './AnimatedNumber';
import { formatCurrency } from '../utils/helpers';
import colors from '../constants/colors';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  const iconName = type === 'income' ? 'arrow-down-circle' : 'arrow-up-circle';
  const cardColor = type === 'income' ? colors.success : colors.error;
  const iconColor = type === 'income' ? colors.success : colors.error;
  
  return (
    <Animated.View 
      style={[styles.container, { borderLeftColor: cardColor }]}
      entering={SlideInUp.delay(100).springify()}
    >
      <View style={styles.titleRow}>
        <Feather name={iconName} size={16} color={iconColor} />
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={styles.currency}>$</Text>
        <AnimatedNumber
          value={amount}
          style={[styles.amount, { color: cardColor }]}
          formatter={(val) => formatCurrency(val, false)}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currency: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginRight: 2,
    marginBottom: 2,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SummaryCard;
