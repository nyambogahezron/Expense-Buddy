import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className='flex flex-1 items-center justify-center bg-bgPrimaryDark'>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>
  );
}
