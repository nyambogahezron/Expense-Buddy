import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type FabProps = {
  onPress: any;
  customStyles?: any;
};

export default function Fab({ customStyles,
   onPress }: FabProps) {
  return (
    <TouchableOpacity
      style={[styles.fab, customStyles]}
      onPress={() => onPress()}
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
