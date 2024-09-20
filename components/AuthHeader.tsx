import { Text } from 'react-native';
import { ThemedText, ThemedView } from './Themed';

type AuthHeaderProps = {
  title: string;
  description: string;
};
export default function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <ThemedView className='items-cen mb-12 mt-10'>
      <Text className='text-2xl font-pextrabold mt-4 text-blue-600'>
        {title}
      </Text>
      <ThemedText className='text-sm mt-2 font-pbold '>{description}</ThemedText>
    </ThemedView>
  );
}
