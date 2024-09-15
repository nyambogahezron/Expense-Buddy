import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';
import { authenticateAsync } from 'expo-local-authentication';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      screenOptions={{
        tabBarActiveTintColor: '#FF6737',
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          marginBottom: -1,
          height: 70,
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
          tabBarIcon: ({ color, focused }) => (
            <View className='relative flex items-center justify-center p-2 -mt-12  bg-[#f3f3f2] rounded-full w-18 h-18  '>
              <View className='w-14 h-14 rounded-full bg-[#FF7F50] flex items-center justify-center  shadow-lg'>
                <FontAwesome5
                  name='plus'
                  size={20}
                  color={`${focused ? 'white' : '#333'}`}
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
