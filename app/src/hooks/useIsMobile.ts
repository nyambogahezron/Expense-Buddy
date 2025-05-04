import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			const { width } = Dimensions.get('window');
			setIsMobile(width < 768);
		};

		// Initial check
		checkScreenSize();

		// Add listener for screen size changes
		const subscription = Dimensions.addEventListener('change', checkScreenSize);

		return () => {
			subscription.remove();
		};
	}, []);

	return isMobile;
}
