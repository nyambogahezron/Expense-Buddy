import { StyleSheet, Pressable } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu, User } from 'lucide-react-native';
import { TransactionCategory } from '@/types/transaction';
import { useThemeStore } from '@/store/theme';

interface AnimatedHeaderProps {
	scrollY: Animated.SharedValue<number>;
	balance: number;
	onMenuPress?: () => void;
	onUserPress?: () => void;
	onSearchPress?: () => void;
	onFilterPress?: () => void;
	selectedCategory?: TransactionCategory | null;
	onSelectCategory?: (category: TransactionCategory | null) => void;
}

export function AnimatedHeader({
	scrollY,
	balance,
	onUserPress,
	onSearchPress,
	onFilterPress,
	selectedCategory,
	onSelectCategory,
}: AnimatedHeaderProps) {
	const insets = useSafeAreaInsets();
	const { openMenu } = useThemeStore();

	const headerStyle = useAnimatedStyle(() => {
		const height = interpolate(scrollY.value, [0, 100], [200, 100], 'clamp');

		return {
			height,
			paddingTop: insets.top,
		};
	});

	const balanceStyle = useAnimatedStyle(() => {
		const scale = interpolate(scrollY.value, [0, 50], [1, 0.8], 'clamp');

		const opacity = interpolate(scrollY.value, [0, 50], [1, 0], 'clamp');

		// Hide content completely when scrolled
		const height = interpolate(scrollY.value, [0, 50], [80, 0], 'clamp');

		return {
			transform: [{ scale: withSpring(scale) }],
			opacity: withSpring(opacity),
			height: withSpring(height),
			overflow: 'hidden',
		};
	});

	const iconRowStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, 100], [1, 1], 'clamp');

		return {
			opacity,
		};
	});

	return (
		<Animated.View style={[styles.header, headerStyle]}>
			{/* Top row with user and menu icons */}
			<Animated.View style={[styles.topRow, iconRowStyle]}>
				<Pressable onPress={openMenu} style={styles.iconButton}>
					<Menu size={24} color='#FFFFFF' />
				</Pressable>
				<Pressable onPress={onUserPress} style={styles.iconButton}>
					<User size={24} color='#FFFFFF' />
				</Pressable>
			</Animated.View>

			{/* Balance section */}
			<Animated.View style={[styles.content, balanceStyle]}>
				<Animated.Text style={[styles.label]}>Total Balance</Animated.Text>
				<Animated.Text style={[styles.balance]}>
					${balance.toLocaleString()}
				</Animated.Text>
			</Animated.View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#6366F1',
		paddingHorizontal: 20,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
		paddingTop: 10,
	},
	iconButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
	content: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		color: '#E0E7FF',
		fontSize: 16,
		fontFamily: 'Inter-Regular',
		marginBottom: 8,
	},
	balance: {
		color: '#FFFFFF',
		fontSize: 36,
		fontFamily: 'Inter-Bold',
	},
});
