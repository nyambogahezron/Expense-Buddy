import { StyleSheet, Pressable, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Menu, User } from 'lucide-react-native';
import { useThemeStore } from '@/store/theme';
import { router } from 'expo-router';

interface HomeHeaderProps {
	balance: number;
	onUserPress?: () => void;
}
export default function HomeHeader({ balance, onUserPress }: HomeHeaderProps) {
	const insets = useSafeAreaInsets();
	const { openMenu } = useThemeStore();

	return (
		<View style={[styles.header, { paddingTop: insets.top }]}>
			<View style={styles.topRow}>
				<Pressable onPress={openMenu} style={styles.iconButton}>
					<Menu size={24} color='#FFFFFF' />
				</Pressable>
				<Pressable
					onPress={() => router.push('/profile')}
					style={styles.iconButton}
				>
					<User size={24} color='#FFFFFF' />
				</Pressable>
			</View>

			<View style={styles.content}>
				<Text style={styles.label}>Total Balance</Text>
				<Text style={styles.balance}>${balance.toLocaleString()}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#6366F1',
		paddingHorizontal: 20,
		flexDirection: 'column',
		justifyContent: 'center',
		height: 200,
	},
	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
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
		height: '100%',
		top: -50,
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
