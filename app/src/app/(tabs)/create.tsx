import { StatusBar } from 'expo-status-bar';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@/context/ThemeProvider';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import CustomTextInput from '@/components/Form/CustomTextInput';
import DatePicker from '@/components/Form/DatePicker';
import CategoryListBottomSheet from '@/components/cards/CategoryCard/CategoryListBottomSheet';
import getRandomColor from '@/utils/generateRandomClr';
import { useDataContext } from '@/context/DataProvider';
import { Picker } from '@react-native-picker/picker';
import { useToast } from 'react-native-toast-notifications';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import Button from '@/components/ui/Button';

const width = Dimensions.get('window').width;

export default function AddExpense() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionFee, setTransactionFee] = useState(0.0);
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategoryObj, setSelectedCategoryObj] = useState<any>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const { theme } = useTheme();
  const toast = useToast();
  const { addTransaction, isLoading } = useDataContext();

  // from submission
  const handleOnSubmit = async () => {
    const colors = getRandomColor();

    if (!title || !date || !amount || !type || !type)
      return toast.show('Input all fields', {
        type: 'danger',
      });

    try {
      await addTransaction({
        title,
        date,
        amount,
        type,
        category: selectedCategoryObj,
        transactionFee,
        description,
        iconColor: colors,
      });

      router.push('/(tabs)');
      toast.show('Transaction added successfully', {
        type: 'success',
      });
      // clear form
      setTitle('');
      setDate(new Date());
      setAmount('');
      setType('');
      setSelectedCategory('');
      setTransactionFee(0.0);
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={Colors[useColorScheme('background')].background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: Platform.OS === 'ios' ? 0 : -40,
          marginBottom: 20,
        }}
      >
        {/* transaction form  */}
        <View className='mt-5 px-4'>
          {/* Title */}
          <CustomTextInput
            title='Title'
            value={title}
            onChangeText={setTitle}
            placeholder='Enter Title'
          />
          {/* category */}
          <View className='mb-4'>
            <ThemedText className='font-pbold ml-2 '>Category</ThemedText>
            <ThemedView
              style={{
                backgroundColor: Colors[useColorScheme('bgLight2')].bgLight2,
                borderWidth: 1,
                borderColor: Colors[useColorScheme('border')].border,
              }}
              className='relative h-12 flex-row justify-between items-center p-4 mt-2 px-4 py-2 rounded-lg'
            >
              <Text style={{ color: Colors[useColorScheme('text')].text }}>
                {selectedCategory}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleOpenPress}
                className='absolute bg-[#FFA500] p-3 h-12  rounded-r-lg right-0 items-center justify-center'
              >
                <ThemedText className='text-white font-bold text-sm'>
                  Choose
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </View>

          {/* Amount  */}
          <View className='mb-3'>
            <ThemedText className='font-pbold ml-2 mb-1'>Amount</ThemedText>
            <ThemedView
              style={{
                backgroundColor: Colors[useColorScheme('bgLight2')].bgLight2,
                borderWidth: 1,
                borderColor: Colors[useColorScheme('border')].border,
              }}
              className='relative p-4 h-12 rounded-lg flex-row justify-between items-center mb-4'
            >
              <TextInput
                placeholderTextColor={theme === 'light' ? '#333' : '#ccc'}
                className={`text-sm font-bold flex-1 h-12  ${
                  theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                }`}
                placeholder='Enter Amount'
                keyboardType='numeric'
                value={amount}
                onChangeText={setAmount}
              />
              <View className='absolute bg-[#FFA500] p-3 h-12  rounded-r-lg right-0 items-center justify-center'>
                <ThemedText className='text-sm font-bold'>KSH</ThemedText>
              </View>
            </ThemedView>
          </View>
          {/* transaction fee */}

          <CustomTextInput
            title='Transaction Fee'
            placeholder=''
            value={transactionFee.toString()}
            onChangeText={setTransactionFee}
            keyboardType='numeric'
          />

          <View className='w-full mt-2'>
            <ThemedText className='font-pbold text-sm ml-2 mb-1'>
              Transaction Type
            </ThemedText>
            <ThemedView
              lightColor='#e5e7eb'
              darkColor='#1c1c1e'
              className='mb-6 pb-2 rounded-lg'
              style={{
                borderWidth: 1,
                borderColor: Colors[useColorScheme('border')].border,
              }}
            >
              <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                style={{
                  color: Colors[useColorScheme('customIcon')].customIcon,
                }}
                dropdownIconColor={Colors.orange}
              >
                <Picker.Item label='Income' value='income' />
                <Picker.Item label='Expense' value='expense' />
              </Picker>
            </ThemedView>
          </View>
          {/* Date Picker */}
          <DatePicker
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            date={date}
            setDate={setDate}
          />

          {/* Description Input */}
          <CustomTextInput
            title='Description'
            placeholder='Add a description...'
            value={description}
            onChangeText={setDescription}
            multiline
            containerStyle={{
              minHeight: 100,
            }}
            inputContainerStyle={{
              minHeight: 100,
            }}
          />

          {/* Submit Button */}
          <Button
            title='Add Transaction'
            handleOpenPress={handleOnSubmit}
            customStyles={{
              marginVertical: 20,
            }}
            isLoading={isLoading}
          />
        </View>

        {/* BottomSheet for categories*/}
      </ScrollView>
      <CategoryListBottomSheet
        setSelectedCategoryObj={setSelectedCategoryObj}
        selectedCategory={selectedCategory}
        bottomSheetRef={bottomSheetRef}
        setSelectedCategory={setSelectedCategory}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
