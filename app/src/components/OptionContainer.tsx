import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

// Define a type for valid Ionicons names
type IoniconsName = keyof typeof Ionicons.glyphMap;

type OptionContainerProps = {
  title: string;
  icon: IoniconsName;
  handleOnPress: () => void;
};

export default function OptionContainer({
  title,
  icon,
  handleOnPress,
}: OptionContainerProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        theme === 'light' ? styles.lightBackground : styles.darkBackground,
      ]}
      onPress={handleOnPress}
    >
      <Ionicons name={icon} size={22} color='#6B7280' />
      <Text
        style={[
          styles.text,
          theme === 'light' ? styles.lightText : styles.darkText,
        ]}
      >
        {title}
      </Text>
      <View style={styles.iconContainer}>
        <Ionicons name='chevron-forward' size={22} color='#6B7280' />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  lightBackground: {
    backgroundColor: '#E5E7EB',
  },
  darkBackground: {
    backgroundColor: '#1c1c1e',
  },
  text: {
    marginLeft: 16,
  },
  lightText: {
    color: '#1F2937',
  },
  darkText: {
    color: '#E5E7EB',
  },
  iconContainer: {
    position: 'absolute',
    right: 8,
    display: 'flex',
  },
});
