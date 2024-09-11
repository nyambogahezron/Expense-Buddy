import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { router, Stack } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { CustomButton } from '@/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function CreateCategory() {
  const [id, setId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [icon, setIcon] = React.useState('');
  const handleOnSubmit = () => {
    console.log('Submitted: ', title, icon);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style='light' backgroundColor='#161622' />
      <SafeAreaView className='flex-1 bg-gray-100 w-full h-full justify-center'>
        <Stack.Screen
          options={{
            title: 'Create New Categories',
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
                onPress={() => router.push('/modals/EditCategory')}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2'
              >
                <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                  <FontAwesome name='edit' size={22} color='black' />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <ScrollView className='mt-[20%]'>
          <View className='px-4 my-auto h-full'>
            {/* Title */}
            <View className='mb-2'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Title
              </Text>
              <View className='bg-white p-4 rounded-lg flex-row justify-between items-center mb-4'>
                <TextInput
                  className='text-sm flex-1'
                  placeholder='Enter Title'
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>
            {/* Icon */}
            <View className='mb-2'>
              <Text className='text-gray-600 font-pbold text-lg ml-2 mb-1'>
                Icon
              </Text>
              <View className='bg-white p-4 rounded-lg flex-row justify-between items-center mb-4'>
                <TextInput
                  className='text-sm flex-1'
                  placeholder='Select Emoji Icon'
                  value={icon}
                  onChangeText={setIcon}
                />
              </View>
            </View>
            <CustomButton
              title='Save'
              handleOpenPress={() => handleOnSubmit()}
              customStyles='bg-orange-500 mt-5'
              textStyles='text-white'
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
