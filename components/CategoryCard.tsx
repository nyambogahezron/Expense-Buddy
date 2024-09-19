import { Dispatch } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '@/context/ThemeProvider';
import { ThemedText } from '@/components/Themed';

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
  icon,
  handleOpenPress,
}: CategoryCardProps) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={id}
      style={{
        backgroundColor: theme === 'light' ? '#f3f4f6' : '#1c1c1e',
      }}
      className={`flex-row items-center justify-between p-4 rounded-lg mb-1 
                }`}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleOnPress}
        className='flex-row items-center'
      >
        <View className='bg-white p-3 rounded-full mr-4'>
          <Text>{icon ? icon : name.charAt(0)}</Text>
        </View>
        <View>
          <ThemedText className='font-bold'>{name}</ThemedText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className=' px-3'
        activeOpacity={0.7}
        onPress={handleOpenPress}
      >
        <Entypo
          name='dots-three-vertical'
          size={18}
          color={theme === 'light' ? 'black' : '#fff'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
