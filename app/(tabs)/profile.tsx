// screens/Profile.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ExternalLink } from '@/components/ExternalLink';
const { width, height } = Dimensions.get('window');
const Profile = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
      <Stack.Screen
        options={{
          title: 'Profile',
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
            <TouchableOpacity className='bg-white bg-opacity-50 rounded-lg p-1 py-2'>
              <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                <Ionicons name='settings-outline' size={22} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Header and Profile Info */}
        <View className='flex items-center mb-8 mt-1'>
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
          <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
            onPress={() => router.push('/(profile)/settings')}
          >
            <Ionicons name='settings-outline' size={24} color='#6B7280' />
            <Text className='ml-4 text-gray-800'>Settings</Text>
            <View className='absolute flex right-2'>
              <Ionicons name='chevron-forward' size={24} color='#6B7280' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row items-center bg-white rounded-lg px-4 py-3 mb-4'
            onPress={() => router.push('/(profile)/accountInfo')}
          >
            <Ionicons name='person-outline' size={24} color='#6B7280' />
            <Text className='ml-4 text-gray-800'>Account Info</Text>
            <View className='absolute flex right-2'>
              <Ionicons name='chevron-forward' size={24} color='#6B7280' />
            </View>
          </TouchableOpacity>
          <View className='mb-4 flex items-center justify-center'>
            <ExternalLink href='https://nyambogahezron.vercel.app'>
              <View
                className='flex-row items-center justify-between bg-white rounded-lg px-4 py-3 '
                style={{ width: width * 0.9 }}
              >
                <View className='flex-row items-center '>
                  <Ionicons
                    name='lock-closed-outline'
                    size={24}
                    color='#6B7280'
                  />

                  <Text className='ml-4 text-gray-800  '>Privacy Policy</Text>
                </View>
                <View className='absolute flex right-2'>
                  <Ionicons name='chevron-forward' size={24} color='#6B7280' />
                </View>
              </View>
            </ExternalLink>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className='flex-row items-center bg-white rounded-lg px-4 py-3'
            onPress={() => router.push('/(tabs)/')}
          >
            <Ionicons name='log-out-outline' size={24} color='#EF4444' />
            <Text className='ml-4 text-red-600'>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
};

export default Profile;
