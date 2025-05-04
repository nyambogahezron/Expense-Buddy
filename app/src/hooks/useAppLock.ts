import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAppLockStore } from '@/store/appLock';

export function useAppLock() {
	const { isEnabled, lockInterval, lastActive, setLastActive } =
		useAppLockStore();
	const [isLocked, setIsLocked] = useState(false);

	useEffect(() => {
		if (!isEnabled) {
			setIsLocked(false);
			return;
		}

		const subscription = AppState.addEventListener(
			'change',
			(nextAppState: AppStateStatus) => {
				if (nextAppState === 'active') {
					// Check if we need to lock the app
					if (lastActive) {
						const now = Date.now();
						const timeSinceLastActive = (now - lastActive) / (1000 * 60); // Convert to minutes

						if (timeSinceLastActive >= lockInterval) {
							setIsLocked(true);
						}
					}
				} else if (nextAppState === 'background') {
					// Update last active timestamp when app goes to background
					setLastActive(Date.now());
				}
			}
		);

		return () => {
			subscription.remove();
		};
	}, [isEnabled, lockInterval, lastActive, setLastActive]);

	const unlock = () => {
		setIsLocked(false);
		setLastActive(Date.now());
	};

	return {
		isLocked,
		unlock,
	};
}
