import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import MenuNav from '@/components/MenuNav';
import { useThemeStore } from '@/store/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function Menu() {
	const { theme } = useThemeStore();

	return (
		<Animated.View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
			entering={FadeIn.duration(300)}
		>
			<Text style={[styles.title, { color: theme.colors.text }]}>Menu</Text>
			<MenuNav />
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});
