import { StatusBar } from 'expo-status-bar';

import { useTheme } from '@/context/ThemeProvider';
import { ThemedSafeAreaView } from '@/components/Themed';

import AddTransaction from '@/components/Form/AddTransaction';
import { View } from 'react-native';

export default function AddExpense() {
  const { theme } = useTheme();

  return (
    <ThemedSafeAreaView className='flex-1 '>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : 'rgba(7, 11, 17,0.1)'}
      />
      <View className='-mt-8'></View>
      <AddTransaction />
    </ThemedSafeAreaView>
  );
}
