import { View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native';

export default function CategoriesDetails() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='light' backgroundColor='#161622' />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen
          options={{
            title: 'Categories',
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
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => router.push('/modals/createCategory')}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2'
              >
                <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                  <FontAwesome5 name='plus' size={22} color='#333' />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <View>
          <Text>Categories</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
