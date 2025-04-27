import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemeStore } from '@/store/theme';
import { ThemePreview } from '@/components/ThemePreview';
import { themes, ThemeType } from '@/types/theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SettingsScreen() {
	const { currentTheme, setTheme } = useThemeStore();
	const theme = themes[currentTheme];

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: theme.colors.background }]}
			contentContainerStyle={styles.content}
		>
			<Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>

			<View style={styles.section}>
				<Text
					style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
				>
					Theme
				</Text>
				<Animated.View entering={FadeIn} style={styles.themesGrid}>
					{(Object.keys(themes) as ThemeType[]).map((themeKey) => (
						<ThemePreview
							key={themeKey}
							theme={themes[themeKey]}
							isSelected={currentTheme === themeKey}
							onSelect={() => setTheme(themeKey)}
						/>
					))}
				</Animated.View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontFamily: 'Inter-Bold',
		marginBottom: 24,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
		marginBottom: 16,
	},
	themesGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 16,
	},
});
