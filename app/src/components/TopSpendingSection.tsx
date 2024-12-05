import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useDataContext } from '@/context/DataProvider';
import ThemedText from './ui/Text';
import { BudgetProgressBar } from './BudgetProgressBar';

export default function TopSpendingSection() {
  const { expenseList } = useDataContext();
  console.log(expenseList);

  return (
    <View style={styles.container}>
      <BudgetProgressBar spent={200} limit={300} category='expenses' />
      <ThemedText style={styles.title}>Top Spending</ThemedText>
      <FlatList
        horizontal
        data={expenseList}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
        contentContainerStyle={{
          width: '100%',
        }}
      />
    </View>
  );
}

function RenderItem({ item, index }: { item: any; index: number }) {
  const translateX = useSharedValue(-50);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    translateX.value = withTiming(0, { duration: 500 + index * 100 });
    opacity.value = withTiming(1, { duration: 500 + index * 100 });
  }, [index, translateX, opacity]);

  const truncatedName = React.useMemo(() => {
    return item.name.length > 10 ? item.name.slice(0, 10) + '...' : item.name;
  }, [item.name]);

  return (
    <Animated.View
      style={[
        styles.categoryContainer,
        { backgroundColor: item.color },
        animatedStyle,
      ]}
    >
      <Text style={styles.emoji}>{item.icon}</Text>
      <ThemedText style={styles.label}>{truncatedName}</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    width: '100%',
    marginTop: 4,
    marginLeft: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    textAlign: 'center',
  },
});
