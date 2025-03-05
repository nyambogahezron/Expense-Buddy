import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '@/components/ui/View';
import ThemedText from '@/components/ui/Text';
import { useTheme } from '@/context/ThemeProvider';
import useColorScheme from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type LoadMoreBtnProps = {
	handleOnPress: () => void;
	title: string;
};

export default function LoadMoreBtn({
	handleOnPress,
	title,
}: LoadMoreBtnProps) {
	const { theme } = useTheme();
	const colorScheme = useColorScheme();
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handleOnPress}>
			<ThemedView
				style={[
					styles.themedView,
					{
						borderColor: Colors[colorScheme].border,
						backgroundColor: Colors[colorScheme].bgLight,
					},
				]}
			>
				<View style={styles.innerView}>
					<ThemedText style={styles.text}>{title}</ThemedText>
					<Ionicons
						name='chevron-forward'
						size={20}
						color={Colors[colorScheme].customIcon}
					/>
				</View>
			</ThemedView>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	themedView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: 48,
		width: '100%',
		marginRight: 12,
		marginTop: 16,
		marginBottom: 16,
		paddingHorizontal: 8,
	},
	innerView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 8,
	},
	text: {
		fontSize: 15,
		fontWeight: '600',
		color: Colors.textGray,
		marginLeft: 16,
	},
});
