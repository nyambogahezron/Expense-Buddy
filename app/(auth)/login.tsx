// screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View className='flex-1 bg-white p-8 justify-center'>
      {/* Logo and Title */}
      <View className='items-center mb-12'>
        <Ionicons name='shield-outline' size={50} color='#1E3A8A' />
        <Text className='text-xl font-bold text-gray-800 mt-4'>Vite VPN</Text>
        <Text className='text-sm text-gray-500 mt-2'>
          Login now to access faster internet more than 120+ locations.
        </Text>
      </View>

      {/* Email Input */}
      <View className='mb-6'>
        <Text className='text-gray-500 mb-2'>Email</Text>
        <TextInput
          placeholder='hi@uigodesign.com'
          className='bg-gray-100 p-4 rounded-lg text-gray-800'
          keyboardType='email-address'
        />
      </View>

      {/* Password Input */}
      <View className='mb-6 relative'>
        <Text className='text-gray-500 mb-2'>Password</Text>
        <TextInput
          placeholder='Password'
          className='bg-gray-100 p-4 rounded-lg text-gray-800'
          secureTextEntry={!passwordVisible}
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
      <TouchableOpacity className='mb-12'>
        <Text className='text-blue-600 text-right'>Forget password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity className='bg-blue-600 p-4 rounded-full items-center'>
        <Text className='text-white text-lg font-bold'>Login</Text>
      </TouchableOpacity>

      {/* Signup Option */}
      <View className='flex-row justify-center mt-8'>
        <Text className='text-gray-500'>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text className='text-blue-600 font-bold'>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
