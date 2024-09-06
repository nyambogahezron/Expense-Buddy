import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  return (
    <SafeAreaView className='bg-gray-100 flex flex-1 px-2'>
      <GestureHandlerRootView>
        <StatusBar backgroundColor='#fff' barStyle='dark-content' />
        <Stack.Screen
          options={{
            title: 'Settings',
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

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className='flex flex-1'
        >
          <View className='mt-5'>
            <TouchableOpacity
              activeOpacity={0.7}
              className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
              onPress={() => router.push('/(profile)/settings')}
            >
              <Ionicons
                name='color-palette-outline'
                size={22}
                color='#6B7280'
              />
              <Text className='ml-4 text-gray-800'>Theme</Text>
              <View className='absolute flex right-2'>
                <Ionicons name='chevron-forward' size={22} color='#6B7280' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
              onPress={() => router.push('/(profile)/settings')}
            >
              <Feather name='lock' size={22} color='#6B7280' />
              <Text className='ml-4 text-gray-800'>Lock Screen</Text>
              <View className='absolute flex right-2'>
                <Ionicons name='chevron-forward' size={22} color='#6B7280' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
              onPress={() => router.push('/(profile)/settings')}
            >
              <MaterialIcons name='password' size={22} color='#6B7280' />
              <Text className='ml-4 text-gray-800'>Change Password</Text>
              <View className='absolute flex right-2'>
                <Ionicons name='chevron-forward' size={22} color='#6B7280' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
              onPress={() => router.push('/(profile)/settings')}
            >
              <MaterialIcons
                name='currency-exchange'
                size={22}
                color='#6B7280'
              />
              <Text className='ml-4 text-gray-800'>Currency</Text>
              <View className='absolute flex right-2'>
                <Ionicons name='chevron-forward' size={22} color='#6B7280' />
              </View>
            </TouchableOpacity>

            {/* danger zone  */}
            <View className='relative border border-red-100 p-2 bg-red-50 rounded-lg mt-8'>
              <Text className='top-0 text-red-700 font-bold -ml-2 -mt-8 mb-4 bg-white w-28 p-3 rounded-sm'>
                Danger Zone
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
                onPress={() => router.push('/(tabs)/')}
              >
                <Ionicons name='log-out-outline' size={22} color='#EF4444' />
                <Text className='ml-4 text-red-600 font-bold'>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
                onPress={() => router.push('/(profile)/settings')}
              >
                <MaterialIcons
                  name='delete-outline'
                  size={22}
                  color='#EF4444'
                />
                <Text className='ml-4 text-red-600 font-bold'>
                  Delete Account
                </Text>
                <View className='absolute flex right-2'>
                  <Ionicons name='chevron-forward' size={22} color='#6B7280' />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
