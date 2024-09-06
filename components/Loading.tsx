import { View } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

export default function Loading() {
  return (
    <View className='flex flex-1 items-center justify-center'>
      <Progress.CircleSnail size={80} color={['red', 'green', 'blue']} />
    </View>
  );
}
