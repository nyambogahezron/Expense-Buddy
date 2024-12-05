import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import { useEffect } from 'react';
import CustomHeader from '@/components/CustomHeader';
import BackButton from '@/components/navigation/BackButton';
import HeaderRightIconCard from '@/components/navigation/HeaderRightIconCard';
import TabBar from '@/components/navigation/TabBar';

export default function TabLayout() {
  const { theme } = useTheme();
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
              backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
            },
            header: () => <CustomHeader />,
          }}
        />
        <Tabs.Screen
          name='explore'
          options={{
            title: 'Explore',
            headerShown: true,
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
            },
            header: () => <CustomHeader isForExplore={true} />,
          }}
        />
        <Tabs.Screen
          name='transactions'
          options={{
            title: 'Transactions',
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
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: 'Add Transaction',
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
          }}
        />
        <Tabs.Screen
          name='reports'
          options={{
            title: 'Reports',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme === 'light' ? '#fff' : '#070B11',
            },
            headerLeft: () => <BackButton />,
            headerTitleStyle: {
              color: theme === 'light' ? '#333' : '#fff',
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
                  color={theme === 'light' ? 'black' : '#fff'}
                />
              </HeaderRightIconCard>
            ),
          }}
        />
        <Tabs.Screen
          name='categories'
          options={{
            title: 'Categories',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme === 'light' ? '#fff' : '#070B11',
            },
            headerLeft: () => <BackButton />,
            headerTitleStyle: {
              color: theme === 'light' ? '#333' : '#fff',
              fontSize: 20,
              fontWeight: 'bold',
            },
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
