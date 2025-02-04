import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TransactionProps } from '@/types';
import { Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import isEmoji from '@/utils/isEmoji';
import { useDataContext } from '@/context/DataProvider';
import { useToast } from 'react-native-toast-notifications';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import BackButton from '@/components/navigation/BackButton';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const { width } = Dimensions.get('window');

export default function TransactionDetails() {
  const { deleteTransaction } = useDataContext();

  const { theme } = useTheme();
  const toast = useToast();

  /**
   * @desc get item from local search params
   */
  const { transaction } = useLocalSearchParams();
  const item: TransactionProps =
    typeof transaction === 'string' ? JSON.parse(transaction) : null;

  const transactionDetails = [
    { label: 'Amount', value: item.amount },
    { label: 'Date', value: item.date },
    { label: 'Transaction Fee', value: item.transactionFee },
    { label: 'Description', value: item.description },
    { label: 'Transaction Type', value: item.type },
    { label: 'Transaction Category', value: item.category.name },
  ];

  const handleOnDelete = (id: string) => {
    deleteTransaction(id);
    router.push('/(tabs)');
    toast.show('Transaction deleted successfully', {
      type: 'success',
    });
  };

  const handleOnEdit = (item: TransactionProps) => {
    router.push({
      pathname: '/(transactions)/edit',
      params: { transaction: JSON.stringify(item) },
    });
  };

  return (
    <ThemedSafeAreaView>
      <Stack.Screen
        options={{
          title: 'Transaction Details',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors[useColorScheme('header')].header,
          },
          headerTitleStyle: {
            color: Colors[useColorScheme('customIcon')].customIcon,
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerLeft: () => <BackButton />,
          headerRight: () => (
            <Menu>
              <MenuTrigger>
                <FontAwesome
                  name='ellipsis-v'
                  size={20}
                  color={theme === 'light' ? '#000' : '#fff'}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => handleOnEdit(item)}>
                  <Text>Edit</Text>
                </MenuOption>
                <MenuOption onSelect={() => handleOnDelete(item.id)}>
                  <Text>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View>
          <View
            className='relative items-center justify-center p-1 pb-3 rounded-[18px] mt-10'
            style={{
              borderColor: theme === 'light' ? '#f2f2f2' : '#1c1c1e',
            }}
          >
            {/* Title  */}
            <ThemedView
              darkColor='#1c1c1e'
              lightColor='#f2f2f2'
              className='absolute top-0 flex flex-col items-center rounded-full p-1 -mt-10 mb-8  '
            >
              <View
                className='flex items-center justify-center h-14 w-14 rounded-full p-2'
                style={{
                  backgroundColor: item.iconColor ? item.iconColor : '#3030cc',
                }}
              >
                <Text className='text-lg font-bold text-white'>
                  {item.category.icon && isEmoji(item.category.icon)
                    ? item.category.icon
                    : item.title.charAt(0)}
                </Text>
              </View>
            </ThemedView>
            <View className='mt-14'>
              {/* Transaction Details */}
              {transactionDetails.map(
                (detail, index) =>
                  detail && (
                    <View
                      key={index}
                      className='mb-2 relative px-2'
                      style={{ width: width * 0.92 }}
                    >
                      <ThemedView
                        darkColor='#1c1c1e'
                        lightColor='transparent'
                        className='p-2 rounded-lg '
                      >
                        <ThemedText className='ml-2 font-pbold text-[15px]'>
                          {detail.label}
                        </ThemedText>

                        <ThemedText
                          darkColor='#ccc'
                          className='text-[14px] capitalize font-pregular ml-2'
                        >
                          {detail.value}
                        </ThemedText>
                      </ThemedView>
                    </View>
                  )
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'gray',
    height: '100%',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
