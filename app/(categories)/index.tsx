import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import TransactionCategories from '@/data/TransactionsTypes';
import CategoryCard from '@/components/CategoryCard';
import { useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { CustomButton } from '@/components';
import CategoryActionCard from '@/components/CategoryActionCard';
import { useTheme } from '@/context/ThemeProvider';
import BackButton from '@/components/BackButton';
import HeaderRightIconCard from '@/components/HeaderRightIconCard';

const Statistics = () => {
  const snapPoints = useMemo(() => ['30%', '35%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView
      className='flex-1'
      style={{
        backgroundColor: theme === 'light' ? '#f3f4f6' : '#070B11',
      }}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : '#070B11'}
      />
      <Stack.Screen
        options={{
          title: 'Categories',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          },
          headerLeft: () => <BackButton />,
          headerTitleStyle: {
            color: theme === 'light' ? '#333' : '#fff',

            fontSize: 20,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <HeaderRightIconCard
              handleOnPress={() => router.push('/(categories)/create')}
            >
              <FontAwesome5
                name='plus'
                size={18}
                color={theme === 'light' ? 'black' : '#fff'}
              />
            </HeaderRightIconCard>
          ),
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className='mb-8'
      >
        <View className='px-3'>
          {/* Expense Detail */}
          <View className='my-3'>
            <Text className='ml-2 text-lg text-black font-bold'>
              Categories
            </Text>
          </View>
          {TransactionCategories.map((item) => {
            const { id, name, icon } = item;
            return (
              <CategoryCard
                key={id}
                handleOnPress={() =>
                  router.push({
                    pathname: '/(categories)/details',
                    params: { item: JSON.stringify(item) },
                  })
                }
                handleOpenPress={handleOpenPress}
                id={id}
                name={name}
                icon={icon}
              />
            );
          })}
        </View>
      </ScrollView>
      <View>
        <BottomSheet
          index={-1}
          snapPoints={snapPoints}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          handleIndicatorStyle={{ backgroundColor: '#fff' }}
          backgroundStyle={{ backgroundColor: '#1B1F24', alignItems: 'center' }}
        >
          <View className='relative z-[99991] px-4 items-center w-full h-full justify-center'>
            <View className='-mt-4'>
              <CustomButton
                title='Edit'
                handleOpenPress={() => console.log('edit')}
                customStyles='bg-white mt-1'
                textStyles='text-black font-bold'
              />
              <CustomButton
                title='Delete'
                handleOpenPress={() => console.log('delete')}
                customStyles='bg-[#0079FB] mt-4'
                textStyles='text-white font-bold'
              />
            </View>
          </View>
        </BottomSheet>
      </View>
      {/* actions BottomSheet */}
      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: '#fff' }}
        backgroundStyle={{
          backgroundColor: '#1B1F24',
          alignItems: 'center',
          borderRadius: 0,
        }}
      >
        <View>
          <CategoryActionCard handleClosePress={handleClosePress} />
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Statistics;
