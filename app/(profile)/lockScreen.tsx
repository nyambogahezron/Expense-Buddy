import { View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedSafeAreaView } from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import { CustomButton } from '@/components';
import BackButton from '@/components/BackButton';
import CustomPasswordInput from '@/components/CustomPasswordInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/Loading';

export default function LockScreen() {
  const { theme } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const HandleSubmit = async () => {
    if (!password || !confirmPassword)
      return Alert.alert('Please Enter All Fields');
    if (password !== confirmPassword)
      return Alert.alert('Password Entered Do not Match!');
    if (password.length !== 6)
      return Alert.alert('Password Should Be of length 6!');

    setIsLoading(true);

    try {
      await AsyncStorage.setItem('lockPassword', password);
      Alert.alert('Password Saved Successfully');
      setConfirmPassword('');
      setPassword('');
    } catch (e) {
      setIsLoading(false);

      console.log(e);
      Alert.alert('Unable to save password, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedSafeAreaView className='flex flex-1  h-full items-center justify-center w-full'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />

      <Stack.Screen
        options={{
          title: 'Set Lock Screen',
          headerShown: true,
          headerTitleAlign: 'center',
          statusBarStyle: 'light',
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className='flex-1 mb-5 px-2'
      >
        {isLoading ? (
          <Loading />
        ) : (
          <View className='flex flex-col px-3 mt-20'>
            <CustomPasswordInput
              title='Enter Password'
              onChangeText={setPassword}
              value={password}
              handleOnPress={() => setIsPasswordVisible(!isPasswordVisible)}
              passwordVisible={isPasswordVisible}
              keyboardType='numeric'
            />
            <CustomPasswordInput
              title='Confirm Password'
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              isForConfirmation={true}
              keyboardType='numeric'
            />

            <CustomButton
              isLoading={isLoading}
              title={isLoading ? 'Loading...' : 'Set Password'}
              customStyles='bg-orange-600'
              textStyles='text-white text-lg font-bold'
              handleOpenPress={() => HandleSubmit()}
            />
          </View>
        )}
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
