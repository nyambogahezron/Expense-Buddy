import { View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ThemedSafeAreaView } from '@/components/Themed';
import { CustomButton } from '@/components';
import CustomPasswordInput from '@/components/Form/CustomPasswordInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/Loading';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function LockScreen() {
  const { lockPin } = useGlobalContext();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [oldPin, setOldPin] = useState('');

  const HandleSubmit = async () => {
    if (!password || !confirmPassword)
      return Alert.alert('Please Enter All Fields');
    if (password !== confirmPassword)
      return Alert.alert('Password Entered Do not Match!');
    if (password.length !== 6)
      return Alert.alert('Password Should Be of length 6!');
    if (lockPin && oldPin) {
      if (oldPin !== lockPin.toString()) {
        return Alert.alert('Invalid Pin, Please try again');
      }
    }
    setIsLoading(true);

    try {
      await AsyncStorage.setItem('lockPassword', password);
      Alert.alert('Password Saved Successfully');
      setConfirmPassword('');
      setPassword('');
      setOldPin('');
      router.back();
    } catch (e) {
      setIsLoading(false);

      console.log(e);
      Alert.alert('Unable to save password, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedSafeAreaView className='flex flex-1 h-full items-center justify-center w-full'>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className='flex-1 mb-5 px-2'
      >
        {isLoading ? (
          <Loading />
        ) : (
          <View className='flex flex-col px-3 mt-20'>
            {lockPin ? (
              <>
                <CustomPasswordInput
                  title='Enter Old Pin'
                  onChangeText={setOldPin}
                  value={oldPin}
                  isForConfirmation={true}
                  keyboardType='numeric'
                />
                <CustomPasswordInput
                  title='New Pin'
                  onChangeText={setPassword}
                  value={password}
                  handleOnPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  passwordVisible={isPasswordVisible}
                  keyboardType='numeric'
                />
                <CustomPasswordInput
                  title='Confirm New Pin'
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  keyboardType='numeric'
                  isForConfirmation={true}
                />

                <CustomButton
                  isLoading={isLoading}
                  title={isLoading ? 'Loading...' : 'Edit Pin'}
                  customStyles='bg-orange-600'
                  textStyles='text-white text-lg font-bold'
                  handleOpenPress={() => HandleSubmit()}
                />
              </>
            ) : (
              <>
                <CustomPasswordInput
                  title='Enter Pin'
                  onChangeText={setPassword}
                  value={password}
                  handleOnPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  passwordVisible={isPasswordVisible}
                  keyboardType='numeric'
                />
                <CustomPasswordInput
                  title='Confirm Pin'
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  isForConfirmation={true}
                  keyboardType='numeric'
                />

                <CustomButton
                  isLoading={isLoading}
                  title={isLoading ? 'Loading...' : 'Set Pin'}
                  customStyles='bg-orange-600'
                  textStyles='text-white text-lg font-bold'
                  handleOpenPress={() => HandleSubmit()}
                />
              </>
            )}
          </View>
        )}
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
