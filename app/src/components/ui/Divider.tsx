import { View, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@/context/ThemeProvider';
import ThemedView from './View';

const { width } = Dimensions.get('window');
type DividerProps = {
  styles?: object;
};

export default function Divider({ styles }: DividerProps) {
  const { theme } = useTheme();
  const dividerStyles = createStyles(theme);

  return (
    <ThemedView
      darkColor='#3D3D3D'
      lightColor='#E5E7EB'
      style={[styles, dividerStyles.divider]}
    ></ThemedView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    divider: {
      height: 1.5,
      width: width,
    },
  });
