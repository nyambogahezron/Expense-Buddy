import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleSubmission = () => {
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password', password);
  };

  return (
    <SafeAreaView className='flex-1 bg-[#fff] px-5 w-full justify-center'>
      <StatusBar style='dark' backgroundColor='transparent' />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Logo and Title */}
        <View className='items-center mb-12'>
          <Ionicons name='shield-outline' size={50} color='#1E3A8A' />
          <Text className='text-xl font-pbold text-black mt-4'>Login</Text>
          <Text className='text-sm text-black mt-2 font-pbold'>
            Login now to get started.
          </Text>
        </View>

        {/* username Input */}
        <View className='mb-3'>
          <Text className='text-black ml-1 mb-2 font-bold'>Username</Text>
          <TextInput
            placeholder='John Doe'
            className='bg-gray-200 p-4 rounded-lg text-black font-bold'
            keyboardType='email-address'
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        {/* Email Input */}
        <View className='mb-3'>
          <Text className='text-black ml-1 mb-2 font-bold'>Email</Text>
          <TextInput
            placeholder='hi@gmail.com'
            className='bg-gray-200 p-4 rounded-lg text-black font-bold'
            keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password Input */}
        <View className='mb-3 relative'>
          <Text className='text-black ml-1 mb-2 font-bold'>Password</Text>
          <TextInput
            placeholder='Password'
            className='bg-gray-200 p-4 rounded-lg text-black font-bold'
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            className='absolute right-3 top-10'
          >
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color='gray'
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push('/(auth)/forgotPassword')}
          className='mb-8'
        >
          <Text className='text-blue-600 text-right'>Forget password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSubmission}
          className='bg-orange-600 p-4 rounded-full items-center'
        >
          <Text className='text-white text-lg font-bold'>Login</Text>
        </TouchableOpacity>

        {/* Signup Option */}
        <View className='flex-row justify-center mt-8 mb-3'>
          <Text className='text-gray-500'>Don’t have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text className='text-blue-600 font-bold'>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
