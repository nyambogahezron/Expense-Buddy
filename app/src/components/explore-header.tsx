import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreHeader() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Budget</Text>
        <Ionicons name='calendar' size={24} color='white' />
      </View>
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetAmount}>$4,167.56</Text>
        <Text style={styles.budgetMonth}>June</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Categories</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6a1b9a',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  budgetContainer: {
    backgroundColor: '#6a1b9a',
    padding: 20,
    alignItems: 'center',
  },
  budgetAmount: {
    color: 'white',
    fontSize: 36,
  },
  budgetMonth: {
    color: 'white',
    fontSize: 18,
  },
  categoryContainer: {
    padding: 20,
  },
  categoryTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
