import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from '@expo/vector-icons/MaterialIcons';

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
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      if (iconName === 'edit' || iconName === 'close') {
        this.props.onEdit();
      } else if (iconName === 'delete') {
        this.props.onDelete();
      }
      this.close();
    };

    return (
      <Animated.View
        className='flex-1 h-full'
        style={[{ transform: [{ translateX: trans }] }]}
      >
        <RectButton style={[styles.rightActionButton]} onPress={pressHandler}>
          <Icon name={iconName} size={20} color={color} />
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 160,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {this.renderRightAction('delete', 'red', 160, progress)}
      {this.renderRightAction('edit', '#ffc44e', 160, progress)}
      {this.renderRightAction('close', 'green', 160, progress)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
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
