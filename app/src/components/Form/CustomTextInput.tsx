import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import ThemedText from '@/components/ui/Text';
import { useTheme } from '@/context/ThemeProvider';
import { CustomTextInputProps } from '@/types';

export default function CustomTextInput({
  title,
  onChangeText,
  placeholder,
  textInputStyle,
  containerStyle,
  inputContainerStyle,
  value,
  multiline,
  keyboardType = 'default',
}: CustomTextInputProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <View style={[styles.inputContainer, inputContainerStyle]}>
        <TextInput
          style={[styles.textInput, textInputStyle]}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          multiline={multiline}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    title: {
      marginBottom: 8,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme === 'light' ? '#E5E7EB' : '#3D3D3D',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    textInput: {
      fontSize: 16,
      color: theme === 'light' ? '#1F2937' : '#E5E7EB',
    },
  });
