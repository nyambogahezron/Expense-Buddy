import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import CustomTextInput from '@/components/Form/CustomTextInput';
import CustomPasswordInput from '@/components/Form/CustomPasswordInput';
import AuthFooter from '@/components/Form/AuthFooter';
import AuthHeader from '@/components/Form/AuthHeader';
import Button from '@/components/ui/Button';
import { supabase } from '@/utils/supabase';
import { useToast } from 'react-native-toast-notifications';
import defaultCategories from '@/data/defaultCategories';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const toast = useToast();

  const defaultCategoriesData = defaultCategories;

  async function signUpWithUser() {
    if (!email || !password || !username || !confirmPassword)
      return toast.show('Input all fields', { type: 'danger' });

    if (password !== confirmPassword)
      return toast.show('Passwords do not match', { type: 'danger' });

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: username,
          email: email,
        },
      },
    });
    if (session) {
      // insert default categories
      const { error } = await supabase
        .from('categories')
        .insert([defaultCategoriesData]);
      if (error) {
        console.log('Error inserting default:', error);
      }
    }
    if (error) Alert.alert('Something went wrong, please try again!');

    setLoading(false);
  }

  return (
    <ThemedSafeAreaView style={styles.container}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f3f4f6' : '#070B11'}
      />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Logo and Title */}
        <AuthHeader
          title='Register'
          description='Create Account To Get Started '
        />
        <CustomTextInput
          title='Username'
          onChangeText={(text) => setUsername(text)}
          placeholder='Enter Username'
        />
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
        <CustomPasswordInput
          title='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          passwordVisible={passwordVisible}
          handleOnPress={() => setPasswordVisible(!passwordVisible)}
          isForConfirmation={true}
        />

        <Button
          isLoading={loading}
          title={loading ? 'Loading...' : 'Register'}
          customStyles={styles.registerButton}
          handleOpenPress={signUpWithUser}
          textStyles={styles.registerButtonText}
        />

        {/* SignUp Option */}
        <AuthFooter
          title={`Already Have An Account ?`}
          handleOnPress={() => router.push('/(auth)/login')}
          buttonText='Signin'
        />
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    width: '100%',
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: '#1D4ED8',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
