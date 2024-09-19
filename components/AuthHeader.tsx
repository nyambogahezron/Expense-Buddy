import { Text } from 'react-native';
import { ThemedText, ThemedView } from './Themed';
import { Ionicons } from '@expo/vector-icons';

type AuthHeaderProps = {
  title: string;
  description: string;
};
export default function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <ThemedView className='items-cen mb-12 mt-10'>
      <Text className='text-2xl font-pbold mt-4 text-blue-600'>
        {title}
      </Text>
      <ThemedText className='text-sm mt-2 font-pbold'>{description}</ThemedText>
    </ThemedView>
  );
}
