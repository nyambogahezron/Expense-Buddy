import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView } from '@/components/Themed';
import CustomTextInput from '@/components/CustomTextInput';
import CustomPasswordInput from '@/components/CustomPasswordInput';
import AuthFooter from '@/components/AuthFooter';
import AuthHeader from '@/components/AuthHeader';
import { CustomButton } from '@/components';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const { theme } = useTheme();

  const handleSubmission = () => {
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password', password);
  };

  return (
    <ThemedSafeAreaView className='flex-1 px-3 w-full justify-center'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Logo and Title */}
        <AuthHeader title='Login' description='Welcome Back, Login Now' />
        <CustomTextInput
          title='Email'
          onChangeText={(text) => setEmail(text)}
          placeholder='Enter Email'
          keyboardType='email-address'
        />

        <CustomPasswordInput
          title='Password'
          onChangeText={(text) => setPassword(text)}
          placeholder='Enter Password'
          passwordVisible={passwordVisible}
          handleOnPress={() => setPasswordVisible(!passwordVisible)}
        />

        {/* Forgot Password */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(auth)/forgotPassword')}
          className='mb-8'
        >
          <Text className='text-blue-600 text-right'>Forget password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <CustomButton
          title='Login'
          customStyles='bg-blue-600 '
          handleOpenPress={handleSubmission}
          textStyles='text-white text-lg font-bold'
        />
        {/* Signup Option */}
        <AuthFooter
          title={`Don't Have An Account ?`}
          handleOnPress={() => router.push('/(auth)/register')}
          buttonText='Signup'
        />
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
