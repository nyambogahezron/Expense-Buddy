import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
	SharedValue,
	useAnimatedStyle,
	interpolate,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

type SwipeableRowProps = {
	onDelete: () => Promise<void>;
	onEdit: () => void;
	children: React.ReactNode;
};

function RightAction({
	drag,
	onDelete,
	onEdit,
}: {
	drag: SharedValue<number>;
	onDelete: () => void;
	onEdit: () => void;
}) {
	const styleAnimation = useAnimatedStyle(() => {
		const translateX = interpolate(drag.value, [0, -100], [100, 0]);
		return {
			transform: [{ translateX }],
		};
	});
	function close() {
		drag.value = 0;
	}

	return (
		<Reanimated.View style={[styles.actionContainer, styleAnimation]}>
			<TouchableOpacity
				onPress={() => {
					close();
					onDelete();
				}}
				style={styles.actionButton}
			>
				<MaterialIcons name='delete' size={22} color='red' />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					close();
					onEdit();
				}}
				style={styles.actionButton}
			>
				<MaterialIcons name='edit' size={22} color='blue' />
			</TouchableOpacity>
		</Reanimated.View>
	);
}

export default function SwipeableRow({
	onDelete,
	onEdit,
	children,
}: React.PropsWithChildren<SwipeableRowProps>) {
	return (
		<ReanimatedSwipeable
			containerStyle={styles.swipeable}
			friction={2}
			enableTrackpadTwoFingerGesture
			rightThreshold={40}
			renderRightActions={(progress, dragX) => (
				<RightAction drag={dragX} onDelete={onDelete} onEdit={onEdit} />
			)}
		>
			{children}
		</ReanimatedSwipeable>
	);
}

const styles = StyleSheet.create({
	rightAction: { width: 50, height: '100%', backgroundColor: 'purple' },

	swipeable: {
		flex: 1,
		width: width,
		flexDirection: 'row',
		alignItems: 'center',
	},
	actionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: '100%',
	},
});
