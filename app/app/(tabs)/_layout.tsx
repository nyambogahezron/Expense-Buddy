import { useThemeStore } from '@/store/theme';
import { Tabs } from 'expo-router';
import {
	ArrowUpDown,
	ChartPie as PieChart,
	Settings,
	User,
	Grid2x2 as Grid,
} from 'lucide-react-native';

export default function TabLayout() {
	const { theme } = useThemeStore();
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.colors.background,
					borderTopWidth: 0,
				},
				tabBarActiveTintColor: '#6366F1',
				tabBarInactiveTintColor: '#6B7280',
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Transactions',
					tabBarIcon: ({ size, color }: { size: number; color: string }) => (
						<ArrowUpDown size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='analytics'
				options={{
					title: 'Analytics',
					tabBarIcon: ({ size, color }: { size: number; color: string }) => (
						<PieChart size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='categories'
				options={{
					title: 'Categories',
					tabBarIcon: ({ size, color }: { size: number; color: string }) => (
						<Grid size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ size, color }: { size: number; color: string }) => (
						<User size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: 'Settings',
					tabBarIcon: ({ size, color }: { size: number; color: string }) => (
						<Settings size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
