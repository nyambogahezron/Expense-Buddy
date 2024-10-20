import { View, Text, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');
type DividerProps = {
  styles?: object;
  className?: string;
};

export default function Divider({ styles, className }: DividerProps) {
  return (
    <View
      style={[{ width: width }, styles]}
      className={`bg-[#3D3D3D] h-[1.5px] ${className}`}
    ></View>
  );
}
