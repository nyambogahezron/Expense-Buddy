import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TransactionProps } from '@/types';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import isEmoji from '@/utils/isEmoji';
import { useDataContext } from '@/context/DataProvider';
import { useToast } from 'react-native-toast-notifications';
import Animated, {
  FadeIn,
  FadeOut,
  FadeInRight,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function TransactionDetails() {
  const { deleteTransaction } = useDataContext();

  // get item from local search params
  const { item } = useLocalSearchParams();
  const transaction: TransactionProps =
    typeof item === 'string' ? JSON.parse(item) : null;
  const {
    amount,
    date,
    transactionFee,
    description,
    type,
    category,
    iconColor,
    title,
  } = transaction;
  const { theme } = useTheme();
  const toast = useToast();
  const transactionDetails = [
    { label: 'Amount', value: amount },
    { label: 'Date', value: date },
    { label: 'Transaction Fee', value: transactionFee },
    { label: 'Description', value: description },
    { label: 'Transaction Type', value: type },
    { label: 'Transaction Category', value: category.name },
  ];

  return (
    <ThemedSafeAreaView className='flex flex-1 px-2 relative'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f2f2f2' : '#070B11'}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        className='flex flex-1 mb-8 relative'
      >
        {/* close btn */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          className='absolute top-0 left-0 m-2'
        >
          <AntDesign name='closecircleo' size={26} color='#f97316' />
        </TouchableOpacity>
        <BlurView
          intensity={100}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className='relative items-center justify-center border-2 p-1 pb-3 rounded-[18px] mt-14 shadow-lg'
            style={{
              borderColor: theme === 'light' ? '#f2f2f2' : '#1c1c1e',
            }}
          >
            {/* Title  */}
            <ThemedView
              darkColor='#1c1c1e'
              lightColor='#f2f2f2'
              className='absolute top-0 flex flex-col items-center rounded-full p-1  -mt-10 mb-8 border-2 border-orange-500 '
            >
              <View
                className='flex items-center justify-center h-14 w-14 rounded-full p-2'
                style={{
                  backgroundColor: iconColor ? iconColor : '#3030cc',
                }}
              >
                <Text className='text-lg font-bold text-white'>
                  {category.icon && isEmoji(category.icon)
                    ? category.icon
                    : title.charAt(0)}
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
                      className='mb-4 relative px-2'
                      style={{ width: width * 0.92 }}
                    >
                      <ThemedView
                        darkColor='#1c1c1e'
                        lightColor='#ffffff'
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
          </Animated.View>
          {/* Action Buttons */}
          <View className='flex w-full flex-row justify-end gap-2 mr-4 mt-4'>
            <Animated.View entering={FadeInRight.delay(200)}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: '/(transactions)/edit',
                    params: { transaction: JSON.stringify(transaction) },
                  })
                }
                className='p-3  rounded-lg'
              >
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome
                    name='edit'
                    size={18}
                    color={theme === 'light' ? '#000' : '#fff'}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View entering={FadeInRight.delay(300)}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  deleteTransaction(transaction.id);
                  router.push('/(tabs)');
                  toast.show('Transaction deleted successfully', {
                    type: 'success',
                  });
                }}
                className='p-3 rounded-lg'
              >
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome name='trash' size={18} color='red' />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </BlurView>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
