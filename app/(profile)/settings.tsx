import { View, Text, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeProvider';
import BottomSheet from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import {
  ThemedSafeAreaView,
  ThemedText,
  ThemedView,
} from '@/components/Themed';
import OptionContainer from '@/components/OptionContainer';
import BackButton from '@/components/BackButton';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  return (
    <ThemedSafeAreaView className='flex-1 '>
      <StatusBar
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
        style={theme === 'light' ? 'dark' : 'light'}
      />
      <GestureHandlerRootView>
        <Stack.Screen
          options={{
            title: 'Settings',
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
          }}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className='flex flex-1 px-3 '
        >
          <ThemedView>
            <OptionContainer
              title='Theme'
              icon='color-palette-outline'
              handleOnPress={() => handleOpenPress()}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              className={`flex-row items-center rounded-lg px-4 py-3 mb-4 ${
                theme === 'light' ? 'bg-gray-200' : 'bg-[#1c1c1e]'
              }`}
              onPress={() => router.push('/(profile)/settings')}
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
              onPress={() => router.push('/(profile)/settings')}
            >
              <MaterialIcons
                name='currency-exchange'
                size={22}
                color='#6B7280'
              />
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
                theme === 'light'
                  ? 'border-red-100 bg-red-50'
                  : 'border-red-700 '
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
          </ThemedView>
        </ScrollView>

        {/* theme toggle bottom sheet  */}
        <BottomSheet
          snapPoints={['25%', '40%']}
          ref={bottomSheetRef}
          index={-1}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: '#fff' }}
          backgroundStyle={{ backgroundColor: '#1B1F24' }}
        >
          <View className=' w-full h-full p-4'>
            <Text className='text-white text-lg font-bold'>Choose Theme</Text>
            <View className='flex items-center justify-between mt-4'>
              <TouchableOpacity
                style={{
                  backgroundColor: theme === 'light' ? '#f2f2f2' : '#1c1c1e',
                }}
                activeOpacity={0.7}
                className={`rounded-lg p-4 w-full mt-4 items-center  ${
                  theme === 'light' ? 'border-2 border-green-700' : ''
                }`}
                onPress={() => {
                  toggleTheme(), handleClosePress();
                }}
              >
                <View className='flex w-full flex-row justify-between'>
                  <ThemedText className=' text-lg font-bold'>Light</ThemedText>
                  <View
                    className={`w-6 h-6 rounded-full bg-white border-2 border-neutral-600 ${
                      theme === 'light' ? 'bg-green-700' : 'bg-white'
                    }`}
                  ></View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: theme === 'light' ? '#f2f2f2' : '#1c1c1e',
                }}
                activeOpacity={0.7}
                className={`rounded-lg p-4 w-full mt-4 items-center  ${
                  theme === 'dark' ? 'border-2 border-green-700' : ''
                }`}
                onPress={() => {
                  toggleTheme(), handleClosePress();
                }}
              >
                <View className='flex w-full flex-row justify-between'>
                  <ThemedText className='text-lg font-bold'>Dark</ThemedText>
                  <View
                    className={`w-6 h-6 rounded-full bg-white border-2 border-neutral-600 ${
                      theme === 'dark' ? 'bg-green-700' : 'bg-white'
                    }`}
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </ThemedSafeAreaView>
  );
}
