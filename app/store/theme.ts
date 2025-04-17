import { create } from 'zustand';
import { Theme, ThemeType, themes } from '@/types/theme';

interface ThemeState {
  currentTheme: ThemeType;
  theme: Theme;
  setTheme: (themeType: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: 'light',
  theme: themes.light,
  setTheme: (themeType) =>
    set({
      currentTheme: themeType,
      theme: themes[themeType],
    }),
}));