import React, { Component, PropsWithChildren } from 'react';
import { StyleSheet, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable, {
	SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from '@expo/vector-icons/MaterialIcons';
import Reanimated, { SharedValue, interpolate } from 'react-native-reanimated';

interface Props {
	onEdit: () => void;
	onDelete: () => void;
}
type IconName = 'done' | 'delete' | 'edit' | 'undo' | 'close';

export default class AppleStyleSwipeableRow extends Component<
	PropsWithChildren<Props>
> {
	private renderRightAction = (
		iconName: IconName,
		color: string,
		x: number,
		progress: SharedValue<number>
	) => {
		const trans = interpolate(progress.value, [0, 1], [x, 0]);

		const pressHandler = () => {
			if (iconName === 'edit') {
				this.props.onEdit();
			} else if (iconName === 'delete') {
				this.props.onDelete();
			} else if (iconName === 'close') {
				this.close();
			}
			this.close();
		};

		return (
			<Reanimated.View
				className='flex-1 h-full items-center justify-between'
				style={[{ transform: [{ translateX: trans }] }]}
			>
				<RectButton style={[styles.rightActionButton]} onPress={pressHandler}>
					<Icon name={iconName} size={20} color={color} />
				</RectButton>
			</Reanimated.View>
		);
	};

	private renderRightActions = (
		progressAnimatedValue: SharedValue<number>,
		dragAnimatedValue: SharedValue<number>,
		swipeable: SwipeableMethods
	) => {
		const progress = progressAnimatedValue;

		return (
			<View
				style={{
					flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
				}}
			>
				{this.renderRightAction('delete', 'red', 160, progress)}
				{this.renderRightAction('edit', '#ffc44e', 160, progress)}
				{this.renderRightAction('close', 'green', 160, progress)}
			</View>
		);
	};

	private swipeableRow: SwipeableMethods | null = null;

	private updateRef = (ref: SwipeableMethods | null) => {
		this.swipeableRow = ref;
	};
	private close = () => {
		this.swipeableRow?.close();
	};

	render() {
		const { children } = this.props;
		return (
			<Swipeable
				ref={this.updateRef}
				friction={2}
				enableTrackpadTwoFingerGesture
				rightThreshold={40}
				renderRightActions={this.renderRightActions}
			>
				{children}
			</Swipeable>
		);
	}
}

const styles = StyleSheet.create({
	rightActionButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
});
