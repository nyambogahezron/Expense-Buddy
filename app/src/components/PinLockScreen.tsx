import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
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

export default function PinLockScreen() {
  const { authenticate, setIsUnlocked, isLockPinSet, isBiometricEnabled } =
    useGlobalContext();
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
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Feather name='lock' size={35} color='#fff' />
          <Text style={styles.headerText}>Unlock Application</Text>
        </View>
        {!isLockPinSet ? (
          <View style={styles.lockIcon}>
            <TouchableOpacity
              style={styles.fingerprintButton}
              onPress={() => {
                authenticate();
              }}
            >
              <FontAwesome5 name='fingerprint' size={36} color='#fff' />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Animated.View style={[styles.codeView, animationStyles]}>
              {codeLength.map((_, index) => (
                <View
                  style={[
                    styles.codeView,
                    code[index]
                      ? { backgroundColor: '#1E90FF', borderColor: '#32CD32' }
                      : { backgroundColor: '#fff' },
                  ]}
                  key={index}
                />
              ))}
            </Animated.View>
            <View style={styles.numberView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={styles.fingerprintButton}
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
                      style={styles.backspaceButton}
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
            </View>
            <View style={styles.forgotPasscode}>
              <Text style={styles.forgotPasscodeText}>Forgot passcode?</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 20,
  },
  lockIcon: {
    marginTop: 20,
  },
  fingerprintButton: {
    padding: 12,
    backgroundColor: '#1E1E2C',
    borderRadius: 50,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    marginTop: -35,
    justifyContent: 'center',
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
  backspaceButton: {
    padding: 12,
    backgroundColor: '#1E1E2C',
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasscode: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1E1E2C',
    padding: 8,
  },
  forgotPasscodeText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});
