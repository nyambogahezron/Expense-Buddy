import { Stack } from 'expo-router';

export default function BudgetLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_bottom',
			}}
		>
			<Stack.Screen name='[id]' />
			<Stack.Screen name='new' />
			<Stack.Screen name='edit' />
		</Stack>
	);
}
