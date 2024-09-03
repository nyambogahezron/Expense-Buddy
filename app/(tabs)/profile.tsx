// screens/Profile.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerShown: true,
          headerTitleAlign: 'center',
          statusBarStyle: 'dark',
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
            <TouchableOpacity className='bg-white bg-opacity-50 rounded-lg p-1 py-2'>
              <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                <Ionicons name='settings-outline' size={22} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      {/* Header and Profile Info */}
      <View className='flex items-center mt-12 mb-8'>
        <View className='bg-white w-28 h-28 flex items-center justify-center rounded-full'>
          <Image
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1621376104241004549/c-_rHzLH_400x400.jpg',
            }}
            className='w-24 h-24 rounded-full'
          />
        </View>
        <Text className='text-lg font-bold mt-4'>John Doe</Text>
        <Text className='text-gray-600'>johndoe@gmail.com</Text>
      </View>

      {/* Account Settings Options */}
      <View className='px-4'>
        <TouchableOpacity className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'>
          <Ionicons name='person-outline' size={24} color='#6B7280' />
          <Text className='ml-4 text-gray-800'>Account Info</Text>
          <View className='absolute flex right-2'>
            <Ionicons name='chevron-forward' size={24} color='#6B7280' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'>
          <Ionicons name='shield-checkmark-outline' size={24} color='#6B7280' />
          <Text className='ml-4 text-gray-800'>Security Code</Text>
          <View className='absolute flex right-2'>
            <Ionicons name='chevron-forward' size={24} color='#6B7280' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'>
          <Ionicons name='lock-closed-outline' size={24} color='#6B7280' />
          <Text className='ml-4 text-gray-800'>Privacy Policy</Text>
          <View className='absolute flex right-2'>
            <Ionicons name='chevron-forward' size={24} color='#6B7280' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'>
          <Ionicons name='settings-outline' size={24} color='#6B7280' />
          <Text className='ml-4 text-gray-800'>Settings</Text>
          <View className='absolute flex right-2'>
            <Ionicons name='chevron-forward' size={24} color='#6B7280' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center bg-white rounded-lg px-4 py-3'>
          <Ionicons name='log-out-outline' size={24} color='#EF4444' />
          <Text className='ml-4 text-red-600'>Logout</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
};

export default Profile;
