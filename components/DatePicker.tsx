import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ThemedText, ThemedView } from './Themed';

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
    <View className='my-3 w-full'>
      <ThemedText className='font-pbold l-2 mb-1'>Date</ThemedText>
      <ThemedView
        darkColor='#1c1c1e'
        lightColor='#f3f4f6'
        className='flex-row justify-between h-12 items-center  p-4 rounded-lg mb-4'
      >
        <ThemedText className='font-psemibold text-sm'>
          {date.toDateString()}
        </ThemedText>
        <TouchableOpacity
          className='absolute bg-blue-500 p-3 h-12  rounded-r-lg right-0 items-center justify-center'
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText className='text-sm font-bold'>Today</ThemedText>
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
