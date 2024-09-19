import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
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
    setCode([...code, number]);
  };

  const numberBackspace = () => {
    setCode(code.slice(0, -1));
  };
  return (
    <SafeAreaProvider className='flex flex-1 bg-[#161622]'>
      <View>
        <View className='flex items-center justify-center w-full mx-auto mt-24'>
          <Feather name='lock' size={35} color='#fff' />
          <Text className='text-white flex items-center  font-bold mt-2 text-xl'>
            Unlock Application
          </Text>
        </View>
        <Animated.View style={[styles.codeView, animationStyles]}>
          {codeLength.map((_, index) => (
            <View
              className={`w-7 h-7 rounded-full border-4 border-blue-600 bg-white ${
                code[index] ? 'bg-blue-600 border-green-600' : 'bg-white'
              }`}
              key={index}
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
              className='p-3 bg-[#1E1E2C] rounded-full w-14 h-14 items-center justify-center'
              onPress={() => {
                authenticate();
              }}
            >
              <FontAwesome5 name='fingerprint' size={32} color='#fff' />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onNumberPress(0)}>
              <Text style={styles.number}>0</Text>
            </TouchableOpacity>

            <View style={{ minWidth: 30 }}>
              {code.length > 0 && (
                <TouchableOpacity
                  className='p-3 bg-[#1E1E2C] rounded-full w-14 h-14 items-center justify-center'
                  onPress={() => numberBackspace()}
                >
                  <MaterialCommunityIcons
                    name='backspace-outline'
                    size={26}
                    color='#fff'
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text className='items-center justify-center text-blue-700 font-bold mx-auto bottom-10 mt-10'>
            Forgot passcode?
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginVertical: 70,
  },
  numberView: {
    marginHorizontal: 55,
    gap: 40,
    marginTop: -30,
  },
  number: {
    fontSize: 32,
    fontWeight: 'bold',
    backgroundColor: '#1E1E2C',
    color: '#fff',
    padding: 10,
    borderRadius: 50,
    width: 60,
    height: 60,
    textAlign: 'center',
  },
});
