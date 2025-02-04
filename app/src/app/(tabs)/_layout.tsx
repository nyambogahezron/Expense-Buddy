import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import { useEffect } from 'react';
import CustomHeader from '@/components/CustomHeader';
import BackButton from '@/components/navigation/BackButton';
import HeaderRightIconCard from '@/components/navigation/HeaderRightIconCard';
import TabBar from '@/components/navigation/TabBar';
import useColorScheme from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const { session, loading } = useGlobalContext();

  useEffect(() => {
    if (!session && !loading) return router.replace('/');
  }, [session]);

  return (
    <View style={{ flex: 1 }}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
            headerShown: true,
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: Colors[useColorScheme('header')].header,
            },
            header: () => <CustomHeader />,
          }}
        />
        <Tabs.Screen name='transactions' />

        <Tabs.Screen
          name='create'
          options={{
            title: 'Add Transaction',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors[useColorScheme('header')].header,
            },
            headerLeft: () => <BackButton />,
            headerTitleStyle: {
              color: Colors[useColorScheme('customIcon')].customIcon,
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
        />
        <Tabs.Screen
          name='reports'
          options={{
            title: 'Reports',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: Colors[useColorScheme('header')].header,
            },
            headerLeft: () => <BackButton />,
            headerTitleStyle: {
              color: Colors[useColorScheme('customIcon')].customIcon,
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerRight: () => (
              <HeaderRightIconCard
                handleOnPress={() => router.push('/(profile)/settings')}
              >
                <Ionicons
                  name='settings-outline'
                  size={22}
                  color={Colors[useColorScheme('customIcon')].customIcon}
                />
              </HeaderRightIconCard>
            ),
          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
          }}
        />
      </Tabs>
    </View>
  );
}
