import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

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
          backgroundColor: '#F5F5F5',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 70,
          borderRadius: 25,
          padding: 2,
          marginTop: 0,
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
            <View
              style={{
                backgroundColor: `${focused ? '#FF6737' : '#FF6737'}`,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 50,
                height: 45,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                size={28}
                name='add-circle-sharp'
                color='#fff'
                className='font-pblack text-gray-900'
                style={{
                  marginTop: -5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              />
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
