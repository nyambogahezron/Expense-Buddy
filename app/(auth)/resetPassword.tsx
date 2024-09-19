import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView } from '@/components/Themed';
import AuthHeader from '@/components/AuthHeader';
import { CustomButton } from '@/components';
import CustomPasswordInput from '@/components/CustomPasswordInput';

const { width, height } = Dimensions.get('window');

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { theme } = useTheme();

  const handleSubmission = () => {
    console.log('pass:', password);
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
          title=' Reset Password'
          description='Change your password.'
        />
        {/* Email Input */}
        <CustomPasswordInput
          title='Password'
          onChangeText={(text) => setPassword(text)}
          placeholder='Enter Password'
          passwordVisible={passwordVisible}
          handleOnPress={() => setPasswordVisible(!passwordVisible)}
        />
        <CustomPasswordInput
          title='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder='Confirm Password'
          isForConfirmation={true}
        />

        <CustomButton
          title='Reset Password'
          customStyles='bg-blue-600 '
          handleOpenPress={handleSubmission}
          textStyles='text-white text-lg font-bold'
        />
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
