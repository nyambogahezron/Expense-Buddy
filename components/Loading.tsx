import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className='flex h-full w-full items-center justify-center'>
      <ActivityIndicator size={55} color='#0000ff' />
    </View>
  );
}
