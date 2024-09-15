import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, { useMemo, useRef } from 'react';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function AccountInfo() {
  const [email, setEmail] = React.useState('johndoe@gmail.com');
  const [name, setName] = React.useState('John Doe');
  const snapPoints = useMemo(() => ['20%', '25%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  // form submission handler
  const HandleSubmit = (e: GestureResponderEvent): void => {
    e.preventDefault();
    console.log(email, name);
  };

  return (
    <SafeAreaView className='bg-gray-100 flex flex-1 px-2'>
      <StatusBar backgroundColor='#ffffff' style='dark' />
      <GestureHandlerRootView>
        <Stack.Screen
          options={{
            title: 'Account Info',
            headerShown: true,
            headerTitleAlign: 'center',
            statusBarStyle: 'light',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2 '
              >
                <View className='bg-gray-200 ml-2 p-2 rounded-lg'>
                  <Feather name='arrow-left' size={22} />
                </View>
              </TouchableOpacity>
            ),
            headerTitleStyle: {
              color: '#333',
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push('/(profile)/settings')}
                className='bg-white bg-opacity-50 rounded-lg p-1 py-2'
              >
                <View className='bg-gray-200 mr-2 p-2 rounded-lg'>
                  <Ionicons name='settings-outline' size={22} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className='mb-5'
        >
          {/* Header and Profile Info */}
          <View className='flex items-center mb-8 mt-2'>
            <View className='relative bg-white w-28 h-28 flex items-center justify-center rounded-full'>
              <Image
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1621376104241004549/c-_rHzLH_400x400.jpg',
                }}
                className='w-24 h-24 rounded-full'
              />
              <TouchableWithoutFeedback onPress={handleOpenPress}>
                <View className='absolute right-0 bottom-0 bg-white rounded-full p-2'>
                  <FontAwesome name='edit' size={20} color='orange' />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Text className='text-lg font-bold mt-4'>John Doe</Text>
            <Text className='text-gray-600'></Text>
          </View>
          {/* account info  */}
          <View className='flex flex-col items-center'>
            {/* email */}
            <View className='mb-1 ' style={{ width: width * 0.92 }}>
              <Text className='text-gray-600 mb-2 ml-2 font-pbold'>Email</Text>
              <TextInput
                placeholder='hi@uigodesign.com'
                className='bg-white p-4 rounded-lg text-gray-800'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View className='flex flex-row items-center justify-between mt-2 mb-3'>
              {/* name */}
              <View className='mb-6 relative' style={{ width: width * 0.92 }}>
                <Text className='text-gray-600 mb-2 ml-2 font-pbold'>Name</Text>
                <TextInput
                  placeholder='name'
                  className='bg-white p-4 rounded-lg text-gray-800'
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={HandleSubmit}
              style={{ width: width * 0.9 }}
              className='flex items-center justify-center bg-orange-600 p-4 rounded-full '
            >
              <View className='flex flex-row items-center gap-1'>
                <Text className='text-white text-lg font-bold capitalize'>
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* bottom sheet to upload profile picture */}
        <BottomSheet
          index={-1}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: '#fff' }}
          backgroundStyle={{ backgroundColor: '#1B1F24' }}
        >
          <View className='relative p-4 items-center w-full'>
            {/* body  */}
            <View className='mt-2'>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => router.push('/(tabs)/')}
                style={{ width: width * 0.9 }}
                className='flex items-center justify-center bg-orange-600 p-4 rounded-full mt-4'
              >
                <View className='flex flex-row items-center gap-1'>
                  <Text className='text-white text-[16px] font-bold capitalize'>
                    Upload Picture
                  </Text>
                  <Feather name='upload' size={20} color='#fff' />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
