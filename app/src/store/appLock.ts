import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppLockState {
	isEnabled: boolean;
	lockInterval: number; // in minutes
	pin: string | null;
	lastActive: number | null;
	useBiometrics: boolean;
	setEnabled: (enabled: boolean) => void;
	setLockInterval: (minutes: number) => void;
	setPin: (pin: string) => void;
	setLastActive: (timestamp: number) => void;
	setUseBiometrics: (use: boolean) => void;
	reset: () => void;
}

export const useAppLockStore = create<AppLockState>()(
	persist(
		(set) => ({
			isEnabled: false,
			lockInterval: 10, // default 10 minutes
			pin: null,
			lastActive: null,
			useBiometrics: false,
			setEnabled: (enabled) => set({ isEnabled: enabled }),
			setLockInterval: (minutes) => set({ lockInterval: minutes }),
			setPin: (pin) => set({ pin }),
			setLastActive: (timestamp) => set({ lastActive: timestamp }),
			setUseBiometrics: (use) => set({ useBiometrics: use }),
			reset: () =>
				set({
					isEnabled: false,
					pin: null,
					lastActive: null,
					useBiometrics: false,
				}),
		}),
		{
			name: 'app-lock-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
