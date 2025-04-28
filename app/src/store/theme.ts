import { create } from 'zustand';
import { Theme, ThemeType, themes } from '@/types/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'expense-buddy-theme';

interface ThemeState {
	currentTheme: ThemeType;
	theme: Theme;
	isMenuOpen: boolean;
	setTheme: (themeType: ThemeType) => void;
	openMenu: () => void;
	closeMenu: () => void;
	toggleMenu: () => void;
	initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
	currentTheme: 'light',
	theme: themes.light,
	isMenuOpen: false,

	setTheme: (themeType) => {
		set((state) => {
			if (state.currentTheme === themeType) return state;

			AsyncStorage.setItem(THEME_STORAGE_KEY, themeType).catch((error) => {
				console.error('Error saving theme preference:', error);
			});

			return {
				currentTheme: themeType,
				theme: themes[themeType],
			};
		});
	},

	openMenu: () =>
		set((state) => {
			if (state.isMenuOpen) return state;
			return { isMenuOpen: true };
		}),

	closeMenu: () =>
		set((state) => {
			if (!state.isMenuOpen) return state;
			return { isMenuOpen: false };
		}),

	toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

	initializeTheme: async () => {
		try {
			const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

			if (savedTheme && themes[savedTheme as ThemeType]) {
				set({
					currentTheme: savedTheme as ThemeType,
					theme: themes[savedTheme as ThemeType],
				});
			}
		} catch (error) {
			console.error('Error loading saved theme:', error);
		}
	},
}));
