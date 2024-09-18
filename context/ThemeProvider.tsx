import { Theme } from '@react-navigation/native';
import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  useColorScheme as getDeviceColorScheme,
  ColorSchemeName,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeProviderProps = {
  children: React.ReactNode;
  value: Theme;
};

const ThemeContext = createContext<any>(null);

// from local storage
const getPreferredTheme = async (): Promise<'light' | 'dark' | null> => {
  try {
    const theme = await AsyncStorage.getItem('preferredTheme');
    return theme as 'light' | 'dark' | null;
  } catch (error) {
    console.error('Failed to load preferred theme from storage', error);
    return null;
  }
};

// set theme to local storage
const setPreferredTheme = async (theme: 'light' | 'dark') => {
  try {
    await AsyncStorage.setItem('preferredTheme', theme);
  } catch (error) {
    console.error('Failed to save preferred theme to storage', error);
  }
};

export const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
  const deviceColorScheme: ColorSchemeName = getDeviceColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    deviceColorScheme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const loadPreferredTheme = async () => {
      const preferredTheme = await getPreferredTheme();
      if (preferredTheme) {
        setTheme(preferredTheme);
      } else if (deviceColorScheme) {
        setTheme(deviceColorScheme === 'dark' ? 'dark' : 'light');
      }
    };
    loadPreferredTheme();
  }, [deviceColorScheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setPreferredTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ...value }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
