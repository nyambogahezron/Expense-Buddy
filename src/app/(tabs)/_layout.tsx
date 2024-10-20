import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { BlurView } from 'expo-blur';
import CustomHeader from '@/components/CustomHeader';
import BackButton from '@/components/navigation/BackButton';
import HeaderRightIconCard from '@/components/navigation/HeaderRightIconCard';

export default function TabLayout() {
  const [isMounted, setIsMounted] = useState(false);
  const colorScheme = useColorScheme();
  const { theme } = useTheme();
  const { session, loading } = useGlobalContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!session && !loading) return router.replace('/');
  }, [session]);

  if (!isMounted) return <Loading />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: theme === 'light' ? '#333' : '#ffffff',
        headerShadowVisible: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          ...styles.shadow,
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={4}
            tint={'extraLight'}
            style={{
              flex: 1,
              backgroundColor:
                theme === 'light'
                  ? 'rgba(255, 255, 255, 0.99)'
                  : 'rgba(7, 11, 17, 0.99)',
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              focused
              iconName='Home'
            />
          ),
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
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'compass' : 'compass-outline'}
              color={color}
              focused
              iconName='Explore'
            />
          ),
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
        name='create'
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: theme === 'light' ? '#f3f3f3' : '#1c1c1e',
              }}
              className='relative flex items-center justify-center p-2 -mt-12 rounded-full w-18 h-18  '
            >
              <View className='w-14 h-14 rounded-full bg-[#FF7F50] flex items-center justify-center  shadow-lg'>
                <FontAwesome5
                  name='plus'
                  size={20}
                  color={`${focused ? 'white' : '#1c1c1e'}`}
                />
              </View>
            </View>
          ),
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
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              color={color}
              focused
              iconName='Reports'
            />
          ),
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              focused
              iconName='Profile'
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = {
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
};
