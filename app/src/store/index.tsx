import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { create } from 'zustand';

type ThemeStoreProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  initializeTheme: () => Promise<void>;
};

async function getTheme(): Promise<'light' | 'dark'> {
  const theme = await AsyncStorage.getItem('preferredTheme');
  const systemTheme = useColorScheme();

  if (theme) {
    return theme as 'light' | 'dark';
  } else {
    return systemTheme as 'light' | 'dark';
  }
}

export const useThemeStore = create<ThemeStoreProps>((set) => ({
  theme: 'dark',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  initializeTheme: async () => {
    const theme = await getTheme();
    set({ theme });
  },

}));
