import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();
  const { session, loading } = useGlobalContext();

  useEffect(() => {
    if (!session && !loading) return router.replace('/');
  }, [session]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: theme === 'light' ? '#333' : '#ffffff',
        headerShadowVisible: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme === 'light' ? '#ffffff' : '#070B11',
          height: 70,
          borderTopWidth: 0,
          ...styles.shadow,
        },
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
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: '',
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
        }}
      />
      <Tabs.Screen
        name='reports'
        options={{
          title: 'Reports',
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
