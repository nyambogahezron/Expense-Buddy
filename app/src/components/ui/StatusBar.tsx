import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeProvider';
import { Colors } from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function statusBar() {
  const { theme } = useTheme();

  return (
    <StatusBar
      style={theme === 'light' ? 'dark' : 'light'}
      backgroundColor={
        Colors[useColorScheme('headerBackground')].headerBackground
      }
    />
  );
}
