import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useTheme } from '@/context/ThemeProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { currencies } from '@/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useToast } from 'react-native-toast-notifications';
import ThemedText  from './ui/Text';

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
      <View style={[styles.container, { width: width * 0.95 }]}>
        <ThemedText style={styles.title}>Choose Currency</ThemedText>
      </View>
      <BottomSheetFlatList
        data={currencies}
        keyExtractor={(item) => item.code.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.currencyItem,
              { width: width * 0.95 },
              item.code === UserCurrency && styles.selectedCurrency,
            ]}
            key={item.code}
            onPress={() => handleCurrencySelect(item)}
          >
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyText}>{item.code}</Text>
              <Text style={styles.currencyText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyItem: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    width: '100%',
  },
  selectedCurrency: {
    borderWidth: 2,
    borderColor: '#38a169',
  },
  currencyInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  currencyText: {
    color: '#fff',
  },
  flatListContent: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});
