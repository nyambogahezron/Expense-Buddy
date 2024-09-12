import { Dispatch } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CategoryCardProps = {
  handleOnPress: () => void;
  id: number;
  name: string;
  icon?: string;
  setIsPressed: Dispatch<React.SetStateAction<boolean>>;
  handlePressHold: () => void;
  isPress: boolean;
  PressedItem?: number;
};

export default function CategoryCard({
  handleOnPress,
  id,
  name,
  setIsPressed,
  isPress,
  handlePressHold,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      onLongPress={() => setIsPressed(!isPress)}
      activeOpacity={0.7}
      onPress={handlePressHold}
      key={id}
      className={`flex-row justify-between bg-gray-100 p-4 rounded-lg mb-4 
                }`}
    >
      <View className='flex-row items-center'>
        <View className='bg-white p-3 rounded-full mr-4'>
          <Text>🛒</Text>
        </View>
        <View>
          <Text className='font-bold text-gray-800'>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
