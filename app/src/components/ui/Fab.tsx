import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Fab() {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => router.navigate('/(tabs)/create')}
    >
      <Ionicons name='add' size={24} color='white' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: Colors.orange,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
