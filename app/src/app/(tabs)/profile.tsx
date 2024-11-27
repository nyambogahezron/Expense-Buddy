import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ExternalLink } from '@/components/ExternalLink';
import { useTheme } from '@/context/ThemeProvider';
import {
  ThemedSafeAreaView,
  ThemedText,
  ThemedView,
} from '@/components/Themed';
import OptionContainer from '@/components/OptionContainer';
import BackButton from '@/components/navigation/BackButton';
import HeaderRightIconCard from '@/components/navigation/HeaderRightIconCard';
import { supabase } from '@/utils/supabase';
import { useGlobalContext } from '@/context/GlobalProvider';

const width = Dimensions.get('window').width;

const Profile = () => {
  const { theme } = useTheme();
  const { User } = useGlobalContext();

  // Sign out user
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error.message);

    router.replace('/(auth)/login');
  }

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
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton />,
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <HeaderRightIconCard handleOnPress={signOut}>
              <Ionicons
                name='log-out-outline'
                size={22}
                color={theme === 'light' ? 'black' : '#fff'}
              />
            </HeaderRightIconCard>
          ),
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Header and Profile Info */}
        <View className='flex items-center mb-8'>
          <ThemedView
            darkColor='#1c1c1e'
            lightColor='#ffffff'
            className={`w-28 h-28 flex items-center justify-center rounded-full `}
          >
            <Image
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1621376104241004549/c-_rHzLH_400x400.jpg',
              }}
              className='w-24 h-24 rounded-full'
            />
          </ThemedView>
          <ThemedText className='text-lg font-bold mt-4'>
            {User?.name}
          </ThemedText>
          <ThemedText
            className={`text-gray-600 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            {User?.email}
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

          <View className='mb-4 '>
            <ExternalLink href='https://nyambogahezron.vercel.app'>
              <ThemedView
                darkColor='#1c1c1e'
                lightColor='#e5e7eb'
                className={`flex-row items-center justify-between rounded-lg  px-4 py-3 `}
                style={{ width: width }}
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
              </ThemedView>
            </ExternalLink>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center rounded-lg px-4 py-3 ${
              theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
            }`}
            onPress={signOut}
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
