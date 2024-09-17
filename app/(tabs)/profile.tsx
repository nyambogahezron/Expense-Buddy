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
import { StatusBar } from 'expo-status-bar';
import { ExternalLink } from '@/components/ExternalLink';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView, ThemedText } from '@/components/Themed';
import OptionContainer from '@/components/OptionContainer';

const width = Dimensions.get('window').width;

const Profile = () => {
  const { theme } = useTheme();

  return (
    <ThemedSafeAreaView className='flex-1'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen
        options={{
          title: 'Profile',
          headerShown: true,
          headerTitleAlign: 'center',
          statusBarStyle: theme === 'light' ? 'dark' : 'light',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className={`bg-opacity-50 rounded-lg p-1 py-2 ${
                theme === 'light' ? 'bg-white' : 'bg-[#070B11]'
              }`}
            >
              <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                <Feather name='arrow-left' size={22} />
              </View>
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              className={`bg-opacity-50 rounded-lg p-1 py-2 ${
                theme === 'light' ? 'bg-white' : 'bg-[#070B11]'
              }`}
            >
              <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                <Ionicons name='log-out-outline' size={22} />
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
        <View className='flex items-center mb-8 mt-5'>
          <View
            className={`w-28 h-28 flex items-center justify-center rounded-full ${
              theme === 'light' ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <Image
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1621376104241004549/c-_rHzLH_400x400.jpg',
              }}
              className='w-24 h-24 rounded-full'
            />
          </View>
          <ThemedText className='text-lg font-bold mt-4'>John Doe</ThemedText>
          <ThemedText
            className={`text-gray-600 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            johndoe@gmail.com
          </ThemedText>
        </View>

        {/* Account Settings Options */}
        <View className='px-4'>
          <OptionContainer
            title='Settings'
            icon='settings-outline'
            handleOnPress={() => router.push('/(profile)/settings')}
          />
          <OptionContainer
            title='Account Info'
            icon='person-outline'
            handleOnPress={() => router.push('/(profile)/accountInfo')}
          />

          <View className='mb-4 flex items-center justify-center'>
            <ExternalLink href='https://nyambogahezron.vercel.app'>
              <View
                className={`flex-row items-center justify-between rounded-lg px-4 py-3 ${
                  theme === 'light' ? 'bg-white' : 'bg-[#1c1c1e]'
                }`}
                style={{ width: width * 0.9 }}
              >
                <View className='flex-row items-center '>
                  <Ionicons
                    name='lock-closed-outline'
                    size={22}
                    color='#6B7280'
                  />
                  <Text
                    className={`ml-4 ${
                      theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                    }`}
                  >
                    Privacy Policy
                  </Text>
                </View>
                <View className='absolute flex right-2'>
                  <Ionicons name='chevron-forward' size={22} color='#6B7280' />
                </View>
              </View>
            </ExternalLink>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center rounded-lg px-4 py-3 ${
              theme === 'light' ? 'bg-white' : 'bg-[#1c1c1e]'
            }`}
            onPress={() => router.push('/(tabs)/')}
          >
            <Ionicons name='log-out-outline' size={22} color='#EF4444' />
            <Text className='ml-4 text-red-600'>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
};

export default Profile;
