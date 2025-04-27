import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
	Pressable,
	Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useThemeStore } from '@/store/theme';
import {
	Settings,
	Bell,
	LogOut,
	X,
	ShoppingCart,
	MenuIcon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function MenuNav() {
	const [modalVisible, setModalVisible] = useState(false);

	const { theme, isMenuOpen, closeMenu } = useThemeStore();
	const router = useRouter();

	const menuItems: Array<{
		icon: React.ComponentType<any>;
		label: string;
		route?: any;
		action?: () => void;
	}> = [
		{ icon: ShoppingCart, label: 'Shopping List', route: '/shopping' },
		{ icon: Bell, label: 'Notifications', route: '/notifications' },
		{ icon: Settings, label: 'Settings', route: '/settings' },
		{ icon: LogOut, label: 'Logout', action: () => handleLogout() },
	];

	const handleLogout = () => {
		setModalVisible(false);
		router.push('/(auth)/login');
	};

	const handleMenuToggle = () => {
		if (isMenuOpen) {
			closeMenu();
		} else {
			setModalVisible(true);
		}
	};
	const handleBackdropPress = () => {
		setModalVisible(false);
		closeMenu();
	};

	const handleMenuItemPress = (route?: any, action?: () => void) => {
		setModalVisible(false);
		closeMenu();

		if (action) {
			action();
		} else if (route) {
			router.push(route);
		}
	};

	return (
		<View>
			<TouchableOpacity
				style={styles.menuButton}
				onPress={() => setModalVisible(true)}
			>
				<MenuIcon size={24} color={'#888'} />
			</TouchableOpacity>

			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible || isMenuOpen}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.centeredView}>
					<Animated.View
						style={[
							styles.modalView,
							{ backgroundColor: theme.colors.background },
						]}
						entering={FadeInDown.springify()}
						exiting={FadeOutUp.springify()}
					>
						<View style={styles.modalHeader}>
							<TouchableOpacity onPress={() => handleMenuToggle()}>
								<X size={24} color={theme.colors.text} />
							</TouchableOpacity>
						</View>

						<View style={styles.menuItemsContainer}>
							{menuItems.map((item, index) => (
								<Animated.View
									key={index}
									entering={FadeInDown.delay(100 * index).springify()}
								>
									<TouchableOpacity
										style={styles.menuItem}
										onPress={() => handleMenuItemPress(item.route, item.action)}
									>
										<item.icon size={24} color={theme.colors.primary} />
										<Text
											style={[
												styles.menuItemText,
												{ color: theme.colors.text },
											]}
										>
											{item.label}
										</Text>
									</TouchableOpacity>
								</Animated.View>
							))}
						</View>
					</Animated.View>

					<Pressable
						style={styles.modalBackdrop}
						onPress={() => setModalVisible(false)}
					/>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	menuButton: {
		width: '100%',
		padding: 10,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	menuButtonText: {
		fontSize: 16,
		fontWeight: '600',
	},
	centeredView: {
		flex: 1,
		position: 'absolute',
		bottom: 0,
		alignItems: 'center',
	},
	modalBackdrop: {
		flex: 1,
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		zIndex: -1,
	},
	modalView: {
		width: width,
		maxHeight: '100%',
		padding: 20,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 20,
	},

	menuItemsContainer: {
		gap: 16,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	menuItemText: {
		fontSize: 16,
		marginLeft: 16,
		fontWeight: '500',
	},
});
