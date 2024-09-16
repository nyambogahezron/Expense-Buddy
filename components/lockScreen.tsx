import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '@/context/GlobalProvider';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const OFFSET = 20;
const TIME = 80;

export default function LockScreen() {
  const { authenticate, setIsUnlocked } = useGlobalContext();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const offset = useSharedValue(0);
  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  useEffect(() => {
    if (code.length === 6) {
      if (code.join('') === '123456') {
        setCode([]);
        setIsUnlocked(true);
      } else {
        setCode([]);
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    // impactAsync(ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const numberBackspace = () => {
    setCode(code.slice(0, -1));
  };
  return (
    <SafeAreaProvider className='flex flex-1 bg-white'>
      <View>
        <Text style={styles.greeting}>Welcome Back John Doe</Text>
        <Animated.View style={[styles.codeView, animationStyles]}>
          {codeLength.map((_, index) => (
            <View
              key={index}
              style={{
                ...styles.codeEmpty,
                backgroundColor: code[index] ? 'blue' : 'lightgray',
              }}
            />
          ))}
        </Animated.View>

        <View style={styles.numberView}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {[1, 2, 3].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onNumberPress(number)}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {[4, 5, 6].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onNumberPress(number)}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {[7, 8, 9].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onNumberPress(number)}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              onPress={() => {
                authenticate();
              }}
            >
              <FontAwesome5 name='fingerprint' size={30} color='gray' />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onNumberPress(0)}>
              <Text style={styles.number}>0</Text>
            </TouchableOpacity>

            <View style={{ minWidth: 30 }}>
              {code.length === 0 && (
                <TouchableOpacity onPress={() => numberBackspace()}>
                  <MaterialCommunityIcons
                    name='backspace-outline'
                    size={26}
                    color='gray'
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text className='items-center justify-center text-blue-700 font-bold mx-auto bottom-10 mt-5'>
            Forgot passcode?
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginVertical: 100,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numberView: {
    marginHorizontal: 80,
    gap: 60,
  },
  number: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
