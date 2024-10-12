import { View, Text, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeProvider';
import BottomSheet from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { ThemedSafeAreaView, ThemedView } from '@/components/Themed';
import BackButton from '@/components/BackButton';
import CurrencyContainer from '@/components/CurrencyContainer';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  return (
    <ThemedSafeAreaView className='flex-1 '>
      <StatusBar
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
        style={theme === 'light' ? 'dark' : 'light'}
      />

      <Stack.Screen
        options={{
          title: 'Settings',
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

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className='flex flex-1 px-3 '
      >
        <ThemedView>
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
              theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
            }`}
            onPress={() => toggleTheme()}
          >
            <Ionicons name='color-palette-outline' size={22} color='#6B7280' />
            <Text
              className={`ml-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}
            >
              Change Theme
            </Text>
            <View className='absolute flex right-2'>
              <Feather
                name={theme === 'light' ? 'sun' : 'moon'}
                size={20}
                color={theme === 'light' ? '#141518' : '#f2f2f2'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
              theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
            }`}
            onPress={() => router.push('/(profile)/lockScreen')}
          >
            <Feather name='lock' size={22} color='#6B7280' />
            <Text
              className={`ml-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}
            >
              Lock Screen
            </Text>
            <View className='absolute flex right-2'>
              <Ionicons name='chevron-forward' size={22} color='#6B7280' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
              theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
            }`}
            onPress={() => router.push('/(profile)/settings')}
          >
            <MaterialIcons name='password' size={22} color='#6B7280' />
            <Text
              className={`ml-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}
            >
              Change Password
            </Text>
            <View className='absolute flex right-2'>
              <Ionicons name='chevron-forward' size={22} color='#6B7280' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
              theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
            }`}
            onPress={() => handleOpenPress()} // open currency bottom sheet
          >
            <MaterialIcons name='currency-exchange' size={22} color='#6B7280' />
            <Text
              className={`ml-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}
            >
              Currency
            </Text>
            <View className='absolute flex right-2'>
              <Ionicons name='chevron-forward' size={22} color='#6B7280' />
            </View>
          </TouchableOpacity>

          {/* danger zone  */}
          <View
            className={`relative border p-2 rounded-lg mt-8 ${
              theme === 'light' ? 'border-red-100 bg-red-50' : 'border-red-700 '
            }`}
          >
            <Text
              className={`top-0 font-bold -ml-2 -mt-8 mb-4 w-28 p-3 rounded-sm ${
                theme === 'light'
                  ? 'text-red-700 bg-white'
                  : 'text-red-200 bg-[#1c1c1e]'
              }`}
            >
              Danger Zone
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
                theme === 'light' ? 'bg-white' : 'bg-[#1c1c1e]'
              }`}
              onPress={() => router.push('/(tabs)/')}
            >
              <Ionicons name='log-out-outline' size={22} color='#EF4444' />
              <Text className='ml-4 text-red-600 font-bold'>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
                theme === 'light' ? 'bg-white' : 'bg-[#1c1c1e]'
              }`}
              onPress={() => router.push('/(profile)/settings')}
            >
              <MaterialIcons name='delete-outline' size={22} color='#EF4444' />
              <Text className='ml-4 text-red-600 font-bold'>
                Delete Account
              </Text>
              <View className='absolute flex right-2'>
                <Ionicons name='chevron-forward' size={22} color='#6B7280' />
              </View>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>

      {/*  currency bottom sheet  */}
      <CurrencyContainer bottomSheetRef={bottomSheetRef} />
    </ThemedSafeAreaView>
  );
}
