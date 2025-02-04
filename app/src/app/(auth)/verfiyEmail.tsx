import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/Form/CustomTextInput';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView';
import AuthHeader from '@/components/Form/AuthHeader';
import Button from '@/components/ui/Button';

const { width, height } = Dimensions.get('window');
export default function VerifyEmail() {
  const [code, setCode] = useState<string>('');
  const { theme } = useTheme();

  const handleSubmission = () => {
    console.log('Code:', code);
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#f3f4f6' : '#070B11'}
      />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Logo and Title */}
        <AuthHeader
          title=' Email Verification'
          description='Enter your code to verify your email.'
        />

        <CustomTextInput
          title=''
          onChangeText={(text) => setCode(text)}
          placeholder='Enter Code'
          keyboardType='numeric'
        />

        <Button
          title='Verify '
          customStyles={styles.button}
          handleOpenPress={handleSubmission}
          textStyles={styles.buttonText}
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
    height: '100%',
    alignItems: 'center',
  },
  scrollView: {
    width: width * 0.93,
    height: height,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
