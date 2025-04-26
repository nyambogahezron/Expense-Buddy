import React, { useEffect } from 'react';
import { TextStyle, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface AnimatedNumberProps {
  value: number;
  style?: TextStyle;
  formatter?: (value: number) => string;
  duration?: number;
}

const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  style,
  formatter = (val) => val.toFixed(2),
  duration = 800,
}) => {
  // Use a shared value to animate between numbers
  const animatedValue = useSharedValue(0);

  // When the value prop changes, animate to the new value
  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.ease),
    });
  }, [value, duration, animatedValue]);

  // Create animated props for the text component
  const animatedProps = useAnimatedProps(() => {
    return {
      text: formatter(animatedValue.value),
    };
  });

  return (
    <AnimatedText style={style} animatedProps={animatedProps} />
  );
};

export default AnimatedNumber;
