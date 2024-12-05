import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';

type DatePickerProps = {
  setShowDatePicker: (value: React.SetStateAction<boolean>) => void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
  showDatePicker: boolean;
};
type onDateChangeProps = {
  event: DateTimePickerEvent;
  selectedDate: Date;
};

export default function DatePicker({
  setShowDatePicker,
  setDate,
  date,
  showDatePicker,
}: DatePickerProps) {
  // get date from date picker or current date
  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ): onDateChangeProps => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setDate(currentDate);
    return { event, selectedDate: currentDate };
  };
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Date</ThemedText>
      <ThemedView
        darkColor='#1c1c1e'
        lightColor='#e5e7eb'
        style={styles.datePickerContainer}
      >
        <ThemedText style={styles.dateText}>{date.toDateString()}</ThemedText>
        <TouchableOpacity
          style={styles.todayButton}
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText style={styles.todayButtonText}>Today</ThemedText>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode='date'
            display='default'
            onChange={onDateChange}
          />
        )}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  title: {
    fontFamily: 'pbold',
    marginBottom: 4,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateText: {
    fontFamily: 'psemibold',
    fontSize: 14,
  },
  todayButton: {
    position: 'absolute',
    backgroundColor: '#3b82f6',
    padding: 12,
    height: 48,
    borderRadius: 8,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
