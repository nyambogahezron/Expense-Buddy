import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

export default function ModelLayout() {
  const { session } = useGlobalContext();
  if (!session) return router.replace('/');
  return <Stack />;
}
