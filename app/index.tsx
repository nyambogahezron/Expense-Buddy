import { View, Text, Dimensions } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from '@/components/CustomButton';
const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const snapPoints = useMemo(() => ['30%', '35%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView className='flex-1 justify-center items-center bg-gray-900'>
      <LinearGradient
        className='absolute top-[-40px] right-[-60px] h-[260px] w-[260px] rounded-full'
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
          className='relative  ml-2 shadow-lg mb-10 mt-[60px] rotate-[-4deg] rounded-2xl bg-[#070B11] opacity-80'
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
      <View className='flex items-center mb-10 '>
        <Text className='text-white text-center px-6 mb-1 mt-2 text-[17px] tracking-widest font-psemibold'>
          The right app to make it easy to manage your expenses on the go.
        </Text>
        <Text className='text-white italic font-bold text-[17px]'>
          Personal Capital Expensify
        </Text>
      </View>

      <CustomButton
        title='Get Started'
        handleOpenPress={() => bottomSheetRef.current?.expand()}
        customStyles='bg-orange-600 mt-10'
        textStyles='text-white'
      />
      {/* BottomSheet for login/register buttons */}

      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        backgroundStyle={{ backgroundColor: '#1B1F24', alignItems: 'center' }}
      >
        <View className='relative z-[99991] px-4 items-center w-full h-full justify-center'>
          {/* body  */}
          <View className='-mt-4'>
            <CustomButton
              title='Login'
              handleOpenPress={() => router.push('/(auth)/login')}
              customStyles='bg-white mt-1'
              textStyles='text-black font-bold'
            />
            <CustomButton
              title='Register'
              handleOpenPress={() => router.push('/(tabs)/')}
              customStyles='bg-[#0079FB] mt-4'
              textStyles='text-white font-bold'
            />
          </View>
        </View>
      </BottomSheet>

      {/* top bar mobile status bar */}
      <StatusBar style='light' backgroundColor='transparent' />
    </GestureHandlerRootView>
  );
}
