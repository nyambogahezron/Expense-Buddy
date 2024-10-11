import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useTheme } from '@/context/ThemeProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { currencies } from '@/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useToast } from 'react-native-toast-notifications';
import { ThemedText } from './Themed';

const width = Dimensions.get('window').width;

interface CurrencyContainerProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

export default function CurrencyContainer({
  bottomSheetRef,
}: CurrencyContainerProps) {
  const { theme } = useTheme();
  const toast = useToast();
  const { UserCurrency, getUserCurrency } = useGlobalContext();

  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleCurrencySelect = async (currency: any) => {
    try {
      await AsyncStorage.setItem('selectedCurrency', JSON.stringify(currency));
     toast.show('Currency saved successfully', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        animationType: 'zoom-in',
      });
      handleClosePress();
      getUserCurrency();
    } catch (error) {
      console.error('Error saving currency:', error);
    }
  };

  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      handleIndicatorStyle={{
        backgroundColor: theme === 'light' ? '#333' : '#fff',
      }}
      backgroundStyle={{
        backgroundColor: theme === 'light' ? '#fff' : '#070B11',
      }}
    >
      <View className='w-full p-2 ml-2' style={{ width: width * 0.95 }}>
        <ThemedText className='text-lg font-bold'>Choose Currency</ThemedText>
      </View>
      <BottomSheetFlatList
        data={currencies}
        keyExtractor={(item) => item.code.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: width * 0.95 }}
            key={item.code}
            onPress={() => handleCurrencySelect(item)}
            className={`mt-2 p-2 bg-gray-800 rounded-lg w-full ${
              item.code === UserCurrency ? 'border-2 border-green-600' : ''
            }`}
          >
            <View className='flex-row gap-2 items-center py-2'>
              <Text className='text-white'>{item.code}</Text>
              <Text className='text-white'>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 10 }}
      />
    </BottomSheet>
  );
}
