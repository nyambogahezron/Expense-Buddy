import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const HeaderWithTabs = () => {
  const months = [
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
  ];
  const [selectedMonth, setSelectedMonth] = useState('June');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon}>
          <Text style={styles.iconText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Billing Reports</Text>
        <TouchableOpacity style={styles.icon}>
          <Text style={styles.iconText}>{'📅'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            style={[styles.tab, selectedMonth === month && styles.selectedTab]}
            onPress={() => setSelectedMonth(month)}
          >
            <Text
              style={[
                styles.tabText,
                selectedMonth === month && styles.selectedTabText,
              ]}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8A2BE2', // Purple gradient-like color
    paddingTop: 20, // For spacing under the status bar
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#D3D3D3', // Light gray text color
  },
  selectedTabText: {
    color: '#FFFFFF', // White for selected tab
    fontWeight: 'bold',
  },
});

export default HeaderWithTabs;
