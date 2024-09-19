import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native';
import { TransactionCategoryProps } from '@/Types';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/TransactionsCard';
import { transactions } from '@/Data';
import { TransactionProps } from '@/Types';
import {
  ThemedText,
  ThemedView,
  ThemedSafeAreaView,
} from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/BackButton';

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

  const { theme } = useTheme();
  return (
    <ThemedSafeAreaView className='flex-1 '>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen
        options={{
          title: 'Category Details',
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton />,
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <ThemedView>
        {/* category transactions */}
        <ThemedView className='mt-4'>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={categoriesDetails}
              renderItem={({ item }) => <TransactionCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={
                <View>
                  <ThemedView className='px-2 mt-2'>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          theme === 'light' ? '#f3f4f6' : '#1c1c1e',
                      }}
                      activeOpacity={0.7}
                      className={`flex-row items-center justify-between p-4 rounded-lg mb-4 
                  }`}
                    >
                      <View className='flex-row items-center'>
                        <View className='bg-white p-3 rounded-full mr-4'>
                          <Text>{icon ? icon : name.charAt(0)}</Text>
                        </View>
                        <View>
                          <ThemedText className='font-bold'>{name}</ThemedText>
                        </View>
                      </View>

                      <FontAwesome5
                        name='edit'
                        size={18}
                        color={theme === 'light' ? 'black' : '#fff'}
                      />
                    </TouchableOpacity>
                  </ThemedView>
                  {categoriesDetails.length !== 0 && (
                    <View className='ml-4'>
                      <ThemedText className='capitalize text-[15px] ml-3 mb-3 font-psemibold'>
                        Transaction for {name}
                      </ThemedText>
                    </View>
                  )}
                </View>
              }
              ListEmptyComponent={
                <EmptyListCard title={`No Transactions For ${name}`} />
              }
            />
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
