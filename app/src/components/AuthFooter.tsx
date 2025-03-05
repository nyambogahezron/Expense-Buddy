import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@/context/ThemeProvider';

type AuthFooterProps = {
  title: string;
  buttonText: string;
  handleOnPress: () => void;
};

export default function AuthFooter({ title, handleOnPress, buttonText }: AuthFooterProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={handleOnPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 32,
      marginBottom: 12,
    },
    text: {
      color: theme === 'light' ? '#6B7280' : '#E5E7EB',
    },
    buttonText: {
      color: theme === 'light' ? '#2563EB' : '#93C5FD',
      fontWeight: 'bold',
      marginLeft: 8,
    },
  });