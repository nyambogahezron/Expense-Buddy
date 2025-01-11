import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;

export default function FilterComponent() {
  const transactionType = useState({
    all: true,
    income: true,
    expense: true,
  });

  const toggleCheckbox = (stateSetter, key) => {
    stateSetter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Transaction Type */}
      <View style={styles.section}>
        <Text style={styles.title}>Transaction Type</Text>
        {Object.keys(transactionType).map((type) => (
          <TouchableOpacity
            key={type}
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox(transactionType, type)}
          >
            <View style={styles.checkbox}>
              {transactionType[type] && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.label}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: width,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
