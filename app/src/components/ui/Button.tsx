import { Colors } from '@/constants/Colors';
import { ButtonProps } from '@/types';
import React from 'react';
import {
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

const width = Dimensions.get('window').width;

export default function Button({
  handleOpenPress,
  title,
  customStyles,
  textStyles,
  touchOpacity = 0.7,
  isLoading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={touchOpacity}
      onPress={handleOpenPress}
      style={[styles.button, customStyles, isLoading && { opacity: 0.5 }]}
    >
      <View style={styles.buttonContent}>
        <Text style={[styles.buttonText, textStyles]}>
          {isLoading ? 'Loading...' : title}
        </Text>
        {isLoading && <ActivityIndicator size='small' color={Colors.white} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 9999,
    width: width * 0.9,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
