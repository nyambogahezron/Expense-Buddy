import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ThemedView, ThemedSafeAreaView } from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/navigation/BackButton';
import CustomTextInput from '@/components/Form/CustomTextInput';

export default function CreateCategory() {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const { theme } = useTheme();

  const handleOnSubmit = () => {
    console.log('Submitted: ', title, icon);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <ThemedSafeAreaView className='flex-1 w-full h-full justify-center'>
        <Stack.Screen
          options={{
            title: 'Create Categories',
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
        <ScrollView className='mt-[20%]'>
          <ThemedView className='px-4 my-auto h-full'>
            {/* Title */}

            <CustomTextInput
              title='Title'
              onChangeText={setTitle}
              value={title}
              placeholder='Enter Title'
            />
            {/* Icon */}
            <CustomTextInput
              title='Icon'
              onChangeText={setIcon}
              value={icon}
              placeholder='Choose Emoji For Icon'
            />

            <CustomButton
              title='Create'
              handleOpenPress={() => handleOnSubmit()}
              customStyles='bg-orange-500 mt-5'
              textStyles='text-white'
            />
          </ThemedView>
        </ScrollView>
      </ThemedSafeAreaView>
    </GestureHandlerRootView>
  );
}
