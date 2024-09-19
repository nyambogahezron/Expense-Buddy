import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/CustomTextInput';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView } from '@/components/Themed';
import AuthHeader from '@/components/AuthHeader';
import { CustomButton } from '@/components';

const { width, height } = Dimensions.get('window');
export default function VerifyEmail() {
  const [code, setCode] = useState<string>('');
  const { theme } = useTheme();

  const handleSubmission = () => {
    console.log('Code:', code);
  };

  return (
    <ThemedSafeAreaView className='flex-1 flex px-3 w-full justify-center h-full items-center'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={{ width: width * 0.93, height: height }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className='my-20'
      >
        {/* Logo and Title */}
        <AuthHeader
          title=' Email Verification'
          description='Enter your code to verify your email.'
        />

        <CustomTextInput
          title=''
          onChangeText={(text) => setCode(text)}
          placeholder='Enter Code'
          keyboardType='numeric'
        />

        <CustomButton
          title='Verify '
          customStyles='bg-blue-600 '
          handleOpenPress={handleSubmission}
          textStyles='text-white text-lg font-bold'
        />
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
