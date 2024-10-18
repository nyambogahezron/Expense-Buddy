import { View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { TransactionCategoryProps } from '@/types';
import EmptyListCard from '@/components/EmptyListCard';
import TransactionCard from '@/components/cards/TransactionCard';
import { TransactionProps } from '@/types';
import {
  ThemedText,
  ThemedView,
  ThemedSafeAreaView,
} from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import { useDataContext } from '@/context/DataProvider';

export default function CategoriesDetails() {
  const { theme } = useTheme();
  const { transactionsData } = useDataContext();

  const [categoriesDetails, setCategoriesDetails] = useState<
    TransactionProps[]
  >([]);
  const { item } = useLocalSearchParams();
  const category: TransactionCategoryProps =
    typeof item === 'string' ? JSON.parse(item) : null;
  const { id, name, icon } = category;

  useEffect(() => {
    const data = transactionsData.filter(
      (item: any) => item.category.id === id
    );
    setCategoriesDetails(data);
  }, []);

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
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton containerStyles='-ml-2' />,
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
      />
      <ThemedView className='-mt-8'>
        {/* category transactions */}

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categoriesDetails}
          renderItem={({ item }) => (
            <View className='px-2'>
              <TransactionCard item={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View>
              {categoriesDetails.length > 0 && (
                <ThemedView className='px-2 mt-2'>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        theme === 'light' ? '#e5e7eb' : '#1c1c1e',
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
                        <ThemedText className='font-bold'>
                          {`Transactions for ${
                            name.length > 30 ? name.slice(0, 30) + '...' : name
                          }`}
                        </ThemedText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ThemedView>
              )}
            </View>
          }
          ListEmptyComponent={
            <EmptyListCard title={`No Transactions For ${name}`} />
          }
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
