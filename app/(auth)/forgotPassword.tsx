import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/Form/CustomTextInput';
import AuthFooter from '@/components/Form/AuthFooter';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView } from '@/components/Themed';
import AuthHeader from '@/components/Form/AuthHeader';
import CustomButton from '@/components/CustomButton';

const { width, height } = Dimensions.get('window');
export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const { theme } = useTheme();

  const handleSubmission = () => {
    console.log('Email:', email);
  };

  return (
    <ThemedSafeAreaView className='flex-1 flex px-3 w-full justify-center h-full items-center'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f3f4f6' : '#070B11'}
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
          title=' Reset Password'
          description='Enter your email to reset your password.'
        />
        {/* Email Input */}
        <CustomTextInput
          title=''
          onChangeText={(text) => setEmail(text)}
          placeholder='Enter Email'
          keyboardType='email-address'
        />

        <CustomButton
          title='Send Code '
          customStyles='bg-blue-600 '
          handleOpenPress={handleSubmission}
          textStyles='text-white text-lg font-bold'
        />

        {/* Signup Option */}
        <AuthFooter
          title={`Remember password? `}
          handleOnPress={() => router.push('/(auth)/login')}
          buttonText='Signin'
        />
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
