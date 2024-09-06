import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { transactions } from '@/Data';
import HomeTransactionCard from '@/components/HomeTransactionsCard';

const width = Dimensions.get('window').width;
export default function HomeScreen() {
  const [category, setCategory] = React.useState('All');
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sectionItems, setSectionItems] = React.useState(10);

  const transactionsData = transactions.slice(0, 10);

  const handleLoadMore = () => {};
  return (
    <SafeAreaView className='flex-1 bg-gray-100 px-2'>
      <StatusBar style='light' backgroundColor='#161622' />
      {/* Header */}
      <Stack.Screen
        options={{
          title: 'Explore',
          headerShown: true,
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
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.5} onPress={()=> router.push('/(profile)/settings')} className='bg-white bg-opacity-50 rounded-lg p-1 py-2'>
              <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                <Ionicons name='settings-outline' size={22} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <View>
        <View className='flex-row items-center justify-center gap-2 mt-4 mb-4'>
          <TouchableOpacity
            activeOpacity={0.6}
            className='flex items-center text-lg font-psemibold p-3 rounded-lg bg-blue-500'
            style={{ width: width * 0.42 }}
          >
            <Text className='text-white'>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            className='flex items-center text-lg font-psemibold p-3 rounded-lg bg-red-500'
            style={{ width: width * 0.42 }}
          >
            <Text className='text-white'>Expense</Text>
          </TouchableOpacity>
        </View>
        {/* Transactions */}
        <View className='flex-row justify-between mt-4 mb-4'>
          <Text className='text-[16px] font-pbold ml-2 text-gray-800'>
            Transactions
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={transactionsData}
          renderItem={({ item }) => <HomeTransactionCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            <View>
              <TouchableOpacity activeOpacity={0.6} onPress={handleLoadMore}>
                <View className='flex-row items-center justify-center bg-gray-200 h-10 w-full mr-3 rounded-md mt-2 mb-4'>
                  <View className='flex-row items-center gap-2'>
                    <Text className='text-sm font-semibold  text-gray-600'>
                      Load more
                    </Text>
                    <ActivityIndicator />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
