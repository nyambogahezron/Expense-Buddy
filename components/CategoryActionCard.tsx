import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import Divider from './Divider';
import { router } from 'expo-router';
const width = Dimensions.get('window').width;
type CategoryActionCardProps = {
  handleClosePress: () => void | undefined;
};
export default function CategoryActionCard({
  handleClosePress,
}: CategoryActionCardProps) {
  return (
    <View className='absolute bottom-0 px-4 items-center w-full h-[25%] justify-center bg-gray-950 border-4'>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => router.push('/(categories)/edit')}
          className='w-full p-3 items-center justify-center mb-1'
          style={{ width: width }}
        >
          <View>
            <Text className='font-bold text-sm text-white'>Edit</Text>
          </View>
        </TouchableOpacity>
        <Divider className='bg-gray-300' />
        <TouchableOpacity
          activeOpacity={0.6}
          className=' w-full p-4 items-center justify-center my-'
          style={{ width: width }}
        >
          <View>
            <Text className='font-bold text-sm text-red-600'>Delete</Text>
          </View>
        </TouchableOpacity>
        <Divider className='bg-gray-300' />

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleClosePress}
          className='w-full p-3 items-center justify-center'
          style={{ width: width }}
        >
          <View>
            <Text className='font-bold text-sm text-white'>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
