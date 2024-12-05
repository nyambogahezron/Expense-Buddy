import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeProvider';
import ThemedSafeAreaView from '@/components/ui/SafeAreaView';
import AddTransaction from '@/components/Form/AddTransaction';

export default function AddExpense() {
  const { theme } = useTheme();

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#ffffff' : 'rgba(7, 11, 17,0.1)'}
      />
      <View style={styles.view}></View>
      <AddTransaction />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  view: {
    marginTop: -8,
  },
});
