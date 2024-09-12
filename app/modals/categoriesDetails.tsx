import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native';
import { TransactionCategoryProps } from '@/Types';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/TransactionsCard';
import { transactions } from '@/Data';
import { TransactionProps } from '@/Types';

export default function CategoriesDetails() {
  const [categoriesDetails, setCategoriesDetails] = useState<
    TransactionProps[]
  >([]);
  const { item } = useLocalSearchParams();
  const category: TransactionCategoryProps =
    typeof item === 'string' ? JSON.parse(item) : null;
  const { id, name, icon } = category;

  useEffect(() => {
    const data = transactions.filter((item) => item.category.id === id);
    setCategoriesDetails(data);
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='#161622' />
      <Stack.Screen
        options={{
          title: 'Category Details',
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className='bg-white bg-opacity-50 rounded-lg p-1 py-2 '
            >
              <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                <Feather name='arrow-left' size={22} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: '#333',
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <View>
        {/* category transactions */}
        <View className='mt-4'>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={categoriesDetails}
              renderItem={({ item }) => <TransactionCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={
                <View>
                  <View className='px-2 mt-2'>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      className={`flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-4 
                  }`}
                    >
                      <View className='flex-row items-center'>
                        <View className='bg-white p-3 rounded-full mr-4'>
                          <Text>🛒</Text>
                        </View>
                        <View>
                          <Text className='font-bold text-gray-800'>
                            {name}
                          </Text>
                        </View>
                      </View>

                      <FontAwesome5 name='edit' size={18} color='black' />
                    </TouchableOpacity>
                  </View>
                  {categoriesDetails && (
                    <View className='ml-4'>
                      <Text className='capitalize text-[15px] ml-3 mb-3 font-psemibold'>
                        Transaction for {name}
                      </Text>
                    </View>
                  )}
                </View>
              }
              ListEmptyComponent={
                <EmptyListCard title={`No Transactions For ${name}`} />
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
