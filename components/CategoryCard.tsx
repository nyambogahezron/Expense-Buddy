import { Dispatch } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

type CategoryCardProps = {
  handleOnPress: () => void;
  id: number;
  name: string;
  icon?: string;
  setIsPressed?: Dispatch<React.SetStateAction<boolean>>;
  handleOpenPress?: () => void;
  isPress?: boolean;
  PressedItem?: number;
};

export default function CategoryCard({
  handleOnPress,
  id,
  name,
  handleOpenPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={id}
      className={`flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-4 
                }`}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleOnPress}
        className='flex-row items-center'
      >
        <View className='bg-white p-3 rounded-full mr-4'>
          <Text>🛒</Text>
        </View>
        <View>
          <Text className='font-bold text-gray-800'>{name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className=' px-3'
        activeOpacity={0.7}
        onPress={handleOpenPress}
      >
        <Entypo name='dots-three-vertical' size={18} color='black' />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
