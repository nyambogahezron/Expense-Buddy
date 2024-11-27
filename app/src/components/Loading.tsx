import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className='flex h-full w-full items-center justify-center z-50 absolute'>
      <ActivityIndicator size={70} color='#0000ff' />
    </View>
  );
}
