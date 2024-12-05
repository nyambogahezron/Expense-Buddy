import { View, TextInput, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@/context/ThemeProvider';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';

const width = Dimensions.get('window').width;

type CategoryPickerProps = {
  setType: (value: string) => void;
  type: string;
};

export default function TransactionTypePicker({
  setType,
  type,
}: CategoryPickerProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Transaction Type</ThemedText>

      <ThemedView lightColor='#e5e7eb' style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          dropdownIconColor={theme === 'light' ? '#333' : '#fff'}
          style={[
            styles.picker,
            {
              backgroundColor: theme === 'light' ? '#e5e7eb' : '#1c1c1e',
              color: theme === 'light' ? '#333' : '#fff',
            },
          ]}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label='Income' value='income' />
          <Picker.Item label='Expense' value='expense' />
        </Picker>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
  },
  title: {
    fontFamily: 'font-pbold',
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 4,
  },
  pickerContainer: {
    marginBottom: 24,
    paddingBottom: 16,
  },
  picker: {
    height: 8,
    width: width * 0.92,
    borderRadius: 10,
  },
});
