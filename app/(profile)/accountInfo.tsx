import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, { useMemo, useRef } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ThemedSafeAreaView } from '@/components/Themed';
import { useTheme } from '@/context/ThemeProvider';
import { CustomButton } from '@/components';
import CustomTextInput from '@/components/CustomTextInput';
import BackButton from '@/components/BackButton';

const { width } = Dimensions.get('window');

export default function AccountInfo() {
  const [email, setEmail] = React.useState('johndoe@gmail.com');
  const [name, setName] = React.useState('John Doe');
  const snapPoints = useMemo(() => ['20%', '25%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const { theme } = useTheme();

  // form submission handler
  const HandleSubmit = () => {
    console.log(email, name);
  };

  return (
    <ThemedSafeAreaView className='flex flex-1'>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <GestureHandlerRootView>
        <Stack.Screen
          options={{
            title: 'Account Info',
            headerShown: true,
            headerTitleAlign: 'center',
            statusBarStyle: 'light',
            headerStyle: {
              backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
            },
            headerLeft: () => <BackButton />,
            headerTitleStyle: {
              color: theme === 'light' ? '#333' : '#fff',
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          className='mb-5 px-2'
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
          <View className='flex flex-col px-3'>
            <CustomTextInput
              title='Email'
              onChangeText={(text) => setEmail(text)}
              keyboardType='email-address'
              value={email}
            />
            <CustomTextInput
              title='Name'
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <CustomButton
              title='Edit'
              customStyles='bg-orange-600'
              textStyles='text-white text-lg font-bold'
              handleOpenPress={() => HandleSubmit()}
            />
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
    </ThemedSafeAreaView>
  );
}
