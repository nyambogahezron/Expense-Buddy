import { View, ScrollView, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import CustomPasswordInput from '@/components/Form/CustomPasswordInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/ui/Loading';
import { useGlobalContext } from '@/context/GlobalProvider';
import CustomButton from './CustomButton';
import Button from './ui/Button';

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
    <ThemedSafeAreaView style={styles.safeAreaView}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <View style={styles.container}>
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

                <Button
                  isLoading={isLoading}
                  title={isLoading ? 'Loading...' : 'Edit Pin'}
                  customStyles={styles.button}
                  textStyles={styles.buttonText}
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

                <Button
                  isLoading={isLoading}
                  title={isLoading ? 'Loading...' : 'Set Pin'}
                  customStyles={styles.button}
                  textStyles={styles.buttonText}
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

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    marginBottom: 5,
    paddingHorizontal: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 3,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
