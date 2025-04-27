import { Stack } from 'expo-router';

export default function TransactionLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'fade',
			}}
		>
			<Stack.Screen name='[id]' />
			<Stack.Screen name='new' />
		</Stack>
	);
}
