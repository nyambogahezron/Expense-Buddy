import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const { session } = useGlobalContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session && isMounted) {
      router.replace('/(tabs)/');
    }
  }, []);

  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-[#070B11]'>
      <View className='flex-1'>
        <LinearGradient
          className='absolute top-[-50px] right-[-60px] h-[260px] w-[260px] rounded-full'
          colors={['#EE401B', '#F1621B', '#F38D1B']}
          start={[0, 0.2]}
          end={[0.9, 0.5]}
        />

        {/* card  */}
        <View>
          <View
            style={{
              width: width * 0.9,
              height: height * 0.25,
            }}
            className='relative  ml-2 shadow-lg mb-12 mt-[60px] rotate-[-4deg] rounded-2xl bg-[#070B11] opacity-80'
          >
            <View className='flex justify-center p-4 mx-4'>
              <View className='flex flex-row mt-2'>
                <View className='w-12 h-12 rounded-full bg-[#EE401B] opacity-70'></View>
                <View className='w-12 h-12 rounded-full bg-[#F38D1B] opacity-70 right-6'></View>
              </View>
              <Text className='text-white text-2xl font-bold mt-4'>
                My Wallet
              </Text>
              <View className='flex flex-row justify-around mt-8 items-center'>
                <Text className='p-1 text-white text-2xl'>***</Text>
                <Text className=' p-1  text-white text-2xl'>***</Text>
                <Text className=' p-1  text-white text-2xl'>***</Text>
                <Text className=' p-1  text-white text-2xl'>1234</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Title */}
        <View className='flex flex-row gap-3 items-center justify-center'>
          <View className='flex items-center justify-center  h-24 top-[-20px]'>
            <Text className='font-bold text-white text-5xl italic mr-2 bg-orange-500 p-1 rounded-lg'>
              Your
            </Text>
          </View>
          <View>
            <Text className='text-white text-4xl font-bold mb-2'>EXPENSE</Text>
            <Text className='text-white text-4xl font-bold mb-10'>BUDDY</Text>
          </View>
        </View>

        {/* Description */}
        <View className='flex items-center mb-1 '>
          <Text className='text-white text-center px-6 mb-1 mt-2 text-[16px] tracking-widest font-pbold '>
            The right app to make it easy to manage your expenses on the go.
          </Text>
          <Text className='text-white font-pbold text-[16px]'>
            Personal Capital Expensify
          </Text>
        </View>

        <View className=' absolute px-4 items-center w-full bottom-10'>
          <CustomButton
            title='Login'
            handleOpenPress={() => router.push('/(auth)/login')}
            customStyles='bg-transparent border-2 border-white mt-1'
            textStyles='text-white font-bold'
          />
          <CustomButton
            title='Register'
            handleOpenPress={() => router.push('/(auth)/register')}
            customStyles='bg-[#0079FB] mt-4'
            textStyles='text-white font-bold'
          />
        </View>
      </View>

      {/* top bar mobile status bar */}
      <StatusBar style='light' backgroundColor='transparent' />
    </SafeAreaView>
  );
}
