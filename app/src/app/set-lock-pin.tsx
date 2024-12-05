import { View, Text, Dimensions, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toaster } from '@/lib/Toaster';
import { useTheme } from '@/context/ThemeProvider';
import { router } from 'expo-router';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import Button from '@/components/ui/Button';

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
      style={styles.container}
    >
      <View style={styles.header}>
        <ThemedText className='text-xl font-pbold'>Set Lock Pin</ThemedText>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Enter Pin'
          secureTextEntry={true}
          numberOfLines={1}
          maxLength={6}
          keyboardType='numeric'
          placeholderTextColor={theme === 'dark' ? '#fff' : '#000'}
          style={[
            styles.textInput,
            {
              color: theme === 'dark' ? '#fff' : '#000',
              borderColor: theme === 'dark' ? '#fff' : '#FFA500',
            },
          ]}
          onChangeText={(text) => setPin(text)}
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

      <View style={styles.buttonContainer}>
        <Button
          isLoading={isLoading}
          title={isLoading ? 'Setting Pin...' : 'Set Lock Pin'}
          handleOpenPress={() => handleSetPin()}
          customStyles={styles.button}
          textStyles={styles.buttonText}
        />
      </View>
    </ThemedView>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      position: 'relative',
    },
    header: {
      width: width - 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    inputContainer: {
      width: width - 50,
    },
    textInput: {
      borderBottomWidth: 1,
      borderRadius: 8,
      height: 40,
      textAlign: 'center',
      width: '100%',
      marginTop: 10,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
    },
    button: {
      backgroundColor: '#FFA500',
      borderColor: '#fff',
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
    },
  });
