import { useThemeStore } from '@/store/theme';
import { Tabs } from 'expo-router';
import {
	ArrowUpDown,
	ChartPie as PieChart,
	Grid2x2 as Grid,
	Wallet,
	Menu as MenuIcon,
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
				name='transactions'
				options={{
					title: 'Transactions',
					tabBarIcon: ({ size, color }: { size: number; color: string }) => (
						<ArrowUpDown size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='budgets'
				options={{
					title: 'Budgets',
					tabBarIcon: ({ size, color }) => <Wallet size={size} color={color} />,
				}}
			/>

			<Tabs.Screen
				name='menu'
				options={{
					title: 'Menu',
					tabBarIcon: ({ size, color }: { size: number; color: string }) => (
						<MenuIcon size={size} color={color} />
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
		</Tabs>
	);
}
