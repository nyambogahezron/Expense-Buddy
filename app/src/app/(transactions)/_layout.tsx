import { useGlobalContext } from '@/context/GlobalProvider';
import { router, Stack } from 'expo-router';

export default function Layout() {
   const { session } = useGlobalContext();
   if (!session) return router.replace('/');

  return <Stack />;
}
