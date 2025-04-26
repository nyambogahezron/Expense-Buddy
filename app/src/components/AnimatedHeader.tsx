import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AnimatedHeaderProps {
  scrollY: Animated.SharedValue<number>;
  balance: number;
}

export function AnimatedHeader({ scrollY, balance }: AnimatedHeaderProps) {
  const insets = useSafeAreaInsets();

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 100],
      [200, 100],
      'clamp'
    );

    return {
      height,
      paddingTop: insets.top,
    };
  });

  const balanceStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.8],
      'clamp'
    );

    return {
      transform: [{ scale: withSpring(scale) }],
    };
  });

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <View style={styles.content}>
        <Animated.Text style={[styles.label]}>Total Balance</Animated.Text>
        <Animated.Text style={[styles.balance, balanceStyle]}>
          ${balance.toLocaleString()}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#E0E7FF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 36,
    fontFamily: 'Inter-Bold',
  },
});