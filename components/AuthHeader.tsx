import { Image, Text } from 'react-native';
import { ThemedText, ThemedView } from './Themed';

type AuthHeaderProps = {
  title: string;
  description: string;
};
export default function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <ThemedView className='flex flex-row justify-between items-center mb-12 mt-10'>
      <ThemedView>
        <Text className='text-2xl font-pextrabold mt-4 text-blue-600'>
          {title}
        </Text>
        <ThemedText className='text-sm mt-2 font-pbold '>
          {description}
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <Image
          style={{ width: 100, height: 100 }}
          source={require('../assets/images/adaptive-icon.png')}
        />
      </ThemedView>
    </ThemedView>
  );
}
