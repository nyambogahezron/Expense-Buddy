import { View, Text, Button, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';

export default function LandingPage() {
  return (
    <SafeAreaView className='bg-red-400 h-full'>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className='w-full min-h-[80vh] flex justify-center items-center  px-4'>
          <Text>Welcome</Text>
          <Button
            onPress={() => router.push('/(tabs)/')}
            title='Get Started'
            color='#841584'
          />
        </View>
      </ScrollView>
      {/* top bar mobile status bar */}
      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
}
