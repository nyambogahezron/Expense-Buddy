import { Redirect, router, Stack } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function AuthLayout() {
  const { session, loading } = useGlobalContext();
  if (session && !loading) return <Redirect href={'/(tabs)/'} />;
  return <Stack />;
}
