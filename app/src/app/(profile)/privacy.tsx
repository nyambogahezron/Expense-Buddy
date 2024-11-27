import { View, Text } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Settings() {
  return (
    <GestureHandlerRootView className='bg-gray-100 flex flex-1 px-2'>
      <StatusBar backgroundColor='#ffffff' style='dark' />
      <Stack.Screen
        options={{
          title: 'Account Info',
          headerShown: true,
          headerTitleAlign: 'center',
          statusBarStyle: 'light',
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

      <View className='flex flex-1 justify-center items-center'>
        <Text className='text-lg font-bold'>Settings</Text>
      </View>
    </GestureHandlerRootView>
  );
}
