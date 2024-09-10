import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');

  const handleSubmission = () => {
    console.log('Email:', email);
  };

  return (
    <SafeAreaView className='flex-1 flex bg-[#070B11] px-5 w-full justify-center h-full items-center'>
      <StatusBar style='light' backgroundColor='transparent' />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={{ width: width * 0.93, height: height }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        className='my-20'
      >
        {/* Logo and Title */}
        <View className='items-center mb-12'>
          <Ionicons name='shield-outline' size={50} color='#1E3A8A' />
          <Text className='text-xl font-bold text-white mt-4'>Reset Password</Text>
          <Text className='text-white mt-2 text-lg'>
            Enter your email to reset your password.
          </Text>
        </View>

        {/* Email Input */}
        <View className='mb-6'>
          <Text className='text-white mb-2 font-bold ml-1'>Email</Text>
          <TextInput
            placeholder='hi@gmail.com'
            className='bg-gray-300 p-4 rounded-lg text-black font-bold'
            keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSubmission}
          className='bg-blue-600 p-4 rounded-full items-center'
        >
          <Text className='text-white text-lg font-bold'>Send Code</Text>
        </TouchableOpacity>

        {/* Signup Option */}
        <View className='flex-row justify-center mt-8 mb-3'>
          <Text className='text-gray-500'>Remember password? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className='text-blue-600 font-bold'>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
