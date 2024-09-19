import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import { ThemedText, ThemedView } from './Themed';
import { useTheme } from '@/context/ThemeProvider';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import TransactionCategories from '@/Data/TransactionsTypes';
import { TransactionCategoryProps } from '@/Types';
import { Entypo } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const { width } = Dimensions.get('window');

type CategoryPickerProps = {
  selectedCategory?: string;
  setSelectedCategory: (value: string) => void;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
};

export default function CategoryListBottomSheet({
  setSelectedCategory,
  bottomSheetRef,
}: CategoryPickerProps) {
  const { theme } = useTheme();
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const handleClosePress = () => bottomSheetRef.current?.close();

  const CategoryCard = useCallback(
    ({ item }: { item: TransactionCategoryProps }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item.name);
          handleClosePress();
        }}
        key={item.id}
        activeOpacity={0.8}
        className='flex-row justify-between items-center bg-[#f3f4f6] p-4 rounded-lg mb-1 w-full'
        style={{
          width: width * 0.94,
          backgroundColor: theme === 'light' ? '#f3f4f6' : '#1c1c1e',
        }}
      >
        <View className='flex-row items-center'>
          <View className='bg-[#fff] p-3 rounded-full mr-4'>
            <Text>{item.icon ? item.icon : item.name.charAt(0)}</Text>
          </View>
          <View>
            <ThemedText className='font-bold'>{item.name}</ThemedText>
          </View>
        </View>
        <Entypo name='circle' size={24} color='green' />
      </TouchableOpacity>
    ),
    []
  );
  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: '#fff' }}
      backgroundStyle={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
      }}
    >
      <BottomSheetFlatList
        data={TransactionCategories}
        keyExtractor={(i) => i.id.toString()}
        renderItem={CategoryCard}
        contentContainerStyle={{ alignItems: 'center', padding: 0 }}
        ListHeaderComponent={
          <View>
            <CustomButton
              title='New Category'
              handleOpenPress={() => router.push('/modals/createCategory')}
              customStyles='bg-orange-600 my-5 p-3 rounded-none'
              textStyles='text-white text-sm'
            />
          </View>
        }
      />
    </BottomSheet>
  );
}
