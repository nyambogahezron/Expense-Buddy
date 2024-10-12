import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView } from '@/components/Themed';
import CustomTextInput from '@/components/CustomTextInput';
import CustomPasswordInput from '@/components/CustomPasswordInput';
import AuthFooter from '@/components/AuthFooter';
import AuthHeader from '@/components/AuthHeader';
import { CustomButton } from '@/components';
import { supabase } from '@/utils/supabase';
import { useToast } from 'react-native-toast-notifications';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const toast = useToast();

  async function signInWithUser() {
    if (!email || !password)
      return toast.show('Input all fields', { type: 'danger' });

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <ThemedSafeAreaView className='flex-1 px-3 w-full justify-center'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f3f4f6' : '#070B11'}
      />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className='mt-14'
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
          isLoading={loading}
          title={loading ? 'Loading...' : 'Login'}
          customStyles='bg-blue-600 '
          handleOpenPress={signInWithUser}
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
