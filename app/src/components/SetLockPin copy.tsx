import { View,  Dimensions, TextInput } from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toaster } from '@/lib/Toaster';
import { ThemedText, ThemedView } from './Themed';
import { useTheme } from '@/context/ThemeProvider';
import { router } from 'expo-router';

const width = Dimensions.get('window').width;

export default function SetLockPin() {
  const [Pin, setPin] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { theme } = useTheme();

  const handleSetPin = async () => {
    setIsLoading(true);

    if (Pin.length !== 6) {
      setIsLoading(false);
      return Toaster('Pin must be 6 characters long');
    }

    try {
      await AsyncStorage.setItem('lockPassword', Pin);
      Toaster('Pin set successfully');
      setPin('');
      router.navigate('/(tabs)');
    } catch (e) {
      setIsLoading(false);
      Toaster('Unable to set pin, please try again');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ThemedView
      darkColor='#070B11'
      lightColor='#fff'
      className='flex-1 relative items-center'
    >
      <View
        style={{
          width: width - 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <ThemedText className='text-xl font-pbold'>Set Lock Pin</ThemedText>
      </View>
      <View
        style={{
          width: width - 50,
        }}
      >
        <TextInput
          placeholder='Enter Pin'
          secureTextEntry={true}
          numberOfLines={1}
          maxLength={6}
          keyboardType='numeric'
          placeholderTextColor={theme === 'dark' ? '#fff' : '#000'}
          className='border-b border-orange-500 rounded-lg h-10  text-center w-full mt-10'
          onChangeText={(text) => setPin(text)}
          style={{
            color: theme === 'dark' ? '#fff' : '#000',
            borderColor: theme === 'dark' ? '#fff' : '#FFA500',
          }}
          onFocus={(e) =>
            e.target.setNativeProps({
              style: { borderColor: theme === 'dark' ? '#fff' : '#000' },
            })
          }
          onBlur={(e) =>
            e.target.setNativeProps({ style: { borderColor: '#FFA500' } })
          }
        />
      </View>

      <View className='absolute bottom-10'>
        <CustomButton
          isLoading={isLoading}
          title={isLoading ? 'Setting Pin...' : 'Set Lock Pin'}
          handleOpenPress={() => handleSetPin()}
          customStyles='bg-orange-500 border border-white rounded-lg'
          textStyles='text-white'
        />
      </View>
    </ThemedView>
  );
}
