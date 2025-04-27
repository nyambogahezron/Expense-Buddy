import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Animated, {
	FadeIn,
	FadeOut,
	SlideInRight,
	SlideOutLeft,
} from 'react-native-reanimated';
import {
	ArrowRight,
	Check,
	ChartLine as LineChart,
	Shield,
	Wallet,
} from 'lucide-react-native';
import { useThemeStore } from '@/store/theme';

const slides = [
	{
		id: 'track',
		title: 'Track Your Finances',
		description:
			'Easily monitor your spending and income with our intuitive tracking system.',
		icon: (props: any) => <Wallet {...props} />,
		image:
			'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2340',
	},
	{
		id: 'insights',
		title: 'Smart Insights',
		description:
			'Get detailed analytics and insights to make better financial decisions.',
		icon: (props: any) => <LineChart {...props} />,
		image:
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340',
	},
	{
		id: 'secure',
		title: 'Bank-Level Security',
		description:
			'Your data is protected with industry-leading security measures.',
		icon: (props: any) => <Shield {...props} />,
		image:
			'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2340',
	},
];

export default function Onboarding() {
	const { theme } = useThemeStore();
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = useCallback(() => {
		if (currentIndex === slides.length - 1) {
			router.replace('/(tabs)/transactions');
		} else {
			setCurrentIndex(currentIndex + 1);
		}
	}, [currentIndex]);

	const currentSlide = slides[currentIndex];
	const Icon = currentSlide.icon;
	const isLastSlide = currentIndex === slides.length - 1;

	return (
		<Animated.View
			style={[styles.container, { backgroundColor: theme.colors.background }]}
		>
			<StatusBar style='light' />

			<Animated.Image
				key={currentSlide.image}
				entering={FadeIn.duration(600)}
				exiting={FadeOut.duration(600)}
				source={{ uri: currentSlide.image }}
				style={[StyleSheet.absoluteFill, styles.backgroundImage]}
			/>

			<View style={styles.overlay} />

			<View style={styles.content}>
				<Animated.View
					key={currentSlide.id}
					entering={SlideInRight.duration(400)}
					exiting={SlideOutLeft.duration(400)}
					style={styles.slide}
				>
					<View style={styles.iconContainer}>
						<Icon size={40} color={theme.colors.primary} />
					</View>
					<Text style={[styles.title, { color: theme.colors.surface }]}>
						{currentSlide.title}
					</Text>
					<Text style={[styles.description, { color: theme.colors.surface }]}>
						{currentSlide.description}
					</Text>
				</Animated.View>

				<View style={styles.footer}>
					<View style={styles.pagination}>
						{slides.map((_, index) => (
							<View
								key={index}
								style={[
									styles.paginationDot,
									{
										backgroundColor:
											index === currentIndex
												? theme.colors.primary
												: theme.colors.surface,
										opacity: index === currentIndex ? 1 : 0.5,
									},
								]}
							/>
						))}
					</View>

					<Pressable
						onPress={handleNext}
						style={({ pressed }) => [
							styles.button,
							{ backgroundColor: theme.colors.primary },
							pressed && { opacity: 0.8 },
						]}
					>
						{isLastSlide ? (
							<Check size={24} color={theme.colors.surface} />
						) : (
							<ArrowRight size={24} color={theme.colors.surface} />
						)}
					</Pressable>
				</View>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.7,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
		padding: 24,
	},
	slide: {
		marginTop: 100,
		alignItems: 'center',
	},
	iconContainer: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
	},
	title: {
		fontSize: 32,
		fontFamily: 'Inter-Bold',
		textAlign: 'center',
		marginBottom: 16,
	},
	description: {
		fontSize: 18,
		fontFamily: 'Inter-Regular',
		textAlign: 'center',
		opacity: 0.9,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 40,
	},
	pagination: {
		flexDirection: 'row',
		gap: 8,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	button: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
