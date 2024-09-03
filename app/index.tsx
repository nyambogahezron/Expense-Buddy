import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';
const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const snapPoints = useMemo(() => ['30%', '35%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

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
      <Text className='text-gray-400 text-center px-10 mb-10 mt-2 text-[17px] tracking-wider font-psemibold'>
        The right app to make it easy to manage your expenses on the go.
        Personal Capital - Expensify
      </Text>

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleOpenPress}
        style={{ width: width * 0.9 }}
        className='flex items-center justify-center bg-white p-4 rounded-full mt-10'
      >
        <Text className='text-black text-lg font-bold capitalize'>
          Get Started
        </Text>
      </TouchableOpacity>
      {/* BottomSheet for login/register buttons */}

      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        backgroundStyle={{ backgroundColor: '#1B1F24' }}
      >
        <View className='relative z-[99991] p-4 items-center w-full'>
          {/* close btn  */}
          <View className='absolute top-0 right-0 mr-5 -mt-2'>
            <TouchableWithoutFeedback onPress={handleClosePress}>
              <Feather name='x' size={28} color='#de2c2c' />
            </TouchableWithoutFeedback>
          </View>
          {/* body  */}
          <View className='mt-8'>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/')}
              style={{ width: width * 0.9 }}
              className='flex items-center justify-center bg-white p-4 rounded-full mt-4'
            >
              <Text className='text-black text-lg font-bold capitalize'>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/')}
              style={{ width: width * 0.9 }}
              className='flex items-center justify-center bg-[#0079FB] p-4 rounded-full mt-4'
            >
              <Text className='text-white text-lg font-bold capitalize'>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      {/* top bar mobile status bar */}
      <StatusBar
        style='light'
        backgroundColor='transparent'
      />
    </GestureHandlerRootView>
  );
}
